import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Article } from '../models/article.model';
import { SavedArticle } from '../models/savedArticle.model';

@Injectable( {
  providedIn: 'root'
} )
export class DatabaseService {
  private databaseObj: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject( false );
  savedArticles = new BehaviorSubject( [] );

  constructor ( private sqlite: SQLite, private plt: Platform ) {
    this.plt.ready().then( () => {
      this.createDBAndTables();
    } );
  }

  private async createDBAndTables() {
    try {
      this.databaseObj = await this.sqlite.create( {
        name: 'data.db',
        location: 'default'
      } );

      // await this.databaseObj.executeSql( 'CREATE TABLE IF NOT EXISTS ARTICLES(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT, urlToImage TEXT, publishedAt TEXT, description TEXT)', [] );
      await this.databaseObj.executeSql( 'CREATE TABLE IF NOT EXISTS ARTICLES(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT, urlToImage TEXT)', [] );
      this.dbReady.next( true );

    } catch ( e ) {
      console.log( "ERROR" );
      console.log( e.message );
    }
  }

  getDatabaseState(): Observable<boolean> {
    return this.dbReady.asObservable();
  }

  async addNewArticle( article: Article ) {
    const data: string[] = [ article.title, article.url, article.urlToImage ];

    try {
      await this.databaseObj.executeSql( 'INSERT INTO ARTICLES(title, url, urlToImage) VALUES(?,?,?)', data );
    } catch ( e ) {
      console.log( "failed to save a new article" );
      console.log( e );
    }
  }

  async getAllSavedArticles(): Promise<SavedArticle[]> {
    const allArticles: SavedArticle[] = [];

    try {
      const data = await this.databaseObj.executeSql( 'SELECT * FROM ARTICLES', [] );

      for ( let i = 0; i < data.rows.length; i++ ) {
        allArticles.push( data.rows.item( i ) );
        console.log( data.rows.item( i ) );
      }
    } catch ( e ) {
      console.log( "error reading from database" );
      console.log( e );
    }

    return allArticles;
  }
}
