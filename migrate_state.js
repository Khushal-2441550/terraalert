const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://127.0.0.1:27017/terraalert')
    .then(async () => {
        const result = await Report.updateMany(
            { state: { $exists: false } },
            { $set: { state: "Delhi" } }
        );
        console.log(`Updated ${result.modifiedCount} reports with default state.`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
