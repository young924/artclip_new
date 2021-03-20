const mongoose = require("mongoose");
const User = require("./models/User");
const Image = require("./models/Image");
const Comment = require("./models/Comment");

const deleteUsers = async uploadRenewalInterval => {
  try {
    const now = new Date();
    const before = new Date(now);
    before.setDate(now.getDate() - uploadRenewalInterval);

    const lazyUsers = await User.find({ lastUpload: { $lte: String(before) } });
    lazyUsers.forEach(lazyUser =>
      console.log(
        " user name: ",
        lazyUser.name,
        " last upload: ",
        lazyUser.lastUpload
      )
    );

    await User.deleteMany({ lastUpload: { $lte: String(before) } });

    return lazyUsers;
  } catch (err) {
    console.error(err);
  }
};

const deleteImages = async lazyUsers => {
  try {
    lazyUsers.forEach(async lazyUser => {
      // 삭제 미동의된 이미지 유저 ananymous로
      await Image.updateMany(
        {
          creator: mongoose.Types.ObjectId(lazyUser.id),
          volatile: false
        },
        {
          creator: mongoose.Types.ObjectId("6055fb85f6d0b0c9c4ecfa35")
        }
      );
      // 삭제 동의된 이미지 삭제
      await Image.deleteMany({
        creator: mongoose.Types.ObjectId(lazyUser.id),
        volatile: true
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteComments = async lazyUsers => {
  try {
    lazyUsers.forEach(async lazyUser => {
      await Image.updateMany(
        {},
        { $pull: { comments: mongoose.Types.ObjectId(lazyUser.id) } }
      );
      await Comment.deleteMany({
        creator: mongoose.Types.ObjectId(lazyUser.id)
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const setUserRefresh = (refreshInterval, uploadRenewalInterval) => {
  console.log(`🔃 User refresh interval: ${refreshInterval} days`);
  console.log(
    `🔃 User should upload image at least every ${uploadRenewalInterval} days`
  );
  setInterval(async () => {
    console.log(`🔃 ${refreshInterval} days passed. user refresh starts.`);
    const lazyUsers = await deleteUsers(uploadRenewalInterval);
    await deleteImages(lazyUsers);
    await deleteComments(lazyUsers);
  }, refreshInterval * 24 * 60 * 60 * 1000);
};

module.exports = setUserRefresh;
