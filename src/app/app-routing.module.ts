import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { FormCartComponent } from './components/form-cart/form-cart.component';
import { InfoProfiloComponent } from './components/info-profilo/info-profilo.component';
import { GamesUserComponent } from './components/games-user/games-user.component';
import { authGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"shop", component:ShopComponent},
  {path:"cart", component:CartComponent},
  {path:"account", component:AccountComponent, children:[
    {path:'', redirectTo:'ordini',pathMatch:'full'},
    {path:"ordini", component:OrdiniComponent},
    {path: "formcard", component:FormCartComponent},
    {path:"infoUser", component:InfoProfiloComponent},
    {path:"gamesuser", component:GamesUserComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
