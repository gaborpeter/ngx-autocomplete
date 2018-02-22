import { Component, OnInit, forwardRef, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgxAutocompleteService } from './ngx-autocomplete.service';

@Component({
  selector: 'ngx-autocomplete',
  templateUrl: './ngx-autocomplete.component.html',
  styleUrls: ['./ngx-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxAutocompleteComponent),
    multi: true
  }]
})
export class NgxAutocompleteComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() type: string = 'text';
  @Input() placeholder: string;
  @Input() apiString: string;
  @Input() paramName: string;
  @Input() payloadPropName: string;
  @Input() suggestionPropName: string;
  @Input() staticDataSource: any[];
  @Input() control: FormControl = new FormControl();
  @ViewChild('input') inputRef: ElementRef;
  private innerValue: string = '';
  private doQuery: boolean = true;
  suggestions$: Observable<any[]>;

  constructor(private ngxAutocompleteService: NgxAutocompleteService) { }

  get value(): string {
    return this.innerValue;
  };

  set value(value: string) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  writeValue(value: string) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  propagateChange = (_: any) => { }

  onChange(e: Event, value: string){
    this.doQuery = true;
    this.innerValue = value;
    this.propagateChange(this.innerValue);
  }

  fillTextBox(value: string) {
    this.doQuery = false;
    this.inputRef.nativeElement.value = value;
    this.innerValue = value;
    this.propagateChange(value);
  }

  getClass(value: string, style: string): string {
    if (value.toLowerCase() == this.control.value.toLowerCase()) {
      return `highlighted ${style}`;
    } else {
      return style;
    }
  }

  ngAfterViewInit(){ }

  ngOnInit() {
    this.control.valueChanges.subscribe((changes) => {
        if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
            this.innerValue = '';      
            this.inputRef.nativeElement.value = '';
        } 
      }
    );
    if (this.apiString && this.paramName && !this.staticDataSource) {
      this.suggestions$ = this.control.valueChanges
        .debounceTime(500)
        .switchMap((fieldValue: string) => this.ngxAutocompleteService.getSuggestonsfromApi(this.doQuery, fieldValue, this.apiString, this.paramName, this.payloadPropName || null, this.suggestionPropName || null))
        .publishReplay(1).refCount();
    } else if (!this.apiString && !this.paramName && this.staticDataSource) {
      this.suggestions$ = this.control.valueChanges
        .debounceTime(500)
        .switchMap((fieldValue: string) => this.ngxAutocompleteService.getSuggestonsfromStaticDataSource(this.doQuery, fieldValue, this.staticDataSource, this.suggestionPropName || null))
        .publishReplay(1).refCount();
    } else {
      console.error('Either static data source or API URL needs to be provided!');
    }

  }

}
