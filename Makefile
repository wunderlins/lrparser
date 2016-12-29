PREFIX_PATH=lib/

pip:
	pip install --target="$(PREFIX_PATH)" lockfile

kill:
	$(shell kill -TERM `ps aux | awk '/lrparse/ {print $$2}'`)
	
.PHONY: kill

