import { Component, input, Input, OnInit, } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { questions } from '../../data/questions.json';



@Component({
  selector: 'app-quiz',
  imports: [RouterModule, NgFor],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  questions: any = {};
  questionSelected: any = {};

  answers: string[] = [];
  answersSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  results: any = '';

  constructor() { }

  ngOnInit(): void {
    if (questions) {
      this.finished = false;

      this.questions = questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }

  }
  selectAnswer(answer: string) {
    this.answers.push(answer);
    this.nextStep();

  }

  async nextStep() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
          if (this.results != 0){
      this.results = 0
    }
    } else {
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;
      this.results = finalAnswer
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.filter(answer => answer === 'a').length;
    const quizbox = window.document.getElementById('quizbox');
    const resultbox = window.document.getElementById('resultbox');
    const successbar = window.document.getElementById('successbar');
    const finalresult = window.document.getElementById('result');
    if (quizbox && quizbox.style) {
      quizbox.style.display = 'none';

    }
    if (resultbox && resultbox.style) {
      resultbox.style.display = 'flex';
    }
    const percentage = result / this.questionMaxIndex * 100

    if (successbar && successbar.style) {
      successbar.style.background= `linear-gradient(to right, green ${percentage }%,  red ${percentage -100}%)`;
      successbar.style.display = 'flex'
    }

    if (finalresult && finalresult.style) {
      finalresult.style.display = 'flex'
    }

    return percentage
  }

}
