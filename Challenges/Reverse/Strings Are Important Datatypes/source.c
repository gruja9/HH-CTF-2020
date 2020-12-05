#include <stdio.h>
#include <string.h>

int main()
{
	char flag[] = "hhctf_flag{946306221a7a9741cb06a8849cbc54df}";
	char buf[50];

	printf("Enter the flag: ");
	fgets(buf, 49, stdin);
	buf[strlen(buf)-1] = '\0';

	if (strcmp(flag, buf) == 0) printf("Correct!\n");
	else printf("Incorrect!\n");

	return 0;
}
