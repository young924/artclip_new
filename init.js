const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

require('./models/Image');
require('./models/Comment');
require('./models/User');
require('./models/Follow');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ listening on port: ${PORT}`));
