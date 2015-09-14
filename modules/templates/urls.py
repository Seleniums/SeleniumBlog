__author__ = 'wanlu'

from modules.templates.handlers import *

urls = [(r"/index.html", TemplateIndexPageHandler),
        # (r"/heart1.html", TemplateHeart1PageHandler),
        (r"/chat.html", TemplateChatPageHandler), ]
