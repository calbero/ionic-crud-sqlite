import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {DatabaseServiceProvider} from "../../providers/database-service/database-service";
import {User} from "../../models/user";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users : Array<User> = [];
  public user: User = new User('', '');

  constructor(public navCtrl: NavController, public dbService: DatabaseServiceProvider,
              public modalCtrl: ModalController) {
    this.getListUsers();
  }

  clickDelete(user) {
    this.dbService.deleteUser(user).then(() => {
      console.log('deleted user');
      this.getListUsers();
    }, (error) => {
      console.error(error.message);
    })
  }

  clickEdit(event, user) {
    let popover = this.modalCtrl.create(PopoverPage, user);
    popover.present({
      ev: event
    });
  }

  clickAdd(event) {
    let popover = this.modalCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  getListUsers() {
    this.dbService.findAllUsers().then( (retList) => {
      this.users = retList;
    });
  }

}
