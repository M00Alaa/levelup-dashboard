import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BooksComponent } from './pages/books/books.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ExamsQuestionsComponent } from './pages/exams-questions/exams-questions.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BooksComponent,
    CategoriesComponent,
    QuestionsComponent,
    ExamsQuestionsComponent,
    AdminsComponent,
    LoginComponent,
    NotfoundComponent,
    SideBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
