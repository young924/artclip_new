const mongoose = require('mongoose');
const User = require('./models/User');
const Image = require('./models/Image');
const Comment = require('./models/Comment');

const deleteUsers = async (uploadRenewalInterval) => {
    try {
        const now = new Date();
        const before = new Date(now);
        before.setMinutes(now.getMinutes() - uploadRenewalInterval);

        const lazyUsers = await User.find({ lastUpload: { $lte: String(before) } });
        lazyUsers.forEach(lazyUser => console.log(' user name: ', lazyUser.name, ' last upload: ', lazyUser.lastUpload));

        await User.deleteMany({ lastUpload: { $lte: String(before) } });

        return lazyUsers;
    } catch (err) {
        console.error(err);
    }
};

const deleteImages = async (lazyUsers) => {
    try {
        lazyUsers.forEach(async (lazyUser) => {
            await Image.deleteMany({ creator: mongoose.Types.ObjectId(lazyUser.id) });
        });
    } catch (err) {
        console.error(err);
    }
};

const deleteComments = async (lazyUsers) => {
    try {
        lazyUsers.forEach(async (lazyUser) => {
            await Image.updateMany({}, { $pull: { comments: mongoose.Types.ObjectId(lazyUser.id) } });
            await Comment.deleteMany({ creator: mongoose.Types.ObjectId(lazyUser.id) });
        });
    } catch (err) {
        console.error(err);
    }
};

const setUserRefresh = (refreshInterval, uploadRenewalInterval) => {
    console.log(`🔃 User refresh interval: ${refreshInterval} minutes\n🔃 User should upload image at least every ${uploadRenewalInterval} minutes`);
    setInterval(async () => {
        console.log(`🔃 ${refreshInterval} min passed. user refresh starts.`);
        const lazyUsers = await deleteUsers(uploadRenewalInterval);
        await deleteImages(lazyUsers);
        await deleteComments(lazyUsers);
    }, refreshInterval * 60 * 1000);
};

module.exports = setUserRefresh;