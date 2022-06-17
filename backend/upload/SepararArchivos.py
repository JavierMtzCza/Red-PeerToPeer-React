from os import system
import sys 

nombreArchivo = sys.argv[1]
nombreSinExtension = nombreArchivo.split(".")

system("split -n 3 "+ nombreArchivo + " " + nombreSinExtension[0])