import { NativeStoragePage } from './../native-storage/native-storage';
import { SQLitePage } from './../SQLite/SQLite';
import { Component } from '@angular/core';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NativeStoragePage;
  tab2Root = SQLitePage;

  constructor() {

  }
}
