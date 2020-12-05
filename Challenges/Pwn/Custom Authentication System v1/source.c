#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER 256

int main()
{
	unsigned int authenticated = 0;
	char password[BUFFER], flag[50];
	FILE *pf;
	
	printf("Password: "); fflush(stdout);
	gets(password);

	if (strncmp("P@s$w0rD!", password, 9) == 0)
		printf("hhctf_flag{such_a_great_password_right?}\n");
	else
		printf("Incorrect password!\n");

	if (authenticated)
	{
		pf = fopen("flag.txt", "r");
		fgets(flag, 50, pf);
		printf("Here is your flag: %s\n", flag); fflush(stdout);
	}

	return 0;
}
