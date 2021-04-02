const app = require("./app");
const dotenv = require("dotenv");
const setUserRefresh = require("./userRefresh");

dotenv.config();

// 1일에 한번씩 30일 내로 이미지 업로드 안한 유저 삭제
setUserRefresh(1, 30);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ listening on port: ${PORT}`));
