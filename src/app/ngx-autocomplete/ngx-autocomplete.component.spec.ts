import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAutocompleteComponent } from './ngx-autocomplete.component';

describe('NgxAutocompleteComponent', () => {
  let component: NgxAutocompleteComponent;
  let fixture: ComponentFixture<NgxAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
