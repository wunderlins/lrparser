CREATE TABLE covers(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	contenttype TEXT,
	size INTEGER,
	data blob
);

CREATE TABLE playlist(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   dt INTEGER, -- unix timestamp
   song TEXT,
   artist TEXT,
   album TEXT, 
   cover_id INTEGER
);

