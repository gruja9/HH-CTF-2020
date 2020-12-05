#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void decryptFlag();


int flag_ascii[44] = {105,106,102,120,107,101,109,116,106,113,134,63,62,112,114,68,72,115,72,71,71,124,80,123,80,81,77,78,83,87,132,80,130,91,136,90,139,140,96,90,138,91,100,169};

int main()
{
	char buf[50];
	int buf_ascii[50] = {};
	int i,j;

	printf("Enter the flag: ");
	fgets(buf, 49, stdin);
	buf[strlen(buf)-1] = '\0';
	if(strlen(buf) != 44)
	{
		printf("Incorrect!\n");
		exit(0);
	}

	for(i=0; buf[i] != '\0'; i++) buf_ascii[i] = buf[i];
	for(j=0; j<i; j++)
	{
		if(flag_ascii[j] != buf_ascii[j])
		{
			printf("Incorrect!\n");
			exit(0);
		}
	}
	printf("Correct!\n");

	return 0;
}

void decryptFlag()
{
	int i;
	int flag[44];
	char flag_str[44];

	for(i=0; i < 44; i++)
		flag[i] = flag_ascii[i] - (i+1);

	for(i=0; i < 44; i++) flag_str[i] = flag[i];
	flag_str[i] = '\0';
	printf("%s\n", flag_str);
}
