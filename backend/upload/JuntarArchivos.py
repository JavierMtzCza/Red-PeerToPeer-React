from os import system
import sys 

nombreSinExtension = sys.argv[1].split(".")

system("cat "+ nombreSinExtension[0] + "* > " + nombreSinExtension[0] + "Rec")