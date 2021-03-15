const User = require('./models/User');

const deleteUsers = async (min) => {
    // get date object min before now: d2
    const now = new Date();
    const before = new Date(now);
    before.setMinutes(now.getMinutes() - min);

    console.log((await User.find({ lastUpload: { $lte: String(before) } })).map(e => [e.name, e.lastUpload]));
};

const setUserRefresh = (min) => {
    setInterval(() => {
        console.log(`🔃 ${min} min passed. user refresh starts.`);
        deleteUsers(min);
        //deleteImages();
    }, min * 60 * 1000);
};

module.exports = setUserRefresh;