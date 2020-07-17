import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserArchiveComponent } from './user/user-archive/user-archive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AccueilComponent } from './user/accueil/accueil.component';
import { UserConnexionComponent } from './user/user-connexion/user-connexion.component';
import { UserMpForgetComponent } from './user/user-mp-forget/user-mp-forget.component';
import { UserPasswordComponent } from './user/user-password/user-password.component';
import { OrsComponent } from './ors/ors.component';
import { MatRadioModule } from '@angular/material/radio';
import { OrsLoopComponent } from './ors/ors-loop/ors-loop.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserArchiveComponent,
    NavBarComponent,
    AccueilComponent,
    UserConnexionComponent,
    UserMpForgetComponent,
    UserPasswordComponent,
    OrsComponent,
    OrsLoopComponent,
    // FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
