#!/usr/bin/python3

from pyminizip import compress
import string
import secrets
import os

base_pass = string.ascii_letters + string.digits

compress("flag.txt", None, "flag.zip", "abrakadabra", 0)
prev = "flag"
for i in range(174):
	curr = ''.join(secrets.choice(base_pass) for n in range(5))
	compress(prev+".zip", None, curr+".zip", prev, 0)
	os.remove(prev+".zip")
	prev = curr
