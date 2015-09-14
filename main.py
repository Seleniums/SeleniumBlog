# -*- encoding:utf-8 -*-
__author__ = 'wanlu'

import tornado.web
import tornado.ioloop
import tornado.template
import tornado.websocket
import os
from modules.login.urls import urls as login_urls
from modules.chat.urls import urls as chat_urls
from modules._2048.urls import urls as _2048_urls
from modules.minesweep.urls import urls as minesweep_urls
from modules.test.urls import urls as test_urls
from modules.templates.urls import urls as template_urls

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "./static")
}  # 配置静态文件路径

static_urls = [(r"/css/(.*)", tornado.web.StaticFileHandler, {"path": "./static/css"}),
               (r"/images/(.*)", tornado.web.StaticFileHandler, {"path": "./static/img"}),
               (r"/js/(.*)", tornado.web.StaticFileHandler, {"path": "./static/js"}),
               ]

urls = static_urls + login_urls + chat_urls + _2048_urls + minesweep_urls + test_urls + template_urls

application = tornado.web.Application(urls, **settings)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
