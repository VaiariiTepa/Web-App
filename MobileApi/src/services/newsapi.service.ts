
import {Injectable} from '@angular/core';
import {Http}       from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { NewsApiGlobal } from '../models/newsapi-global.model';

@Injectable()

//nom de l'API pour la classe
export class NewsApiService{

  private baseUrl: string = 'https://newsapi.org/v2/';
  private source: string = 'google-news-fr';
  private apiKey: string = '0bb4a2e6bbc14dd0a74a158ec3888aa4';

  constructor(private http: Http) {


  }

  public getArticles():any{

    const url=`${this.baseUrl}top-headlines?sources=${this.source}&apiKey=${this.apiKey}`;
console.log(url);
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as NewsApiGlobal)
    .catch(error => console.log('Une erreur est survenue ' + error))

  }
}
