import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResponsePage } from '../pages/response/response';

import { EditSubjectListPage } from '../pages/edit-subject-list/edit-subject-list';
import { SubjectListPage } from '../pages/subject-list/subject-list';
import { SubjectsService } from '../services/subjects';
import { SubjectPage } from '../pages/subject/subject';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import { HttpModule } from '@angular/http';
import { DatabaseOptionsPage} from '../pages/database-options/database-options'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ResponsePage,
    SubjectListPage,
    EditSubjectListPage,
    SubjectPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ResponsePage,
    SubjectListPage,
    EditSubjectListPage,
    SubjectPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SubjectsService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
