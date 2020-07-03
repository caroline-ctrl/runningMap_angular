import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserArchiveComponent } from './user/user-archive/user-archive.component';


const routes: Routes = [
  { path: 'archiv/:id', component: UserArchiveComponent},
  { path: 'update/:id', component: UserUpdateComponent},
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'create', component: UserCreateComponent},
  { path: 'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
