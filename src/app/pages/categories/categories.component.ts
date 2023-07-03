import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = []

  newCategoryData = {
    newcategoryname: '',
    newcategorytype: ''
  }

  newCategoryId: any;

  showAdd!: boolean;
  showUpdate!: boolean;



  categoryData: FormGroup = new FormGroup({
    categoryname: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  })

  addCategory(data: FormGroup) {

    console.log(data.value);

    this._CategoriesService.addCategory(data.value).subscribe({
      next: (res) => {
        console.log(res);

        this.categoryData.reset()
        this.getAllCategories()
      }
    })
  }



  /** get all categories */

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

  deleteCategory(ID: number) {
    this._CategoriesService.deleteCategory(ID).subscribe({
      next: (res) => {
        alert('deleted successfully')

        this.getAllCategories();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategoryInfo(data: any) {
    this.showAdd = false;
    this.showUpdate = true;

    this.categoryData.controls['categoryname'].setValue(data.Name)
    this.categoryData.controls['type'].setValue(data.type)

    this.newCategoryId = data.ID
  }


  updateCategory() {

    this.newCategoryData.newcategoryname = this.categoryData.value.categoryname
    this.newCategoryData.newcategorytype = this.categoryData.value.type

    this._CategoriesService.updateCategory(this.newCategoryId, this.newCategoryData).subscribe({
      next: (res) => {
        console.log(res);

        alert('updated successfully')
        this.categoryData.reset()
        this.getAllCategories()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  clickAddCategory() {
    this.categoryData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  constructor(
    private _AuthService: AuthService, private _Router: Router, private _CategoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

}
