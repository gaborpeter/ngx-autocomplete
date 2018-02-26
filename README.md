# @avas/NgxAutocomplete

Autocomplete component for Angular4+

## Feautures

Works only with HTTPClient.

Works only with reactive forms.

Static array and API call support.

Highlight matches (case insensitive).

Keyboard support.

AOT compatible.

## Installation
```
npm install @avas/ngx-autocomplete --save
```

## Inputs

* **type**<_string_> - The input field type (text by default).
* **placeholder**<_string_> - The input field placeholder.
* **apiString**<_string_> - API URL to be called.
* **paramName**<_string_> - The keyword string will be attached as query string parameter with the given name. For example "https://yourURL?paramName=keyword"
* **suggestionPropName**<_string_> - By default the response coming from the API is handled as an array of string. If suggestionPropName is provided then response will be handled as an array of objects and the given property will be mapped on the suggestion list.
* **payloadPropName**<_string_> - The property name of the response payload. If not provided then the response will be handled as the payload itself.
* **staticDataSource**<_any[]_> - Array of string or objects. If second then suggestionPropName must be provided.
* **control**<FormControl> - The ngx-autocomplete selector must be part of a reactive form.

## Outputs

* **selected**<_string_> - Emits an event once the item is selected.

## Usage

First import NgxAutocompleteModule to your module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxAutocompleteModule } from './ngx-autocomplete/ngx-autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then create a reactive form:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export class AppComponent {

  myForm: FormGroup;
  weekdays: any[] = [
    {
      name: 'Monday'
    },
    {
      name: 'Tuesday'
    },
    {
      name: 'wednesday'
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      keyword: ''
       });
  }

}
```

Add seletor with static array source:

```html
<form [formGroup]="myForm">
  <ngx-autocomplete formControlName="keyword"
                    [control]="myForm.controls.keyword"
                    [staticDataSource]="weekdays"
                    suggestionPropName="name"
                    (selected)="onSelected($event)"></ngx-autocomplete>
</form>
```

Add seletor with API call:

```html

<form [formGroup]="myForm">
  <ngx-autocomplete formControlName="keyword"
                    [control]="myForm.controls.keyword"
                    apiString="http://localhost:3000/api/ascent/queryascents"
                    paramName="keyword"
                    payloadPropName="payload"
                    suggestionPropName="name"
                    (selected)="onSelected($event)"></ngx-autocomplete>
</form>
```

## Override built-in styles

Use ::ng-deep selector to override built-in element or class styles. For example:

```css
ngx-autocomplete ::ng-deep input {
     /* your style comes here */
}
```
```css
ngx-autocomplete ::ng-deep .highlighted {
    /* your style comes here */
}
```

