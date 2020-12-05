#!/bin/bash

if [[ $EUID -ne 0 ]]
then
	echo "This script must be run as root!"
	exit 1
fi

services=(/home/admin_contact_page/admin_contact_page /home/custom_v1/custom_v1 /home/custom_v2/custom_v2 /home/pickle_pickle/pickle_pickle.py /home/wargames/wargames /home/other_services/ladok /home/other_services/math.py /home/other_services/memory.py /home/other_services/xor_again /home/other_services/xor_rules)
start_port=10001

for service in "${services[@]}"
do
	user=$(echo $service | /usr/bin/cut -d"/" -f3)
	if [[ "$service" == "/home/other_services/xor_again" ]]
	then
		/usr/bin/ps -ef | grep $service | grep -v color | grep -v root || (echo "$service down, resetting..." >> /root/services_log.txt; /usr/bin/sudo -u $user $service &)
	else
		/usr/bin/ps -ef | grep $service | grep -v color | grep -v root || (echo "$service down, resetting..." >> /root/services_log.txt; cd /home/$user; /usr/bin/sudo -u $user /usr/bin/tcpserver -DHR 0 $start_port $service &)
	fi
	start_port=$((start_port+1))
done
pgrep -x lighttpd || (echo "lighttpd down, resetting..." >> /root/services_log.txt; service lighttpd start)
