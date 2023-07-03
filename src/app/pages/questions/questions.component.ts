import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {


  categories: any[] = []

  questions: any[] = []

  newQuestionData = {
    catecoryname: '',
    levelname: '',
    Quction: '',
    choice1: '',
    choice2: '',
    choice3: '',
    anseur: ''
  }

  newQuestionId: any;

  showAdd!: boolean;
  showUpdate!: boolean;



  questionData: FormGroup = new FormGroup({
    catecoryname: new FormControl(null, [Validators.required]),
    levelname: new FormControl(null, [Validators.required]),
    Quction: new FormControl(null, [Validators.required]),
    choice1: new FormControl(null, [Validators.required]),
    choice2: new FormControl(null, [Validators.required]),
    choice3: new FormControl(null, [Validators.required]),
    anseur: new FormControl(null, [Validators.required])
  })


  questionCategoryLevel: FormGroup = new FormGroup({
    category: new FormControl(null),
    level: new FormControl(null)
  })

  // success
  addQuestion() {

    console.log(this.questionData.value);

    this._CategoriesService.addQuestion(this.questionData.value).subscribe({
      next: (res) => {
        console.log(res);

        this.questionData.reset()
        this.getAllQuestions()
      }
    })
  }

  // success
  getAllQuestions() {

    console.log(this.questionCategoryLevel.value);

    this._CategoriesService.getAllQuestions(this.questionCategoryLevel.value.category, this.questionCategoryLevel.value.level).subscribe({
      next: (res) => {
        this.questions = res.data;

        console.log(this.questions);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteQuestion(ID: number) {
    this._CategoriesService.deleteQuestion(ID).subscribe({
      next: (res) => {
        alert('deleted successfully')

        this.getAllQuestions();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getQuestionInfo(data: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.questionData.controls['catecoryname'].setValue(this.questionCategoryLevel.value.category)
    this.questionData.controls['levelname'].setValue(this.questionCategoryLevel.value.level)
    this.questionData.controls['Quction'].setValue(data.L_Q)
    this.questionData.controls['choice1'].setValue(data.Q_choice[0].multchoice)
    this.questionData.controls['choice2'].setValue(data.Q_choice[1].multchoice)
    this.questionData.controls['choice3'].setValue(data.Q_choice[2].multchoice)
    this.questionData.controls['anseur'].setValue(data.anseur)

    this.newQuestionId = data.Q_ID
  }


  updateQuestion() {

    this.newQuestionData.catecoryname = this.questionData.value.catecoryname
    this.newQuestionData.levelname = this.questionData.value.levelname
    this.newQuestionData.Quction = this.questionData.value.Quction
    this.newQuestionData.choice1 = this.questionData.value.choice1
    this.newQuestionData.choice2 = this.questionData.value.choice2
    this.newQuestionData.choice3 = this.questionData.value.choice3
    this.newQuestionData.anseur = this.questionData.value.book


    this._CategoriesService.updateQuestion(this.newQuestionId, this.newQuestionData).subscribe({
      next: (res) => {
        console.log(res);

        alert('updated successfully')
        this.questionData.reset()
        this.getAllQuestions()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  clickAddQuestion() {
    this.questionData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  constructor(
    private _AuthService: AuthService, private _Router: Router, private _CategoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
