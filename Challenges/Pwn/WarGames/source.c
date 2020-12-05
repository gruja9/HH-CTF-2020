#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER 256

void getflag();
void startgame();

int main()
{
	startgame();

	return 0;
}

void startgame()
{
	char buffer[BUFFER+2];
	char game[] = "Global Thermonuclear War";
	
	printf("GREETINGS PROFESSOR FALKEN.\n"); fflush(stdout);
	fgets(buffer, BUFFER, stdin);
	printf("\nHOW ARE YOU FEELING TODAY?\n"); fflush(stdout);
	fgets(buffer, BUFFER, stdin);
	printf("\nSHALL WE PLAY A GAME?\n"); fflush(stdout);
	fgets(buffer, BUFFER, stdin);
	if(strstr(buffer, game) != NULL)
	{
		printf("\nWOULDN'T YOU PREFER A GOOD GAME OF CHESS?\n"); fflush(stdout);
		fgets(buffer, BUFFER, stdin);
		if(strstr(buffer, "Later") != NULL)
		{
			printf("\nAWAITING FIRST STRIKE COMMAND\n---------------------------------------\n\nPLEASE LIST YOUR PRIMARY TARGETS BY CITY AND/OR COUNTY NAME:\n"); fflush(stdout);
			gets(buffer);
		}
	}
}

void getflag()
{
	char flag[50];

	FILE *pf;
	pf = fopen("flag.txt", "r");
	fgets(flag, 50, pf);
	printf("\n\nA STRANGE GAME.\nTHE ONLY WINNING MOVE IS NOT TO PLAY.\n"); fflush(stdout);
	printf("%s", flag); fflush(stdout);
}
