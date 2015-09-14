# -*- encoding:utf-8 -*-
__author__ = 'wanlu'

from modules.base import HttpBaseHandler
import tornado

loader = tornado.template.Loader('.')

class Template2048PageHandler(HttpBaseHandler):
    def get(self):
        html = loader.load('template/test.html').generate()
        self.write(html)