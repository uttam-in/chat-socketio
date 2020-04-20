var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var amqp = require('amqplib/callback_api');

io.sockets.on('connection', function (socket) {
    socket.on('exchange', (msg) => {
        let exchange = msg['exchange']['chatid']
        var con = amqp.connect('amqp://192.168.99.102', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });
    
                channel.assertQueue('', {
                    exclusive: true
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue(q.queue, exchange, '');
    
                    channel.consume(q.queue, function (msg) {
                        if (msg.content) {
                            console.log(" [x] %s", msg.content.toString());
                            socket.emit('message', msg.content.toString());
                        }
                    }, {
                            noAck: true
                        });
                });
            });
        })

      });

});


