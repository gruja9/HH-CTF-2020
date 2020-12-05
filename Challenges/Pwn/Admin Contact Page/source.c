//Compile this binary with: "gcc -m32 -z execstack -o binary source.c"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void getinput();
void jmp();

int main()
{
	getinput();
	return 0;
}

void getinput()
{
	char buffer[500];

	printf("---Contact Page---\n"); fflush(stdout);
	printf("Your name: "); fflush(stdout); fgets(buffer, 50, stdin); buffer[strlen(buffer)-1] = '\0';
	printf("Your team name: "); fflush(stdout); fgets(buffer, 50, stdin); buffer[strlen(buffer)-1] = '\0';
	printf("Message to the admin team: "); fflush(stdout); gets(buffer);
	printf("Thanks for the message! We will soon get in touch with you!\n"); fflush(stdout);
}
void jmp()
{
	__asm__("jmp *%esp\n\t");
}
