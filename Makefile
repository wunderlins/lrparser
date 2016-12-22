
PREFIX_PATH=lib/

pip:
	pip install --target="$(PREFIX_PATH)" lockfile

kill:
	kill -TERM `ps aux | awk '/lrparse/ {print $2}'`
