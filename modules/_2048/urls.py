__author__ = 'wanlu'

from modules._2048.handlers import *

urls = [
    (r"/2048.html", Template2048PageHandler),
]