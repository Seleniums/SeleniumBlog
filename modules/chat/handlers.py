__author__ = 'wanlu'

import tornado.websocket
import datetime
import json


class EchoWebSocket(tornado.websocket.WebSocketHandler):
    clients = []

    def open(self):
        # print("WebSocket opened")
        EchoWebSocket.clients.append(self)

    def on_message(self, message):
        # print(message)
        user = self.get_cookie('user', False)  # get username
        sendto = "adm"
        date = datetime.datetime.now().isoformat().replace('T', ' ')[:19]  # get data format 2015-07-05 23:53:37

        for i in EchoWebSocket.clients:

            JSONObject = json.loads('{"from": "%s",'
                                    ' "to": "%s",'
                                    ' "msg": "%s",'
                                    ' "date": "%s"}' % (user, sendto, message, date))
            i.write_message(JSONObject)

    def on_close(self):
        # print("WebSocket closed")
        EchoWebSocket.clients.remove(self)
