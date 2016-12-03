#!/usr/bin/env python

import sqlite3
from config import *
from PIL import Image
import StringIO

con = sqlite3.connect(db)
cur = con.cursor()

sql = "SELECT size, contenttype, data FROM covers WHERE id = ?"
cur.execute(sql, (101,))
rec = cur.fetchone()

def create_thumbnail(rawdata):
	#response = Response(rec[2], mimetype=rec[1])
	img = StringIO.StringIO(rawdata)
	image = Image.open(img)

	orig_size = image.size
	#print orig_size
	new_height = thumbnail_height
	new_width = int(round((0.0+orig_size[0])*(new_height/(0.0+orig_size[1]))))
	#print (new_width, new_height)

	thumbnail = image.resize((new_width, new_height))

	out = StringIO.StringIO()
	thumbnail.save(out, format=image.format)

	return out.getvalue()

print create_thumbnail(rec[2])
