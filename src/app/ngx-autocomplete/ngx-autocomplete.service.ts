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

    private subject = new BehaviorSubject([]);
    suggestions$: Observable<any[]> = this.subject.asObservable();

    constructor(private http: HttpClient) { }

    getSuggestons(doQuery: boolean,
                  keyword: string,
                  apiString: string,
                  paramName: string,
                  payloadPropName?: string): Observable<any[]> {
        if (doQuery) {
          if (keyword.length === 0 || keyword == '') {
            return Observable.of([]);
          } else {
                return this.http.get(apiString, { params: { [paramName]: keyword } })
                    .map((response: any) => {
                      if (payloadPropName !== null) {
                        return response[payloadPropName];
                      } else {
                        return response;
                      }
                    })
                    .do((response: any[]) => this.subject.next(response));
          }
        } else {
          return Observable.of([]);
        }   
    }

}


 /**
 * To be added:
 * Static array support
 * Highlight matches
 * Keyboard support
 */