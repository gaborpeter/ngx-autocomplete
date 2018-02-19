import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NgxAutocompleteService {

    keyword: string;
    private subject = new BehaviorSubject([]);
    suggestions$: Observable<any[]> = this.subject.asObservable();

    constructor(private http: HttpClient) { }

    getSuggestons(doQuery: boolean, keyword: string): Observable<any[]> {
        this.keyword = keyword;
        if (doQuery) {
          if (keyword.length === 0 || keyword == '') {
            return Observable.of([]);
          } else {
                return this.http.get(`http://localhost:3000/api/ascent/queryascents?keyword=${keyword}`)
                    .map((res: any) => res.payload)
                    .do((crags: any[]) => this.subject.next(crags));
          }
        } else {
          return Observable.of([]);
        }   
    }

}