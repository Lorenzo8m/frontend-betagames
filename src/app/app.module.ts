import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AccountComponent } from './pages/account/account.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CardComponent } from './pages/shop/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OrdersCardComponent } from './components/orders-card/orders-card.component';
import { UsersCardComponent } from './components/users-card/users-card.component';
import { GamesCardComponent } from './components/games-card/games-card.component';
import { EditorsCardComponent } from './components/editors-card/editors-card.component';
import { AuthorsCardComponent } from './components/authors-card/authors-card.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { FormCartComponent } from './components/form-cart/form-cart.component';
import { FormsModule } from '@angular/forms';
import { InfoProfiloComponent } from './components/info-profilo/info-profilo.component';
import { GamesUserComponent } from './components/games-user/games-user.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeAdminCardComponent } from './components/home-admin-card/home-admin-card.component';
import { SinglegameCardComponent } from './components/singlegame-card/singlegame-card.component';
import { GameModifyModalComponent } from './components/game-modify-modal/game-modify-modal.component';
import { GameDeleteModalComponent } from './components/game-delete-modal/game-delete-modal.component';
import { GameCreateModalComponent } from './components/game-create-modal/game-create-modal.component';
import { EditorCreateModalComponent } from './components/editor-create-modal/editor-create-modal.component';
import { EditorDeleteModalComponent } from './components/editor-delete-modal/editor-delete-modal.component';
import { EditorUpdateModalComponent } from './components/editor-update-modal/editor-update-modal.component';
import { EditorSingleCardComponent } from './components/editor-single-card/editor-single-card.component';
import { AuthoeSingleCardComponent } from './components/author-single-card/authoe-single-card.component';
import { AuthorDeleteModalComponent } from './components/author-delete-modal/author-delete-modal.component';
import { AuthorCreateModalComponent } from './components/author-create-modal/author-create-modal.component';
import { AuthorUpdateModalComponent } from './components/author-update-modal/author-update-modal.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AccountComponent,
    ShopComponent,
    CardComponent,
    CartComponent,
    AdminComponent,
    SidebarComponent,
    OrdersCardComponent,
    UsersCardComponent,
    GamesCardComponent,
    EditorsCardComponent,
    AuthorsCardComponent,
    OrdiniComponent,
    FormCartComponent,
    InfoProfiloComponent,
    GamesUserComponent,
    HomeAdminCardComponent,
    SinglegameCardComponent,
    GameModifyModalComponent,
    GameDeleteModalComponent,
    GameCreateModalComponent,
    EditorCreateModalComponent,
    EditorDeleteModalComponent,
    EditorUpdateModalComponent,
    EditorSingleCardComponent,
    AuthoeSingleCardComponent,
    AuthorCreateModalComponent,
    AuthorDeleteModalComponent,
    AuthorUpdateModalComponent,
    RegistrazioneComponent,
    SigninComponent,
    HomeAdminCardComponent,
    DetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
