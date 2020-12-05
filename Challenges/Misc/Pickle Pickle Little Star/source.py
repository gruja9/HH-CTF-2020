#!/usr/bin/python3

import base64
import pickle

res = input("Welcome to Halmstad University!\nWhat subject do you want to study: ")
try:
	pickle.loads(base64.b64decode(res))
	print("Good choice!")
except base64.binascii.Error:
	print("Not Base64 data")
except pickle.UnpicklingError:
	print("Not pickled")
