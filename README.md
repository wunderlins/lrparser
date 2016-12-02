# lrparser

lrparser will scrape the playlist from l0unge-radi0.com into an sqlite3 databse.
Use `contab.sh`to install the crontab for continous scraping. every pass will 
download the last 100 items in the playlist. 

## install
- git clone git@github.com:wunderlins/lrparser.git
- run `./crontab.sh` to install the crontab
- create databse:

	$ sqlite ./lounge-radio.sqlite3 "CREATE TABLE playlist(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		dt INTEGER, -- unix timestamp
		song TEXT,
		artist TEXT,
		album TEXT
	);"
