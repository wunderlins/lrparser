#!/usr/bin/env bash

while true; do
	ps | grep daemon.sh | grep -v grep >/dev/null 2&>1
	if [[ "$?" != "0" ]]; then
		nohup ./daemon.sh &
	fi
	ps | grep httpd | grep -v grep >/dev/null 2&>1
	if [[ "$?" != "0" ]]; then
		nohup ./httpd &
	fi

	sleep 60
done

