import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
    {
        path: '',
        component: QuizComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }