Compile binaries with: "gcc -m32 -fno-stack-protector source.c -o binary" (some require additional arguments which would have the complete compile command in their source code file)
Start them with: "tcpserver -DHR 0 <port> ./binary"
Start Python scripts with: "tcpserver -DHR 0 <port> ./source.py"
