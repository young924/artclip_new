const mongoose = require('mongoose');
const User = require('./models/User');
const Image = require('./models/Image');

const deleteUsers = async (uploadRenewalInterval) => {
    try {
        const now = new Date();
        const before = new Date(now);
        before.setMinutes(now.getMinutes() - uploadRenewalInterval);

        const lazyUsers = await User.find({ lastUpload: { $lte: String(before) } });
        if(!Array.isArray(lazyUsers)) {
            lazyUsers = Array(lazyUsers);
        }
        console.log(`lazy users: ${lazyUsers.map(e => [e.name, e.lastUpload])}`);

        await User.deleteMany({ lastUpload: { $lte: String(before) } });

        return lazyUsers;
    } catch (err) {
        console.error(err);
    }
};

// TODO: lazyUser._id undefined로 나타나는 문제 해결
const deleteImages = async (lazyUsers) => {
    console.log('yehhh');
    console.log(`2 lazyUsers: ${lazyUsers}`);
    console.log(`3 lazyUsers is array: ${Array.isArray(lazyUsers)}`);
    try {
        for (const lazyUser in lazyUsers) {
            console.log(lazyUser._id);
            await Image.deleteMany({ creator: mongoose.Types.ObjectId(lazyUser._id) });
        }
    } catch (err) {
        console.error(err);
    }
};

const setUserRefresh = (refreshInterval, uploadRenewalInterval) => {
    console.log(`🔃 User refresh interval: ${refreshInterval} minutes\n🔃 User should upload image at least once ${uploadRenewalInterval} minutes pass`);
    setInterval(async () => {
        console.log(`🔃 ${refreshInterval} min passed. user refresh starts.`);
        const lazyUsers = await deleteUsers(uploadRenewalInterval);
        console.log(`1 lazyUsers: ${lazyUsers}`);
        // await deleteImages(lazyUsers);
    }, refreshInterval * 60 * 1000);
};

module.exports = setUserRefresh;