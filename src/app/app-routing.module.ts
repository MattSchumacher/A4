import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'news-list', pathMatch: 'full' },
  {
    path: 'news-list',
    loadChildren: () => import( './news-list/news-list.module' ).then( m => m.NewsListPageModule )
  },
  {
    path: 'article/:id',
    loadChildren: () => import( './article/article.module' ).then( m => m.ArticlePageModule )
  },
  {
    path: 'favourite',
    loadChildren: () => import( './favourite/favourite.module' ).then( m => m.FavouritePageModule )
  },
];

@NgModule( {
  imports: [
    RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )
  ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
