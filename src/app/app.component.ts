import { Component, ViewChild } from '@angular/core';
import { Platform,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SubjectListPage } from '../pages/subject-list/subject-list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;

  rootPage: any = SubjectListPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              private menuCtrl: MenuController,
              private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyA7BBAeguIfsXihLeHhymC6ARvwG6tyYh0",
      authDomain: "evaluationapp-23f25.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user=> {
      if (user){
        this.isAuthenticated = true;
        this.rootPage = SubjectListPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    })

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}
