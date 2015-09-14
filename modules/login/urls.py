__author__ = 'wanlu'

from modules.login.handlers import *

urls = [
    (r"/", TemplateLoginPageHandler),
]