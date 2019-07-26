var kafka = require('kafka-node');
var KeyedMessage = kafka.KeyedMessage;
var Producer = kafka.Producer;
var client = new kafka.Client('139.129.231.31:2181');
var producer = new Producer(client);
console.log('连接kafka中');

var toKafka={
     produce:function(key, message) {
        var payloads = [
            { topic: 'dtu_data_demo', messages: new KeyedMessage(key, message) }
        ];

        producer.on('ready', function () {
        });

        producer.send(payloads, function (err, data) {
            if (err){
                console.log(err)
            }
            console.log('kafka数据发送成功')
            // console.log(data);
            console.log('message:' + message);
        });
    }
}

module.exports = toKafka;
