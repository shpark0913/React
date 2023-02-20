import math

for _ in range(N := int(input())):
    a, b = map(int, input().split())
    print(math.lcm(a, b))