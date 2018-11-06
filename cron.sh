#! /bin/bash
log=~/www/dhc-studio/cron.log
d=$(date +%Y-%m-%d)
t=$(date +%T)
cd ~/www/dhc-studio/
git add . 
git commit -m "Rebuild for $d $t" >>$log 2>>$log
echo " " >> $log 
git push origin master
