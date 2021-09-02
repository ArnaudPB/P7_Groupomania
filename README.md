Projet 7 - Groupomania !

utilisé pour ce projet:

    VueJs + vuex + vuetify
    NodeJs + express + sequelize
    Mysql

Frontend

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

npm start

si le navigateur ne s'ouvre pas automatiquement allez à :

    http://localhost:8080/

Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

npm start ou nodemon serve

Base de données

Se connecter au serveur MySql de votre choix. Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier 

 au lancement de l'application un compte administrateur est automatiquement créé (les identifiants se trouvent dans le fichier admin.js).


Utilisation

Pour s'inscrire, il vous faut renseigner :

    Un pseudo (entre 3 et 30 caractères)
    Une adresse mail valide
    Un mot de passe (de 8 à 20 caractères, lettres et chiffres acceptés uniquement, majuscules et minuscules, pas de symboles). Vous pouvez par la suite modifier votre profil (pseudo, bio, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.

Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

    un statut
    un statut + un lien (gifs ok)
    un statut + une image 
    Ces publications peuvent être likées, commentées, modifiées, supprimées. Le modérateur peut les supprimer.

