import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../../models/user";

@Injectable()
export class DatabaseServiceProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'database.db',
        location: 'default'
      })
        .then((db:SQLiteObject) => {
          console.log('db created');
          this.database = db;
          this.createTable().then(() => {
            console.log('table created');
            this.dbReady.next(true);
          }, (error) => {
            console.error(error.message);
          });
        })
    })
  }

  private isReady() {
    return new Promise((resolve, reject) => {
      if (this.dbReady.getValue()) {
        resolve();
      } else {
        this.dbReady.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        })
      }
    })
  }

  private createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)';
    return this.database.executeSql(sql, []);
  }

  findAllUsers() {
    let sql = 'SELECT * FROM user';
    return this.isReady().then(() => {
      return this.database.executeSql(sql, []).then((data) => {
        let users = [];
        for (let i = 0; i < data.rows.length; i++) {
          users.push(data.rows.item(i));
        }
        return users;
      })
    })
  }

  saveUser(user: User) {
    let sql = 'INSERT INTO user(name, email) VALUES(?, ?)';
    return this.isReady().then(() => {
      console.log('save user');
      return this.database.executeSql(sql, [user.name, user.email]);
    })
  }

  deleteUser(user: User) {
    let sql = 'DELETE FROM user WHERE id = ?';
    return this.isReady().then( () => {
      return this.database.executeSql(sql, [user.id]);
    })
  }

  updateUser(user: User) {
    let sql = 'UPDATE user SET name=?, email=? WHERE id=?';
    return this.isReady().then( () => {
      return this.database.executeSql(sql, [user.name, user.email, user.id]);
    })
  }

}
