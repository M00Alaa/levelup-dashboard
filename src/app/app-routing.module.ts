import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { BooksComponent } from './pages/books/books.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ExamsQuestionsComponent } from './pages/exams-questions/exams-questions.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admins', canActivate: [AuthGuard], component: AdminsComponent },
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },
  { path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'exams-questions', canActivate: [AuthGuard], component: ExamsQuestionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions', canActivate: [AuthGuard], component: QuestionsComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
