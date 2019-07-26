var http=require('http');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://lanyue_user:finfosoft123@114.215.70.179:19901/lanyue';
var citys={
	getCitys:function(collecName,filter,success){
		operateData=function(db,callback){
			var collection = db.collection(collecName);
			collection.find(filter).toArray(function(err, result) {
			    if(err)
			    {
			      console.log('Error:'+ err);
			      return;
			    }     
			    callback(result);
		    });
		}
		
		MongoClient.connect(DB_CONN_STR, function(err, db) {
		    console.log("连接成功！");
		    operateData(db, function(result) {
			    db.close();
			    success(result)
		  	});
		});
	}
}

module.exports = citys