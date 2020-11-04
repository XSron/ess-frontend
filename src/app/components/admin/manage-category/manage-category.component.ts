import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoryModel} from '../../../model/CategoryModel';
import {CategoryService} from '../../../services/categoryservice.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit, OnDestroy {

  public categoryList: CategoryModel[];
  public isLoading = true;

  private subscription: Subscription;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // Load category data
    this.categoryService.getAllCategory().subscribe((categories: CategoryModel[]) => {
      this.categoryList = categories;
      this.isLoading = false;
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
