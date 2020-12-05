#!/usr/bin/python3

from Crypto.Util import number

flag = b"hhctf_flag{3d5454216654359d5b40a27a40316867}"

prime1 = number.getPrime(1024)
prime2 = number.getPrime(1024)
prime3 = number.getPrime(1024)

n1 = prime1*prime2
n2 = prime2*prime3

m = int.from_bytes(flag, "big")
c = pow(m, 65537, n1)

with open("output.txt", "w") as f:
    f.write("n1 = " + str(n1) + "\n")
    f.write("n2 = " + str(n2) + "\n")
    f.write("c = " + hex(c) + "\n")
