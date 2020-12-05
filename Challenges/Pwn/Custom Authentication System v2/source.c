//compile it with: gcc source.c -o binary -m32

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER 50

int main()
{
	char password[BUFFER];
	char *grade, *ladok_file, *ladok_grade;
	FILE *pf;

	grade = (char *)malloc(2);
	ladok_file = (char *)malloc(BUFFER);
	ladok_grade = (char *)malloc(BUFFER);
	strcpy(ladok_file, "ladok.txt");

	printf("Password: "); fflush(stdout);
	fgets(password, BUFFER, stdin);
	password[strlen(password)-1] = '\0';

	if (strcmp("96240ef5192a36f2d7aa72863facdbec", password) == 0)
	{
		printf("What grade do you want to get from Eric Järpe in Math: "); fflush(stdout);
		gets(grade);

		pf = fopen(ladok_file, "r");
		fgets(ladok_grade, BUFFER, pf);
		memset(ladok_grade+strlen(ladok_grade)-1, '\0', 1);
		printf("You had %s and now you have %s!\n", ladok_grade, grade); fflush(stdout);
	}
	else
		printf("Incorrect Password!\n");

	free(grade);
	free(ladok_file);
	free(ladok_grade);
	return 0;
}
