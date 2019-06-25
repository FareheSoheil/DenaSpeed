import crypto from 'crypto';
import sqlite3 from 'sqlite3';
import path from 'path';

const databasePath = path.join(__dirname, '/../database.sqlite');
const stateKey = 'StateHashKey97';
const stateHashedKey = crypto
  .createHash('sha256')
  .update(stateKey)
  .digest('base64');
const sqliteDB = sqlite3.verbose();

function dbInitializer() {
  return new Promise((resolve, reject) => {
    const db = new sqliteDB.Database(databasePath, err => {
      if (err) {
        console.error(err);
        reject('Could not connect to db');
      } else {
        console.log(
          '***************************1-Connected to the SQlite database*****************',
        );
        resolve(db);
      }
    });
  });
}
function createStateTable(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const createStateQuery =
        'CREATE TABLE IF NOT EXISTS State (stateID TEXT PRIMARY KEY,state TEXT)';
      db.run(createStateQuery, err => {
        if (err) reject(err, 'Could not create table');
        else {
          console.log(
            '****************2-created succesfully : ***************',
            db,
          );
          resolve(db);
        }
      });
    });
  });
}
// function insertState(db) {
//   return new Promise((resolve, reject) => {
//     db.serialize(() => {
//       const insertIntoStateTable =
//         'INSERT INTO State (stateID , idToken , role , lastURL) VALUES (?, ?, ?, ?)';
//       db.run(insertIntoStateTable, stateHashedKey, '', '', '', (err) => {
//         if (err) {
//           console.log("could not insert" , err);
//         } else {
//           const data = {
//             idToken: 'hello',
//             role: 'reviewer',
//             lasturl: '/forget',
//           };
//           console.log("******************3-INSERTED SUCCESSFULLY*********************");
//           resolve(data);
//         }
//       });
//     });
//   })
// }
function startDB() {
  dbInitializer().then(createStateTable);
  // .then(insertState);
}

export { startDB, databasePath, stateHashedKey };
