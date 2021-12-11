import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../services/news-api.service';
import { Article } from '../models/article.model';
import { SavedArticle } from '../models/savedArticle.model';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';

@Component( {
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: [ './article.page.scss' ],
} )
export class ArticlePage implements OnInit {
  articles: Article[];
  chosenArticle: Article;
  savedArticles: SavedArticle[];
  constructor ( private activatedRoute: ActivatedRoute,
    private s: NewsApiService,
    private databaseService: DatabaseService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      const title = paramMap.get( 'id' );

      this.s.getNewsByTitle( title ).subscribe( ( data ) => {
        this.chosenArticle = data.articles[ 0 ];
      } );
    } );
  }

  onLikeButton() {
    this.databaseService.getDatabaseState().subscribe(
      async ( ready ) => {
        if ( ready ) {
          this.databaseService.addNewArticle( this.chosenArticle );

          const toast = await this.toastController.create( {
            message: 'The article has been saved.',
            duration: 2000,
          } );
          toast.present();
        }
      }
    );
  }
}
