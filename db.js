const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (error) => {
    console.log(`❌ Error on DB Connection:${error}`)
    connect();
};

const connect = () => {
    mongoose.connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );

    const db = mongoose.connection;

    db.once('open', handleOpen);
    db.on('error', handleError);
};

connect();