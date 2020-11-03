import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoint';
import { CategoryModel } from '../model/CategoryModel';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) {}

  public getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(Endpoint.CATEGORY_ENDPOINT.GET_ALL_CATEGORY);
  }

  public addNewCategory(category: CategoryModel): Observable<any> {
    return this.http.post(Endpoint.CATEGORY_ENDPOINT.ADD_NEW_CATEGORY, category);
  }

  public editCategoryById(id: number, category: CategoryModel): Observable<any> {
    return this.http.put(Endpoint.CATEGORY_ENDPOINT.EDIT_CATEGORY + `/${id}`, category);
  }

  public deleteCategoryById(id: number): Observable<any> {
    return this.http.delete(Endpoint.CATEGORY_ENDPOINT.DELETE_CATEGORY + `/${id}`);
  }

}
