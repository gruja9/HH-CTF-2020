#!/bin/bash

if [[ $EUID -ne 0 ]]
then
	echo "This script must be run as root!"
	exit 1
fi

name=$1
allowedCommands=(/bin/ls /bin/cat)

useradd -m $name -s /bin/rbash
mkdir /home/$name/bin
for i in "${allowedCommands[@]}"
do
	ln -s $i /home/$name/bin
done
echo PATH="/home/$name/bin" >> /home/$name/.profile
echo PATH="/home/$name/bin" >> /home/$name/.bashrc
chown root. /home/$name/.profile
chown root. /home/$name/.bashrc
chmod 644 /home/$name/.profile
chmod 644 /home/$name/.bashrc
ln -s /dev/null /home/$name/.bash_history
