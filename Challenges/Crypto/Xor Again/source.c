#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <time.h>

#define PORT 10001

int rand_string(char *, size_t);

int main()
{
	int server_fd, new_socket, opt=1;
	struct sockaddr_in address;
	int addrlen = sizeof(address);
	char flag[] = "X0r_rUL35_0Nc3_@gAIn";
	char flag_xor[50];
	char key[20];
	char *msg, msg1[20];
	int flag_len = strlen(flag);
	int i,j;
	time_t t;
	int counts;

	if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
	{
		perror("socket failed");
		exit(1);
	}

	if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt)))
	{
		perror("setsockopt failed");
		exit(1);
	}
	address.sin_family = AF_INET;
	address.sin_addr.s_addr = INADDR_ANY;
	address.sin_port = htons(PORT);

	if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0)
	{
		perror("bind failed");
		exit(1);
	}
	if (listen(server_fd, 1000) < 0)
	{
		perror("listen failed");
		exit(1);
	}
	while(1)
	{
		if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0)
		{
			perror("accept failed");
			exit(1);
		}

		srand((unsigned) time(&t));
		counts = rand_string(key, 5);
		msg = "Here is your XOR-encrypted flag:\n";
		send(new_socket, msg, strlen(msg), 0);
		for(i=0,j=0; i < flag_len; i++,j++)
		{
			j %= 5;
			flag_xor[i] = flag[i] ^ key[j];
			sprintf(msg1, "%02x", (unsigned char)flag_xor[i]);
			send(new_socket, msg1, strlen(msg1), 0);
		}
		send(new_socket, "\n", 1, 0);
		close(new_socket);
		usleep(100000);
	}

	return 0;
}

int rand_string(char *str, size_t size)
{
	const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	size_t n;
	static int counts = 0;
	++counts;

	if (counts % 3 == 0)
	{
		for(n = 0; n < size; n++) str[n] = charset[0];
		str[size] = '\0';
	}
	else
	{
		if (size)
		{
			for (n = 0; n < size; n++)
			{
				int key = rand() % (int) (sizeof charset - 1);
				str[n] = charset[key];
			}
			str[size] = '\0';
		}
	}
	return counts;
}
