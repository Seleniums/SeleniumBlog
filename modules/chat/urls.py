__author__ = 'wanlu'

from modules.chat.handlers import *

urls = [
    (r'/websocket', EchoWebSocket)
]