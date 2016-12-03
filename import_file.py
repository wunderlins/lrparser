#!/usr/bin/env python

from config import *

from urllib2 import urlopen
from uuid import uuid4
import magic
import sqlite3
import sys

con = sqlite3.connect(db)
cur = con.cursor()

def download_file(url):
	""" download image and insert it into covers table_name
	
	if an image with this source name is already i nthe database, the 
	method will return and integer (id) of the record, otherwise it will return a list:
	 - local_filename
	 - size
	 - remote_filename
	 - mimte-type
	 - binary data """
	orig_file = url.split("/")[-1]
	
	# check if we already have it
	sql = "SELECT id FROM covers WHERE name=?"
	res = cur.execute(sql, (orig_file,))
	id = cur.fetchone()
	
	# we already have it
	if id != None:
		return id[0]
	
	ud = urlopen(url)
	uuid = uuid4()
	filename = base_folder + "/lparser-" + str(uuid) + ".jpg"
	fd = open(filename, "wb+")
	buffer = ""
	content = ""
	while True:
		buffer = ud.read(1024)
		content += buffer

		if buffer == "":
			break
	
		fd.write(buffer)

	ud.close()
	size = fd.tell()
	#fd.seek(0)
	fd.close()

	mime = magic.Magic(mime=True)

	return [filename, size, orig_file, mime.from_file(filename), content]

rec = download_file("http://www.lounge-radio.com/code/pushed_files/playlist_sam342/az_B11199392_Cafe%20Mambo_Goldfrapp.jpg")
print rec

"""
sql = "INSERT INTO covers (name, contenttype, size, data) VALUES (?, ?, ?, ?)"
cur.execute(sql, (rec[2], rec[3], rec[1], sqlite3.Binary(rec[4])))
con.commit()


"""
