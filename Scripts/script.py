#!/usr/bin/python3

import requests
from bs4 import BeautifulSoup
import json
import secrets
import sys
import string
import os
import time


# Configuration

participants_file = "participants.txt"
teams_file = "teams.txt"
players_per_team = 5		# Replace if necessary

ctfd_website = "http://ctfeh.hh.se/"
ctfd_username = ""
ctfd_password = ""


# Specific-Purpose Functions

def createUsername(name, salt):

	names = name.split(" ")
	username = names[0][:3] + names[1][:3] + str(salt)

	return username

def ctfd_login(username, password):

	login_page = ctfd_website + "login"
	r = requests.get(login_page)
	if r.status_code != 200:
		print(login_page + " unavailable! Exiting...")
		sys.exit()
	cookie = r.cookies['session']
	cookies = {"session": cookie}
	soup = BeautifulSoup(r.content, 'html.parser')
	nonce = soup.find(id="nonce")['value']
	login_data = {"name": username,
				  "password": password,
				  "_submit": "Submit",
				  "nonce": nonce
			}
	r = requests.post(login_page, data=login_data, cookies=cookies, allow_redirects=False)
	if r.status_code != 302:
		print("Unable to authenticate to " + login_page + ". Exiting...")
		sys.exit()
	else:
		print("OK")
	cookie = r.cookies['session']

	return cookie

def ctfd_create_user(user, session_token):		# Name:School:Email:Username:Password

	user_page = ctfd_website + "admin/users/new"
	cookies = {"session": session_token}
	r = requests.get(user_page, cookies=cookies)
	if r.status_code != 200:
		print(user_page + " unavailable! Exiting...")
		exit()
	soup = BeautifulSoup(r.content, 'lxml')
	nonce = soup.find("script").string.strip().split(',')[1].strip().split(":")[1].strip().split('"')[1]	# Extract "csrfNonce" from the script tag
	
	add_user_page = ctfd_website + "api/v1/users?notify=true"
	user = user.split(":")
	data = {"name": user[3],
			"email": user[2],
			"password": user[4],
			"type": "user",
			"verified": True,
			"hidden": False,
			"banned": False,
			"fields": []
		}
	headers = {"CSRF-Token": nonce, "Content-Type": "application/json"}
	r = requests.post(add_user_page, data=json.dumps(data), headers=headers, cookies=cookies)
	if r.status_code == 400:
		print("Email address " + user[2] + " or username " + user[3] + " may have already been used! Add the user manually. Continuing...")
	elif r.status_code != 200:
		print("Unable to add a user. Exiting...")
		exit()

def ctfd_create_team(team, session_token):		# Name:Password

	team_page = ctfd_website + "admin/teams/new"
	cookies = {"session": session_token}
	r = requests.get(team_page, cookies=cookies)
	if r.status_code != 200:
		print(team_page + " unavailable! Exiting...")
		exit()
	soup = BeautifulSoup(r.content, 'lxml')
	nonce = soup.find("script").string.strip().split(',')[1].strip().split(":")[1].strip().split('"')[1]	# Extract "csrfNonce" from the script tag
	
	add_team_page = ctfd_website + "api/v1/teams"
	team = team.split(":")
	data = {"name": team[0],
			"email": team[0].replace(" ", "_") + "@hhctf2020.com",		# Email is just shit cause we don't need it for the teams
			"password": team[1],
			"hidden": False,
			"banned": False,
			"fields": []
		}
	headers = {"CSRF-Token": nonce, "Content-Type": "application/json"}
	r = requests.post(add_team_page, data=json.dumps(data), headers=headers, cookies=cookies)
	if r.status_code == 400:
		print("Team name " + team[0] + " may have already been used! Add the team manually. Continuing...")
	elif r.status_code != 200:
		print("Unable to add a team. Exiting...")
		exit()
	print(team[0] + " created successfully..")

def ctfd_join_team(user, team):

	user = user.split(":")
	team = team.split(":")
	session_token = ctfd_login(user[3], user[4])
	cookies = {"session": session_token}
	join_team_page = ctfd_website + "teams/join"

	r = requests.get(join_team_page, cookies=cookies)
	if r.status_code != 200:
		print(join_team_page + " unavailable! Exiting...")
		sys.exit()
	soup = BeautifulSoup(r.content, 'html.parser')
	nonce = soup.find(id="nonce")['value']
	data = {"name": team[0],
				  "password": team[1],
				  "_submit": "Join",
				  "nonce": nonce
			}
	r = requests.post(join_team_page, data=data, cookies=cookies, allow_redirects=False)
	if r.status_code != 302:
		print("Unable to join team " + team[0] + ". Add the participants to the team manually. Continuing...")


# Main Functions

def randomizeTeams():

	with open(participants_file, "r") as participants_f:
		participants = participants_f.readlines()
	teams_f = open(teams_file, "w")
	num_of_teams = len(participants) // players_per_team
	remaining = len(participants) % players_per_team	# if number of participants is not divisable by the number of players per team
	extra = 0		# if remaining is 4 and a team of 4 players will be created
	if remaining == 4:
		num_of_teams += 1
		remaining = 0
		extra = 1
	elif remaining == 3:
		num_of_teams += 1
		remaining = 0
		extra = 2
	base_password = string.ascii_letters + string.digits
	salt = 1	# To distinguish people with the same names

	for i in range(1,num_of_teams+1):
		team_password = ''.join(secrets.choice(base_password) for j in range(8))
		teams_f.write("Team {}:{}\n".format(str(i),team_password))
		add = 0
		rem = 0
		if remaining > 0:
			add = 1
		if extra > 0:
			rem = 1

		for j in range(players_per_team+add-rem):
			teammate = secrets.choice(participants)
			participants.remove(teammate)
			teammate = teammate.strip()
			teammate_username = createUsername(teammate.split(":")[0], salt)
			teammate_password = ''.join(secrets.choice(base_password) for j in range(8))
			teammate += ":{}:{}".format(teammate_username, teammate_password)
			teams_f.write(teammate+"\n")
			salt += 1
		remaining -= 1
		extra -= 1
		teams_f.write("\n")		# Space between the teams

	teams_f.close()

def createTeams():

	session_token = ctfd_login(ctfd_username, ctfd_password)
	i = 0
	with open(teams_file, "r") as teams_f:
		for line in teams_f:
			line = line.strip()		# Remove the newline after each line
			if line == "":			# Skip the newlines between the teams
				continue
			elif line.startswith("Team"):
				team = line
				ctfd_create_team(line, session_token)
				i += 1
			else:
				ctfd_create_user(line, session_token)
				ctfd_join_team(line, team)
				i += 2
			if i > 5:	# The CTFd website has a protection against sending lots of requests in a small period, so this makes sure it doesn't get triggered
				print("Sleeping...")
				time.sleep(2)
				i = 0
	print("Teams created successfully!")


# Main

def main():

	if len(sys.argv) < 2:
		print("Usage: %s <command>" % sys.argv[0])
		print("Commands: randomizeTeams, createTeams")
		sys.exit(0)

	if sys.argv[1] == "randomizeTeams":
		randomizeTeams()
	elif sys.argv[1] == "createTeams":
		createTeams()
	else:
		print("Unknown command")
		print("Commands: randomizeTeams, createTeams")

main()
