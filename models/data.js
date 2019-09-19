var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    url: String,
    data: String,
});

const data = mongoose.model('Data', dataSchema);


module.exports = data