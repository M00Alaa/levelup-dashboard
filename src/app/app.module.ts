import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BooksComponent } from './pages/books/books.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ExamsQuestionsComponent } from './pages/exams-questions/exams-questions.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BooksComponent,
    CategoriesComponent,
    QuestionsComponent,
    ExamsQuestionsComponent,
    AdminsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
