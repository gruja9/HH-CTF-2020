#!/usr/bin/python3

import random

questions = {"How many segments does a typical memory representation in C consist of?" : "5",
			 "Which segment stores the instructions to be executed?" : ["text", "code"],
			 "Which segment grows in the opposite direction (from high memory addresses to lower) and stores static variables?" : "stack",
			 "What's called a segment that stores uninitialized global and static variables?" : "bss",
			 "There is a segment that stores initialized global and static variables. What is it called?" : "data",
			 "Which of all the segments is the only one that's read-only?": ["text", "code"],
			 "In modern environments, by default, is stack executable?" : "no",
			 "Another segment grows towards the stack and stores dynamically allocated variables. What is its name?" : "heap",
			 "What structure type does the stack implement with regard to the order in which elements are put onto and taken off from the stack ?" : "lifo"
	}

#Shuffle the dictionary
items = list(questions.items())
random.shuffle(items)
questions = dict(items)

for question in questions:
	answer = input(question + "\n").lower()
	if type(questions[question]) == list:
		if answer not in questions[question]:
			print('Wrong!')
			exit()
	else:
		if answer != questions[question]:
			print("Wrong!")
			exit()
	print()
print("hhctf_flag{cd6a0b2003c2ab7f8d8c021ae83abd06}")
