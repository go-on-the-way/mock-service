var dbconfig = require('../config/db.config');
const mongoose = require('mongoose');
mongoose.connect(dbconfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('连接数据库成功');
})

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function () {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(dbconfig.url, { server: { auto_reconnect: true } });
});
module.exports = db