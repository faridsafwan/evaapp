import { Component } from '@angular/core';
import { NavController,PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditSubjectListPage } from '../edit-subject-list/edit-subject-list';
import { Subject } from '../../models/subject';
import { SubjectsService } from '../../services/subjects';
import { SubjectPage } from '../subject/subject';
import { DatabaseOptionsPage} from '../database-options/database-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {
  subjects: Subject[];

  constructor(private navCtrl: NavController, 
              private subjectsService: SubjectsService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.subjects = this.subjectsService.getSubjects();
  }
  onNewSubject() {
    this.navCtrl.push(EditSubjectListPage, {mode: 'New'});
  }

  onLoadSubject(subject: Subject, index: number){
    this.navCtrl.push(SubjectPage,{subject: subject,index:index});
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data){
          return;
        }
        if (data.action == 'load') {
          loading.present();
         this.authService.getActiveUser().getToken()
          .then(
            (token: string) =>{
              this.subjectsService.fetchList(token)
                .subscribe(
                  (list: Subject[]) => {
                    loading.dismiss();
                    if (list){
                      this.subjects = list;
                    } else {
                      this.subjects = [];
                    }
                  },
                  error => {
                    loading.dismiss();
                    this.handleError(error.message);
                  }
                );
            }
          );
        } else if( data.action == 'store'){
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) =>{
              this.subjectsService.storeList(token)
                .subscribe(
                  () => loading.dismiss(),
                  error => {
                    loading.dismiss();
                    this.handleError(error.message);
                  }
                );
            }
          );
          
        }
      }
    );
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
