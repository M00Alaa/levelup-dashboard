import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-exams-questions',
  templateUrl: './exams-questions.component.html',
  styleUrls: ['./exams-questions.component.scss']
})
export class ExamsQuestionsComponent {

  categories: any[] = []

  questions: any[] = []

  newQuestionData = {
    catecoryname: '',
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
    Quction: new FormControl(null, [Validators.required]),
    choice1: new FormControl(null, [Validators.required]),
    choice2: new FormControl(null, [Validators.required]),
    choice3: new FormControl(null, [Validators.required]),
    anseur: new FormControl(null, [Validators.required])
  })


  questionCategoryLevel: FormGroup = new FormGroup({
    category: new FormControl(null)
  })

  // success
  addQuestion() {

    console.log(this.questionData.value);

    this._CategoriesService.addExamQuestion(this.questionData.value).subscribe({
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

    this._CategoriesService.getAllExamQuestions(this.questionCategoryLevel.value.category).subscribe({
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
    this._CategoriesService.deleteExamQuestion(ID).subscribe({
      next: (res) => {
        alert('deleted successfully')

        console.log(res);
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
    this.questionData.controls['Quction'].setValue(data.E_Q)
    this.questionData.controls['choice1'].setValue(data.Exam_choice[0].multchoice)
    this.questionData.controls['choice2'].setValue(data.Exam_choice[1].multchoice)
    this.questionData.controls['choice3'].setValue(data.Exam_choice[2].multchoice)
    this.questionData.controls['anseur'].setValue(data.anseur)

    this.newQuestionId = data.E_ID
  }


  updateQuestion() {

    this.newQuestionData.catecoryname = this.questionData.value.catecoryname
    this.newQuestionData.Quction = this.questionData.value.Quction
    this.newQuestionData.choice1 = this.questionData.value.choice1
    this.newQuestionData.choice2 = this.questionData.value.choice2
    this.newQuestionData.choice3 = this.questionData.value.choice3
    this.newQuestionData.anseur = this.questionData.value.anseur


    this._CategoriesService.updateExamQuestion(this.newQuestionId, this.newQuestionData).subscribe({
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
