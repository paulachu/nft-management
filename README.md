# Nft Management Projet

## Equipe
L'equipe de developpement est composee de Valentin Thiron (valentin.thiron), Mehdi Seddiki (mehdi.seddiki) et Paul Radic (paul.radic).
<br>
<br>

## Technologies

### Nestjs
Nous avons decider d'utiliser nestjs pour la creation de notre api puisque nous avions deja eu l'occasion de l'utiliser pendant les phases de decouvertes des cours mais aussi lors de projets annexes.
<br>
<br>

### TypeOrm
Nous avons decider d'utiliser TypeOrm pour la gestion de la base de donnees.
En effet, nous avions deja utiliser cet orm pour des projets annexes.
<br>
<br>

### JWT
Pour ce qui est de la gestion des connexions nous avons utiliser des jwts.
Ceux-ci permettent d'obtenir un échange sécurisé de jetons.
Ce qui nous permet de verifier que l'utilisateur est bien connecte.
<br>
<br>

### Postgres
Nous avions dans un premier temps decider d'utiliser sqlite mais lors de l'ajout des fonctionnalites propres aux collections
et au nft nous avons changer de type de base de donnees pour pouvoir utiliser des enums dans nos modeles.
<br>
<br>

### Docker compose
Pour avoir une configuration compatible avec tous les envirennements, nous avons decider d'utiliser un docker compose contenant deux services : l'api (nestjs) et la base de donnees (postgres)
<br>
<br>

## Demarrer l'application
Vous pouvez demarrer l'application via la commande suivante:
```shell script
docker-compose up
```
Par defaut, l'application est disponible sur le port 3000.
<br>
<br>

## Arreter l'application
Vous pouvez arreter l'application via la commande suivante:
```shell script
docker-compose down
```
<br>

## Swagger
La docuementation de ce projet est disponible sur le endpoint /docs sous le format d'un swagger.