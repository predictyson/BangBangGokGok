from django.db import models

# Create your models here.

class Theme_info:
    def __init__(self, themeId, title, imgUrl, genres):
        self.themeId = themeId
        self.title = title
        self.imgUrl = imgUrl
        self.genres = genres
