const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://lanyue_user:finfosoft123@114.215.70.179:19901/lanyue';

function createInsertPromise(data, collecName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            const collection = db.collection(collecName);  
            collection.insert(data, function(err, result) {
                resolve(result);
            });
        });
    });
}

function createFindPromise(collecName, filter) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            const collection = db.collection(collecName);  
            collection.find(filter).toArray(function(err, result) {
			    resolve(result);
		    });
        });
    });
}

function createUpdatePromise(collecName, filter, updateStr) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            const collection = db.collection(collecName);  
            collection.update(filter,updateStr, function(err, result) {
		        resolve(result);
		   });
        });
    });
}

var weatherDB={
	async houliData (data,collecName){
        delete data.daily;
        await createInsertPromise(data, collecName);
        console.log('每小时数据保存成功！');
	},
	async dailyData(data,collecName){
        await createInsertPromise(data, collecName);
        console.log('每日天气保存成功！');
	},
	async queryData(collecName,filter){
        const data = await createFindPromise(collecName,filter);
        return data;
	},
	async upData(collecName,filter,updata){
        const updateStr={$set:updata};
        await createUpdatePromise(collecName, filter, updateStr);
        console.log('每日天气更新成功！');
	}
}

module.exports = weatherDB