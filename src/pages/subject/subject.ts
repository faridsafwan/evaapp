import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subject } from '../../models/subject';
import { EditSubjectListPage } from '../edit-subject-list/edit-subject-list';
import { SubjectsService } from '../../services/subjects';
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage implements OnInit {
  subject: Subject;
  index: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public subjectService: SubjectsService) {
  }

  ngOnInit(){
    this.subject = this.navParams.get('subject');
    this.index = this.navParams.get('index');
  }

  onEditSubject(){
    this.navCtrl.push(EditSubjectListPage, {mode: 'Edit', subject: this.subject, index: this.index});
  }

  onDeleteSubject() {
    this.subjectService.removeSubject(this.index);
    this.navCtrl.popToRoot();
  }
}
