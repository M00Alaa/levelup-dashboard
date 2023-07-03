import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  categories: any[] = []

  books: any[] = []

  newBookData = {
    catecoryname: '',
    levelname: '',
    book: ''
  }

  newBookId: any;

  showAdd!: boolean;
  showUpdate!: boolean;



  bookData: FormGroup = new FormGroup({
    catecoryname: new FormControl(null, [Validators.required]),
    levelname: new FormControl(null, [Validators.required]),
    book: new FormControl(null, [Validators.required])
  })


  bookCategoryLevel: FormGroup = new FormGroup({
    category: new FormControl(null),
    level: new FormControl(null)
  })

  // success
  addBook() {

    console.log(this.bookData.value);

    this._CategoriesService.addBook(this.bookData.value).subscribe({
      next: (res) => {
        console.log(res);

        this.bookData.reset()
        this.getAllBooks()
      }
    })
  }

  // success
  getAllBooks() {

    console.log(this.bookCategoryLevel.value);

    this._CategoriesService.getAllBooks(this.bookCategoryLevel.value.category, this.bookCategoryLevel.value.level).subscribe({
      next: (res) => {
        this.books = res.data;

        console.log(this.books);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteBook(ID: number) {
    this._CategoriesService.deleteBook(ID).subscribe({
      next: (res) => {
        alert('deleted successfully')

        this.getAllBooks();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getBookInfo(data: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.bookData.controls['catecoryname'].setValue(this.bookCategoryLevel.value.category)
    this.bookData.controls['levelname'].setValue(this.bookCategoryLevel.value.level)
    this.bookData.controls['book'].setValue(data.book)

    this.newBookId = data.R_ID
  }


  updateBook() {

    this.newBookData.catecoryname = this.bookData.value.catecoryname
    this.newBookData.levelname = this.bookData.value.levelname
    this.newBookData.book = this.bookData.value.book


    this._CategoriesService.updateBook(this.newBookId, this.newBookData).subscribe({
      next: (res) => {
        console.log(res);

        alert('updated successfully')
        this.bookData.reset()
        this.getAllBooks()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  clickAddBook() {
    this.bookData.reset();
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
        console.log('getAllCategories' + err);
      }
    })
  }

}
