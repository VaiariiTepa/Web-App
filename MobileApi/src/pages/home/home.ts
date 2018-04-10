
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewsApiGlobal } from '../../models/newsapi-global.model';
import { NewsApiService } from '../../services/newsapi.service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: NewsApiGlobal = new NewsApiGlobal();

  constructor(public navCtrl: NavController, private newsApiService: NewsApiService) {

    this.newsApiService.getArticles()
    .then(newsFetched => {
      this.news = newsFetched;

      console.log(this.news);

      // var result=[];
      // for (var v in this.news){
      //   var test = this.news[v];

      //   for (var t in test){
      //     result = test[t];
      //     console.log(result['name']);
      //     console.log(result['description']);

      //   }
      // }

    });
  }

}
