import { Subject } from "../models/subject";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class SubjectsService{
    private subjects: Subject[] = [];

    constructor(private http: Http, private authService: AuthService){}

    addSubject(code: string,
               name: string){
    this.subjects.push(new Subject(code,name));
    console.log(this.subjects);
    }

    getSubjects(){
        return this.subjects.slice();
    }

    updateSubject(index: number,
                 code: string,
                 name: string){
    this.subjects[index] = new Subject(code,name);
    }

    removeSubject(index:number){
        this.subjects.splice(index,1);
    }

    storeList(token: string){
        const userId = this.authService.getActiveUser().uid;
         return this.http.put('https://evaluationapp-23f25.firebaseio.com/' + userId + '/subjects.json?auth=' + token, this.subjects)
                 .map((response: Response) => {
                     return response.json();
                 });
    }

    fetchList(token: string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://evaluationapp-23f25.firebaseio.com/' + userId + '/subjects.json?auth= ' + token)
                 .map((response: Response) => {
                     const subjects: Subject[] = response.json() ? response.json() : [];
                     for (let item of subjects){
                        if(!item.hasOwnProperty('code') || !item.hasOwnProperty('name') ){
                            item.code = "";
                            item.name = "";
                        }
                     }
                     return subjects;
                 })
                 .do((subjects: Subject[]) => {
                     if (subjects){
                        this.subjects = subjects
                     } else {
                        this.subjects = [];
                     }
                     
                 });
    }
}