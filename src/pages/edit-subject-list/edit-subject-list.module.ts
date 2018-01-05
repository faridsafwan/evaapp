import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSubjectListPage } from './edit-subject-list';

@NgModule({
  declarations: [
    EditSubjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSubjectListPage),
  ],
})
export class EditSubjectListPageModule {}
