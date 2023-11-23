## version console de l'application planning poker

import json

print("Bonjour Bienvenue dans planning")
regle_de_jeux = input("Definir la regle de jeux : ")
nombre_jouers = int(input("Saisir le nombre de joueurs :  "))

liste_des_joueurs = []

for i in range(nombre_jouers):
    joueur = input(f"Saisir le nom du jouer {i+1} : ")
    liste_des_joueurs.append(joueur)

for i in liste_des_joueurs:
    print(i)

print(f"Vous avez choisi la regle {regle_de_jeux} et le nombre de joeurs est {nombre_jouers}")

###
##
# Definissons les differentes taches
nombre_de_taches = int(input("Saisir le nombre de taches à effectuer : "))
liste_des_taches = []
for i in range(nombre_de_taches):
    tache = input(f"Tache {i + 1} : ")
    liste_des_taches.append(tache)
    with open('liste_des_taches.json', 'a') as jsonFile:
	    json.dump(tache, jsonFile)




