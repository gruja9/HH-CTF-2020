#!/usr/bin/python3

import random
import threading
from time import sleep

def time(stop):
	sleep(10)
	print("Time ran out!")
	stop.set()

def math(stop):

	def wrong():
		print("Wrong!")
		stop.set()
		exit()
	
	num1 = random.randint(1, 99)
	num2 = random.randint(1, 99)
	ex = f"{num1}+{num2}\n"
	res = str(eval(ex))	# input från användare blir str, so lösningen måste också vara samma typ av data för att kunna jämföra
	sol = input(ex).strip()
	if res != sol:
		wrong()

	num1 = random.randint(1, 99)
	num2 = random.randint(1, 99)
	num3 = random.randint(1, 9)
	ex = f"\n{num1}+{num2}*{num3}\n"
	res = str(eval(ex))
	sol = input(ex).strip()
	if res != sol:
		wrong()
	
	num1 = random.randint(1, 990)
	num2 = random.randint(1, 990)
	num3 = random.randint(1, 99)
	ex = f"\n({num1}+{num2})*{num3}\n"
	res = str(eval(ex))
	sol = input(ex).strip()
	if res != sol:
		wrong()
	
	num1 = random.randint(1, 999)
	num2 = random.randint(1, 999)
	num3 = random.randint(1, 99)
	ex = f"\n(({num1}+{num2})*{num3})-{num2}*{num3}\n"
	res = str(eval(ex))
	sol = input(ex).strip()
	if res != sol:
		wrong()
	
	num1 = random.randint(1, 9999)
	num2 = random.randint(1, 9999)
	num3 = random.randint(1, 999)
	num4 = random.randint(1,9)
	ex = f"\n(({num1}**{num4}+{num2})*{num3})-{num3}**{num4}\n"
	res = str(eval(ex))
	sol = input(ex).strip()
	if res != sol:
		wrong()

	print("hhctf_flag{9fe3421cbae8ceea66bb43bdf6d5e690}")
	stop.set()
	exit()

def main():
	stop = threading.Event()
	t_math = threading.Thread(target=math, args=(stop,))
	t_time = threading.Thread(target=time, args=(stop,))
	t_math.daemon = True
	t_time.daemon = True
	t_math.start()
	t_time.start()

	while not stop.is_set():
		sleep(0.1)

	exit()

main()
