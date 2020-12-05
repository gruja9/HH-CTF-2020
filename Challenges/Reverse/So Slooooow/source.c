//Compile with: gcc -m32 -lm source.c -o binary

#include <stdio.h>
#include <math.h>

int isPrime(int);

int main()
{
	long int prime = 275034687;
	long int curr = 0;
	int i;

	for(i=2;;i++)
	{
		if (isPrime(i))
			curr++;
		if (curr == prime)
		{
			printf("hhctf_flag{%d}\n", i);
			break;
		}
	}
	return 0;
}

int isPrime(int num)
{
	int i;

	if (num == 2 || num == 3)
		return 1;

	for(i=2; i <= sqrt((double)num); i++)
		if(num % i == 0)
			return 0;
	return 1;
}
