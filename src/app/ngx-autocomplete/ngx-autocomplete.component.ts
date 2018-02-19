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

  ngAfterViewInit(){ }

  ngOnInit() {
    this.control.valueChanges.subscribe((changes) => {
        console.log(changes);
        if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
            this.innerValue = '';      
            this.inputRef.nativeElement.value = '';
        } 
      }
    );
    this.suggestions$ = this.control.valueChanges
      .debounceTime(500)
      .switchMap((fieldValue: string) => this.ngxAutocompleteService.getSuggestons(this.doQuery, fieldValue))
      .publishReplay(1).refCount();
  }

}