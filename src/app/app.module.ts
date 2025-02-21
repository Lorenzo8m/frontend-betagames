import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule  } from '@angular/forms';

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
import { OrdiniComponent } from './components/ordini/ordini.component';
import { FormCartComponent } from './components/form-cart/form-cart.component';
import { FormsModule } from '@angular/forms';
import { InfoProfiloComponent } from './components/info-profilo/info-profilo.component';
import { GamesUserComponent } from './components/games-user/games-user.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AccountComponent,
    ShopComponent,
    CardComponent,
    CartComponent,
    OrdiniComponent,
    FormCartComponent,
    InfoProfiloComponent,
    GamesUserComponent,
    RegistrazioneComponent,
    SigninComponent
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
