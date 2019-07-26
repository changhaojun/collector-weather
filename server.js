const http=require('http');
const getWeather_ = require('./getWeather_');
const citys_ = require('./getCitys_');
const weatherDict = require('./weatherDict');

async function getCity_() {
	const cityList = await citys_();
	let cityIdList = [];
    for(var i=0 ;i<cityList.length;i++){
        cityIdList.push(cityList[i].code);
	};
	for(let i=0; i<cityIdList.length; i++) {
		const result = await getWeather_(cityIdList[i], cityList, weatherDict);
		await main_(result);
	}
}
getCity_();
setInterval(getCity_,3600*1000)

const mongo=require('./weatherDB_');	//数据库操作模块
const clone=require('./objectClone');	//对象复制模块
const kafka=require('./kafkaWeather')	//kafka模块

async function main_(result){
	result.cityid=Number(result.cityid);
	const daily=clone.deepCopy(result);
	await mongo.houliData(daily,'bg_hourly_weather')
	const dataValue=parseFloat(result.temp).toFixed(2);
	const myDate=new Date();
	const dataTime=myDate.getTime();
	const message="{dataId:"+result.cityid+",dataTime:'"+dataTime+"',dataValue:"+dataValue+"}"
	var key= (new Date()).valueOf(); 
	kafka.produce(key,message);
	var city_id=result.cityid
	var getDate=result.date
	var isExist=false;
	var filter={
		cityid:city_id,
		date:getDate
	}
	const data = await mongo.queryData('bg_daily_weather',filter);
	if(data.length>0){
		isExist=true;
	}else{
		isExist=false;
	}
	if(isExist){
		const updata={
			temp:result.temp,
			temphigh:result.temphigh,
			templow:result.templow,
			humidity:result.humidity
		}
		await mongo.upData('bg_daily_weather',filter,updata)
	}else{
		await mongo.dailyData(result,'bg_daily_weather');
	}
}

http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/blain'});
	res.write('get weather servers');
	res.end();
}).listen(8888)
console.log('Server start on:8888')

