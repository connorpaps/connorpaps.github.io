import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageCollectionsComponent } from './manage-collections/manage-collections.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { ManageStorageComponent } from './manage-storage/manage-storage.component';
import { CreateStorageComponent } from './create-storage/create-storage.component';
import { EditStorageComponent } from './edit-storage/edit-storage.component';
import { CreateTradeComponent } from './create-trade/create-trade.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { CreateWantedComponent } from './create-wanted/create-wanted.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { MarketComponent } from './market/market.component';
import { ViewPostingComponent } from './view-posting/view-posting.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { UserListComponent } from './user-list/user-list.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { SettingsComponent } from './settings/settings.component';
import { ViewStorageComponent } from './view-storage/view-storage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'editcollection/:id',
    component: EditCollectionComponent,
  },
  {
    path: 'managecollections',
    component: ManageCollectionsComponent,
  },
  {
    path: 'createcollection',
    component: CreateCollectionComponent,
  },
  {
    path: 'viewcollection/:id',
    component: ViewCollectionComponent,
  },
  {
    path: 'viewstorage/:id',
    component: ViewStorageComponent,
  },
  {
    path: 'additem/:id',
    component: AddItemComponent,
  },
  {
    path: 'viewitem/:id',
    component: ViewItemComponent,
  },
  {
    path: 'edititem/:id',
    component: EditItemComponent,
  },
  {
    path: 'managestorage',
    component: ManageStorageComponent,
  },
  {
    path: 'createstorage',
    component: CreateStorageComponent,
  },
  {
    path: 'editstorage/:id',
    component: EditStorageComponent,
  },
  {
    path: 'market',
    component: MarketComponent,
  },
  {
    path: 'mylistings',
    component: MyListingsComponent,
  },
  {
    path: 'editlisting/:id',
    component: EditListingComponent,
  },
  {
    path: 'viewposting/:id',
    component: ViewPostingComponent,
  },
  {
    path: 'createtrade',
    component: CreateTradeComponent,
  },
  {
    path: 'createsale',
    component: CreateSaleComponent,
  },
  {
    path: 'createwanted',
    component: CreateWantedComponent,
  },
  {
    path: 'chat',
    component: ChatHomeComponent,
  },
  {
    path: 'articles',
    component: ArticleListComponent,
  },
  {
    path: 'createarticle',
    component: CreateArticleComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'analytics',
    component: ViewAnalyticsComponent,
  },
  {
    path: 'gettingstarted',
    component: GettingStartedComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
