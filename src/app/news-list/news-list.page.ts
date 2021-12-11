import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../services/news-api.service';
import { Article } from '../models/article.model';

@Component( {
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: [ './news-list.page.scss' ],
} )
export class NewsListPage implements OnInit {
  allArticles: Article[];
  displayedArticles: Article[];

  constructor ( private newsApiService: NewsApiService ) { }

  ngOnInit() {
    this.newsApiService.getTopNews().subscribe( ( data ) => {
      this.allArticles = data[ 'articles' ];
      this.displayedArticles = [ ...this.allArticles ];
    } );
  }

  updateSearch( event: any ): void {
    const searchText = event.target.value.toLowerCase();

    this.displayedArticles = this.allArticles.filter( ( article => {
      return article.title.toLowerCase().includes( searchText );
    } ) );
  }
}
