import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../models/user";
import {DatabaseServiceProvider} from "../../providers/database-service/database-service";

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  public user: User = new User('', '');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtr: ViewController, public dbService: DatabaseServiceProvider) {
    if (this.navParams.data) {
      this.user = navParams.data;
    }
  }

  close() {
    this.viewCtr.dismiss();
  }

  getHeader() {
    return this.user.id ? 'EDIT' : 'ADD NEW';
  }

  saveUser() {
    this.dbService.saveUser(this.user).then( () => {
      console.log('saved user');
    }, (error) => {
      console.error(error.message);
    });
  }

  updateUser() {
    this.dbService.updateUser(this.user).then( () => {
      console.log('updated user');
    }, (error) => {
      console.error(error.message);
    });
  }

  clickSubmit() {
    if (this.user.id) {
      this.updateUser();
    } else {
      this.saveUser();
    }
    this.close();
  }

}
