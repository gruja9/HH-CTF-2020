#include <stdio.h>
#include <string.h>

int main()
{
	char flag[] = "hhctf_flag{cb95fb695433f3d94c15fa81129c82e7}";
	char key[] = "X0R!";
	int flag_len = strlen(flag);
	int key_len = strlen(key);
	int i,j;

	printf("Here is your XOR-encrypted flag:\n"); fflush(stdout);
	for(i=0,j=0; i < flag_len; i++,j++)
	{
		j %= key_len;
		flag[i] ^= key[j];
		printf("%02x", (unsigned char)flag[i]); fflush(stdout);
	}
	printf("\n");

	return 0;
}
