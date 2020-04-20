#!/usr/bin/env python
import pika
import sys

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='192.168.99.102'))
channel = connection.channel()

channel.exchange_declare(exchange='6aa02ae7413e427', exchange_type='fanout')

message = ' '.join(sys.argv[1:]) or "{'message': 'Hello World!'}"
channel.basic_publish(exchange='6aa02ae7413e427', routing_key='', body=message)
print(" [x] Sent %r" % message)
connection.close()