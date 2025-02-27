import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { FormCartComponent } from './components/form-cart/form-cart.component';
import { InfoProfiloComponent } from './components/info-profilo/info-profilo.component';
import { GamesUserComponent } from './components/games-user/games-user.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { guardGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent, canActivate:[guardGuard] },
  { path: 'register', component:RegistrazioneComponent},
  { path: 'admin', component:AdminComponent, canActivate:[adminGuard]},
  {
    path: 'account',
    component: AccountComponent , canActivate:[guardGuard],
    children: [
      { path: '', redirectTo: 'ordini', pathMatch: 'full' },
      { path: 'ordini', component: OrdiniComponent },
      { path: 'formcard', component: FormCartComponent },
      { path: 'infoUser', component: InfoProfiloComponent },
      { path: 'gamesuser', component: GamesUserComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
