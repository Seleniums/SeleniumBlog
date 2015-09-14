import sqlite3

__author__ = 'wanlu'

from modules.base import HttpBaseHandler
import tornado
from common.tools import dictfetchall

loader = tornado.template.Loader('.')

class TemplateLoginPageHandler(HttpBaseHandler):
    def get(self):
        html = loader.load('template/login.html').generate()
        self.write(html)

    def post(self):
        username = self.get_argument('username')
        password = self.get_argument('password')
        print(username + ': ' + password)

        conn = sqlite3.connect('data.sqlite')
        cursor = conn.cursor()

        sql = '''
        select * from users
        where username = "%s" and password="%s"
        ''' % (username, password)

        cursor.execute(sql)
        r = dictfetchall(cursor)
        if r == []:
            self.write({'success': False})
        else:
            self.set_cookie('user', username)
            self.write({'success': True})
