import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { pull, forEach, isString } from 'lodash';

@Injectable()
export class NgxAutocompleteService {

    private subject = new BehaviorSubject([]);
    suggestions$: Observable<any[]> = this.subject.asObservable();
    keyword: string;

    constructor(private http: HttpClient) { }

    highlightMatches = (finding: string): any => {
      const matched = finding.match(new RegExp(this.keyword, "gi"));
      const splitted = finding.split(new RegExp(this.keyword, "i"));
      let position = 1;
      for (let i = 0; i < matched.length; i++) {
        splitted.splice(position, 0, matched[i]);
        position = position + 2;
      }
      pull(splitted, '');
      let splittedObj: any = {};
      splitted.forEach(function(string, index){
        splittedObj[index] = {value: string, class: string.indexOf(' ') === 0 ? 'inline' : 'inline-block'};
      });
      let suggestion: any = {};
      suggestion.full = finding;
      suggestion.splitted = (<any>Object).entries(splittedObj);
      return suggestion;
    }

    getSuggestonsfromStaticDataSource(doQuery: boolean,
                                      keyword: string,
                                      staticDataSource: any[],
                                      suggestionPropName? : string): Observable<any[]> {
      this.keyword = keyword;
      if (doQuery) {
        if (!/\S/.test(keyword)) {
          return Observable.of([]);
        } else {
          const output = [];
          let staticDataSourceMapped = [];
          if (suggestionPropName) {
            staticDataSourceMapped = staticDataSource.map(element => element[suggestionPropName]);
          } else {
            staticDataSourceMapped = staticDataSource;
          }
          if (staticDataSourceMapped.length > 0 && isString(staticDataSourceMapped[0])) {
            forEach(staticDataSourceMapped, (element) => {
              if (element.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                output.push(element);
              }
            });
          } else {
            console.error('Please provide with suggestionPropName!');
            return Observable.of([]);
          }
          if (output.length > 0) {
            const outputHighlighted = output.map(this.highlightMatches);
            return Observable.of(outputHighlighted).do((response: any[]) => this.subject.next(response));
          } else {
            return Observable.of([]);
          }
        }
      } else {
        return Observable.of([]);
      } 
    }

    getSuggestonsfromApi(doQuery: boolean,
                        keyword: string,
                        apiString: string,
                        paramName: string,
                        payloadPropName?: string,
                        suggestionPropName? : string): Observable<any[]> {
        this.keyword = keyword;
        if (doQuery) {
          if (!/\S/.test(keyword)) {
            return Observable.of([]);
          } else {
                return this.http.get(apiString, { params: { [paramName]: keyword } })
                    .map((response: any) => {
                      if (payloadPropName !== null) {
                        if (suggestionPropName !== null) {
                          return response[payloadPropName].map(value => value[suggestionPropName]).map(this.highlightMatches);
                        } else {
                          return response[payloadPropName].map(this.highlightMatches);
                        }
                      } else {
                        if (suggestionPropName !== null) {
                          return response.map(value => value[suggestionPropName]).map(this.highlightMatches);
                        } else {
                          return response.map(this.highlightMatches);
                        }
                      }
                    })
                    .do((response: any[]) => this.subject.next(response));
          }
        } else {
          return Observable.of([]);
        }   
    }

}