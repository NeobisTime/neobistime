import time
import random

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


name = input("Enter the name of victim: ")
time.sleep(2)
print(f"Found sources{bcolors.WARNING} Instagram, Vk, Odnoklassniki{bcolors.ENDC}\n")
time.sleep(2)

for i in range(70):
    time.sleep(0.1*random.randint(1, 4))
    print(f"{bcolors.OKBLUE}{name}{bcolors.ENDC}|Parsing Info:{bcolors.WARNING} Instagram, Vk, Odnoklassniki{bcolors.ENDC}[{bcolors.OKGREEN}{'#'*i}{(70-i)*' '}]{bcolors.ENDC}%")
    print(f"{bcolors.FAIL}Found data{bcolors.ENDC}: {i*random.randint(1, 10)}, Sending to Secure Data Base|Location http://46.331.123.534:6893423 n")

print()
print(f"{bcolors.OKGREEN}Data successfully mined!{bcolors.ENDC}")
print(f"{bcolors.OKGREEN}Updating database{bcolors.ENDC}")
print()
