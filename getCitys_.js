const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://lanyue_user:finfosoft123@114.215.70.179:19901/lanyue';

function createCityPromise_() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            console.log("连接成功！");
            const collection = db.collection('bg_data_config_c');  
            const filter = {'port_type':'WI'};
            collection.find(filter).toArray(function(err, result) {   
                resolve(result);
            });
        })
    });
}

async function getCitys() {
    const cityList = await createCityPromise_();
    return cityList;
}

module.exports = getCitys;

