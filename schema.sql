CREATE TABLE covers(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	contenttype TEXT,
	size INTEGER,
	data blob,
	thumb_data blob,
	thumb_size INTEGER
);

CREATE TABLE playlist(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   dt INTEGER, -- unix timestamp
   song TEXT,
   artist TEXT,
   album TEXT, 
   cover_id INTEGER
);

CREATE TABLE like(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   dt INTEGER -- unix timestamp
);

