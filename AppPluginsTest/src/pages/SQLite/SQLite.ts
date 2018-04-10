// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// const DATABASE_FILE_NAME: string = 'data.db';

// @Component({
//   selector: 'page-sqlite',
//   templateUrl: 'SQLite.html'
// })

// export class SQLitePage{

//   private db: SQLiteObject;
  
//   movies: string[] = []; 
//   title: string ;
//   rating: number;
//   description: string;
//   categorie: string;

//   constructor(public navCtrl: NavController, private sqlite: SQLite){
//     this.createDatabaseFile();
//   }

//   //Create the DataBase
//   private createDatabaseFile(): void{
//     this.sqlite.create({
//       name: DATABASE_FILE_NAME,
//       location: 'default'
//     })
//       .then((db: SQLiteObject) => {
//         console.log('Bdd créer !')
//         this.db = db;
//         this.createTables();
//       })
//       .catch(e => console.log(e));
//   }

//   //Create the table of DataBase
//   private createTables(): void{
//     this.db.executeSql('CREATE TABLE IF NOT EXISTS `MOVIES`( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `eval` BLOB NOT NULL CHECK(3), `descritpion` TEXT, `categoryId` INTEGER, FOREIGN KEY(`categoryId`) REFERENCES `CATEGORIES`(`id`) )', {})
//       .then(() =>{
//         console.log('Tables Movies created !')
//         this.db.executeSql('CREATE TABLE IF NOT EXISTS `CATEGORIES` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL )', {})
//       .then(() => console.log('Tables Categories created !'))
//       .catch(e => console.log(e));
//       })
//       .catch(e => console.log(e));
//   }

//   //Insert data on DataBase
//   public saveMyFilm() {
//     console.log('Movie name is ' + this.title);
//     console.log('Rating is ' + this.rating + '/5');
//     console.log('Description is ' + this.description);
//     console.log('Categorie is ' + this.categorie);

//     this.db.executeSql('INSERT INTO `CATEGORIES` (name) VALUES (\''+ this.categorie +'\')', {})
//       .then(() =>{console.log('New categorie is add !')

//     this.db.executeSql('INSERT INTO `MOVIES` (name, eval, description, categoryId) VALUES (\'' + this.title + '\', '+ this.rating + ', \'' + this.description+ '\' , last_insert_rowid())', {})
//       .then(() => console.log('New movie is add !'))
//       .catch(e => console.log(e));
//       })
//       .catch(e => console.log(e));
//   }

//   public retrieveFilms() {
//     this.movies = [];

//     this.db.executeSql('SELECT name FROM `MOVIES`', {})
//     .then((data) => {
//       if(data == null){
//         return;
//       }

//       if(data.rows){
//         if(data.rows.length > 0) {
//           for(var i = 0; i < data.rows.length; i++){
//             this.movies.push(data.rows.item(i).name);
//           }
//         }
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Native Components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
   selector: 'page-sqlite',
   templateUrl: 'sqlite.html'
})
export class SQLitePage {

   private db: SQLiteObject;

   // On déclare les variables
   movies: string[] = [];
   titleMovie: string;
   ratingMovie: number;
   descriptionMovie: string;
   categorieMovie: string;
   
   // On insère ce que l'on a besoin dans le constructeur
   constructor(public navCtrl: NavController, private sqlite: SQLite) {
       this.createDatabaseFile();
   }

   //On créé la base de donnée
    private createDatabaseFile(): void {
        this.sqlite.create({
            name: DATABASE_FILE_NAME,
            location: 'default'
        })
            .then((db: SQLiteObject) => { //=== Si tout ce passe bien, on affiche ce message
                console.log('bdd créée !');
               this.db = db;
               this.createTables();
            })
            .catch(e => console.log(e)); //=== Sinon on affiche un message d'erreur
    }

   // On créé les tables
    private createTables(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `MOVIES` ( `idMovie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `eval` INTEGER NOT NULL DEFAULT 3, `desc` TEXT, `categoryId` INTEGER )', {})
            .then(() => {
               console.log('Table Movies created !');
               
                this.db.executeSql('CREATE TABLE IF NOT EXISTS `CATEGORIES` ( `idCategories` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL )', {})
                    .then(() => console.log('Table Categories created !'))
                    .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
    }

   // On sauvegarde les données
   public saveMyFilm() {
        console.log('Movie name -> ' + this.titleMovie);
        console.log('Movie name -> ' + this.ratingMovie + '/5');
        console.log('Movie name -> ' + this.descriptionMovie);
        console.log('Movie name -> ' + this.categorieMovie);

       //  INSERT INTO`CATEGORIES`(name)VALUES("test");
       //  INSERT INTO`MOVIES`(name, eval, desc, categoryId)VALUES("Nom film", 3, "Description", 1);

       // On insère les données
       this.db.executeSql('INSERT INTO`CATEGORIES`(name)VALUES("' + this.categorieMovie +'")', {})
           .then(() => {
               console.log('Categorie inserted !');

               this.db.executeSql('INSERT INTO`MOVIES`(name, eval, desc, categoryId)VALUES(\'' + this.titleMovie + '\',' + this.ratingMovie + ', \' ' + this.descriptionMovie + '\', last_insert_rowid())', {})
                   .then(() => console.log('Movie inserted !'))
                       .catch(e => console.log(e));

           })
           .catch(e => console.log(e));
   }

   public retrieveFilms() {
       this.movies = []; // on réinitialise
       this.db.executeSql('SELECT name FROM `MOVIES`', {})
       .then((data) => {
           if(data ==null){
               return;
           }

           if(data.rows) {
               if(data.rows.length > 0) {
                   for(var i=0; i<data.rows.length; i++){
                       this.movies.push(data.rows.item(i).name);
                   }
               }
           }
       });
   }
}