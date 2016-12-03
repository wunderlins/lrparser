#!/usr/bin/env python
# -*- coding: UTF-8 -*-

"""
config for l-r.com playlist scraper

database schema:

CREATE TABLE playlist(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   dt INTEGER, -- unix timestamp
   song TEXT,
   artist TEXT,
   album TEXT
);
"""

DEBUG = 0 # 0 to disable
url = "http://www.lounge-radio.com/code/pushed_files/recently.html"
cover_url = "http://www.lounge-radio.com/code/pushed_files/"
base_folder = "/tmp"
db = "./lounge-radio.sqlite3"
limit = 100
last_update = "lastupdate.txt"
thumbnail_height = 32
