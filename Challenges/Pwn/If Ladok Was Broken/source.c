#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER 51

int main()
{
	char buffer[BUFFER+1];
	int grade = 3;

	printf("---LADOK---\nYour grade: %d (%p)\n\nChange it to 5.\nEnter your new grade: ", grade, &grade); fflush(stdout);
	fgets(buffer, BUFFER, stdin);
	buffer[strlen(buffer)] = '\0';
	printf("\nYou entered: "); printf(buffer); fflush(stdout);

	printf("\nYour grade: %d\n", grade); fflush(stdout);
	if (grade == 5)
	{
		printf("\nGood job!\nhhctf_flag{fe2191cea0eb2bfc9ddb8fd72ee1d7d3}\n"); fflush(stdout);
	}

	return 0;
}
