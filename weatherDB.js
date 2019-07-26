var http=require('http');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://lanyue_user:finfosoft123@114.215.70.179:19901/lanyue';
var weatherDB={
	houliData:function(data,collecName){
		delete data.daily;
		// delete data.hourly;
		// delete data.aqi;
		// delete data.index;
		saveHourliData=function(db,callback){
		 var collection = db.collection(collecName);
		 collection.insert(data,function(err, result) {
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
		    saveHourliData(db, function(result) {
			    console.log('每小时数据保存成功！');
			    db.close();
		  	});
		});
	},
	dailyData:function(data,collecName){
		// delete data.hourly;
		// delete data.aqi;
		// delete data.index;
		saveDailyData=function(db,callback){
		 var collection = db.collection(collecName);
		 
		 collection.insert(data,function(err, result) {
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
		    saveDailyData(db, function(result) {
			    console.log('每日天气保存成功！');
			    db.close();
		  	});
		});
	},
	queryData:function(collecName,filter,like,success){
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
	},
	upData:function(collecName,filter,updata){
		updataDaily=function(db,callback){
			var collection = db.collection(collecName);
			var updateStr={$set:updata}
			collection.update(filter,updateStr, function(err, result) {
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
		    updataDaily(db, function(result) {
		        console.log('每日天气更新成功！');
		        db.close();
		    });
		});
	}
}

module.exports = weatherDB
