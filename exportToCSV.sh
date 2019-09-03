mysqldump --tab /tmp --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by=0x0d0a traildb trail_action_log


#SQL Query: 
#
# SELECT trail_id as TRAIL_ID, time_in_trail as TIME_IN_TRAIL, action as ACTION INTO OUTFILE '/tmp/export2.csv'  FIELDS TERMINATED BY "," ENCLOSED BY "\"" LINES TERMINATED BY "\n" FROM trail_action_log where trail_id = 8;

#Links to read: 
#https://stackoverflow.com/questions/5941809/include-headers-when-using-select-into-outfile
