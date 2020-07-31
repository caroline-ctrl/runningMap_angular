import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserArchiveComponent } from './user/user-archive/user-archive.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccueilComponent } from './user/accueil/accueil.component';
import { UserConnexionComponent } from './user/user-connexion/user-connexion.component';
import { UserMpForgetComponent } from './user/user-mp-forget/user-mp-forget.component';
import { UserPasswordComponent } from './user/user-password/user-password.component';
import { OrsComponent } from './ors/ors.component';
import { OrsLoopComponent } from './ors/ors-loop/ors-loop.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index/accueil'},
  { path: 'index', component: NavBarComponent, children: [
    { path: 'roundTrip', component: OrsComponent },
    { path: 'loop', component: OrsLoopComponent },
    { path: 'update/:id', component: UserUpdateComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'create', component: UserCreateComponent },
    { path: 'users', component: UserComponent },
    { path: 'login', component: UserConnexionComponent },
    { path: 'monCompte', component: UserDetailComponent },
    { path: 'mpForget', component: UserMpForgetComponent },
    { path: 'password', component: UserPasswordComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
