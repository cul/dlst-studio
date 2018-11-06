#! /bin/bash
log=~/www/dhc-studio/cron.log
d=$(date +%Y-%m-%d)
t=$(date +%T)
cd ~/www/dhc-studio/
git config user.name "Alex Gil"
git add . 
git commit -m "Rebuild for $d $t" >>$log 2>>$log
HOME=/home/alex git push origin master >>$log 2>>$log
echo " " >> $log
