__author__ = 'wanlu'

from modules.base import *


class TemplateIndexPageHandler(HttpBaseHandler):
    def get(self):
        if self.get_cookie('user', False):
            # print(self.get_cookie('user', False))
            html = loader.load('template/index.html').generate()
            self.write(html)
        else:
            self.redirect('/')


class TemplateChatPageHandler(HttpBaseHandler):
    def get(self):
        if self.get_cookie('user', False):
            #print(self.get_cookie('user', False))
            html = loader.load('template/chat.html').generate()
            self.write(html)
        else:
            self.redirect('/')
