#!/bin/bash
[ -f ~/.forever/iframely.log ] && mv ~/.forever/iframely.log ~/.forever/iframely.log-`date +"%m-%d-%Y"`
forever start -l iframely.log server.js
