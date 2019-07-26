var http=require('http');
var log4js = require("log4js");
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);
var LogFile = log4js.getLogger('log_file');
module.exports=function(options,callback){
	var result='';
	var req = http.request(options, (res) => {
	  console.log(`STATUS: ${res.statusCode}`);
	  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf-8');
	  res.on('data', (chunk) => {
	  	result+=chunk
	  });
	  res.on('end', () => {
	  	console.log('res end');
	  	var weatherData=JSON.parse(result).result;
	  	var logStr="获取到天气："+weatherData.city+"----------当前时间："+new Date().format("yyyy-MM-dd hh:mm:ss")
	  	LogFile.info(logStr);
	  	weatherData.date=new Date(weatherData.date);
	  	weatherData.updatetime=new Date(weatherData.updatetime);
	  	weatherData.cityid=Number(weatherData.cityid);
	  	weatherData.temp=Number(weatherData.temp);
	  	weatherData.temphigh=Number(weatherData.temphigh);
	  	weatherData.templow=Number(weatherData.templow);
	  	weatherData.img=Number(weatherData.img);
	  	weatherData.humidity=Number(weatherData.humidity);
	  	for(var i=0;i<weatherData.daily.length;i++){
	  		weatherData.daily[i].night.templow=Number(weatherData.daily[i].night.templow);
	  		weatherData.daily[i].night.img=Number(weatherData.daily[i].night.img);
	  		weatherData.daily[i].day.temphigh=Number(weatherData.daily[i].day.temphigh);
	  		weatherData.daily[i].day.img=Number(weatherData.daily[i].day.img);
	  	}
		// callback(weatherData);
	  })
	});
	
	req.on('error', (e) => {
	  console.log(`problem with request: ${e.message}`);
	});
	
	// write data to request body
	req.end();
	
}

Date.prototype.format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
