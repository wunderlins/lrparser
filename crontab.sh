#!/usr/bin/env bash

exe=`pwd`/lrparser

( crontab -l | grep -v -F "$exe" ; echo "* * * * * $exe >/dev/null 2>&1" ) | crontab -
