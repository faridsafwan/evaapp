import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectsService } from '../../services/subjects';
import { Subject } from '../../models/subject';

@Component({
  selector: 'page-edit-subject-list',
  templateUrl: 'edit-subject-list.html',
})
export class EditSubjectListPage implements OnInit{
  mode= 'New;'
  subjectForm: FormGroup;
  subject: Subject;
  index: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private subjectsService: SubjectsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubjectListPage');
  }

  ngOnInit(){
    this.mode= this.navParams.get('mode');
    if (this.mode == 'Edit'){
      this.subject = this.navParams.get('subject');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit(){
    const value = this.subjectForm.value;

    if (this.mode == 'Edit'){
      this.subjectsService.updateSubject(this.index, value.code, value.name);
    } else {
      this.subjectsService.addSubject(value.code, value.name);
    }
    this.subjectForm.reset();
    this.navCtrl.popToRoot();
  }
  
  private initializeForm(){
    let code = null;
    let name = null;

    if(this.mode == 'Edit'){
      code = this.subject.code;
      name = this.subject.name;
    }
    this.subjectForm = new FormGroup({
      'code': new FormControl(code, Validators.required),
      'name': new FormControl(name, Validators.required)
    })
  }

}
