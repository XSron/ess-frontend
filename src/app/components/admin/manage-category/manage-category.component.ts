import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoryModel} from '../../../model/CategoryModel';
import {CategoryService} from '../../../services/categoryservice.service';
import {CategoryModalService} from './category-modal/category-modal.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})

export class ManageCategoryComponent implements OnInit, OnDestroy {

  public categoryList: CategoryModel[];
  public selectedCategory: CategoryModel;
  public isLoading = true;
  public form: FormGroup;
  public submitted = false;

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private modalService: CategoryModalService
  ) { }

  ngOnInit(): void {

    // Form setup
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.loadNewCategoryData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  submitAction(id: string): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.selectedCategory) {
      // Edit Category Mode
      this.selectedCategory.categoryName = this.form.value.name;
      this.categoryService.addNewCategory(this.selectedCategory).subscribe(result => {
        this.closeModal(id);
        this.loadNewCategoryData();
      }, error => {
        alert(JSON.stringify(error));
      });
    } else {
      // Add New Category Mode
      const newCategory = {
        categoryName: this.form.value.name
      } as CategoryModel;
      this.categoryService.addNewCategory(newCategory).subscribe(result => {
        this.closeModal(id);
        this.loadNewCategoryData();
      }, error => {
        alert(JSON.stringify(error));
      });
    }
  }

  // MARK: - Delete Category

  openDeleteModal(id: string, category: CategoryModel): void {
    this.selectedCategory = category;
    this.modalService.open(id);
  }

  // MARK: - Helper functions

  openModal(id: string, category: CategoryModel): void {
    this.selectedCategory = category;
    if (this.selectedCategory) {
      this.form.value.name = this.selectedCategory.categoryName;
    }
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.selectedCategory = null;
    this.modalService.close(id);
  }

  loadNewCategoryData(): void {
    // Load category data
    this.categoryService.getAllCategory().subscribe((categories: CategoryModel[]) => {
      this.categoryList = categories;
      this.isLoading = false;
    }, error => {
      alert(JSON.stringify(error));
    });
  }

}
