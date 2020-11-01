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
}