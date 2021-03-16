const app = require('./app');
const dotenv = require('dotenv');
const setUserRefresh = require('./userRefresh');

dotenv.config();

setUserRefresh(1, 1);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ listening on port: ${PORT}`));
