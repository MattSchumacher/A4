import { Component, OnInit } from '@angular/core';
import { SavedArticle } from '../models/savedArticle.model';
import { DatabaseService } from '../services/database.service';

@Component( {
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: [ './favourite.page.scss' ],
} )
export class FavouritePage implements OnInit {
  savedArticles: SavedArticle[];
  displayedArticles: SavedArticle[] = [];
  searchText = '';
  set;

  constructor ( private databaseService: DatabaseService ) { }
  // shownArticles: SavedArticle[];
  // ngOnInit() {
  //   this.storage.get('articles').then(articles =>{
  //     this.savedArticles = articles;
  //     this.shownArticles = articles;
  //   })
  // }

  ngOnInit() {
    this.databaseService.getDatabaseState().subscribe( async ( ready ) => {
      if ( ready ) {
        this.savedArticles = await this.databaseService.getAllSavedArticles();
        this.displayedArticles = [...this.savedArticles];
      }
    } );
  }

  updateSearch( event: any ): void {
    this.searchText = event.target.value.toLowerCase();

    this.displayedArticles = this.savedArticles.filter( ( article => {
      return article.title.toLowerCase().includes( this.searchText );
    } ) );
  }
}
