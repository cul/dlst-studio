#! /bin/bash
d=$(date +%Y-%m-%d-%T)
echo "Commit for $d" > cron.log
git add . 
git commit -m "cron job for $d" &> cron.log
echo " " > cron.log 
git push origin master
