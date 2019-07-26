# lanyue-weather

### 项目名称
          揽月天气数据服务
***
### 项目状态
    已完成
### 开发人员
* 董沫

### 起止日期
* 开始时间：2017-7-10
* 结束时间：2017-7-17

### 项目功能说明
* 通过天气接口每小时获取天气数据，保存至后台管理数据库

### 模块介绍：
* server.js
    * *程序主模块，即入口程序；*
* setting.js
    * *获取天气数据的配置模块；*
* getWeather.js
    * *获取天气数据模块，res的end事件中将获取到的天气数据处理完成后使用ballback返回；*
* weatherDB.js
    * *mongo数据库操作模块，该对象成员方法有，保存每日、每小时数据，查询每日数据，更新每日数据;*
* objectClone.js
    * *对象浅拷贝模块。*
* kafkaWeather.js
    * *kafka模块，每小时天气数据发送至kafka*
* getCitys.js
		* *获取城市列表，在data_config表里通过filter={port_type:WI}获取需要查询天气的城市列表
### 安装部署:
    1、$npm install 安装依赖的包；
	2、$npm install pm2 -g 安装 pm2,pm2是一个带有负载均衡功能的Node应用的进程管理器；
	3、在项目目录下pm2 start server.js --name weather  使用pm2启动项目，并将项目名称设置为weather。

### 和平台（数据库、中间件）的依赖关系:
* MongoDB
    * bg_daily_weather 每日天气表，每小时获取天气后更新当天信息，如果当天天气数据不存在，则插入新数据
    * bg_hourly_weather 每小时天气，每小时获取天气数据保存至此
    * bg_citys 城市列表，包括city_name(城市名称),city_id(城市ID),city_code(城市编码)
* kafka
    * 每小时获取天气后将数据组合成data_id,data_time,data_value 发送至kafka,端口为2181
***
### 模块方法详解：
* server.js:
    * main方法，为主要方法，调用getWether方法，参数为获取天气数据的配置信息和callback；
	* getWether回调方法，首先直接将数据保存至hourly_weather中，然后再daily_weather中查询当日该城市天气数据，在查询数据的回调方法中判断，若返回值length>0则执行upData方法更新每日天气，否则执行dailyData方法插入该数据；
* getWeather.js：
	* 该模块exports一个获取天气数据的方法，参数为：options、callback,options为settings模块导出的数据；
* weatherDB.js：
	* houliData（data,collecName）；
		* data:要保存的数据对象；
		* collecName：目标表名；
		* 将数据保存至bg_hourly_weather表中。
	* dailyData:function(data,collecName)；
		* data:要保存的数据对象；
		* collecName：目标表名；
		* 将数据保存至bg_daily_weather表中。
	* queryData:function(collecName,filter,like,success)；
		* collecName：目标表名；
		* filter:查询的过滤条件；
		* like：查询的过滤条件；
		* success：查询后的回调方法；
		* 在表bg_daily_weather中查询。
	* upData:function(collecName,filter,updata)
		* collecName：目标表名；
		* filter:查询的过滤条件；
		* updata：需要更新的数据对象；
		* 更新bg_daily_weather表中数据。
* kafkaWeather.js
	* produce(key, message)
		* key:时间戳；
		* message：{dataId:310,dataTime:'1500349005744',dataValue:31.00}，类型为String；
		* 注意：kafka-node为zookeeper,所以Client('139.129.231.31:2181')，端口为2181，而不是9092
			

