import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Department } from "../models/department.model";

@Injectable({
    providedIn: 'root',
})

export class DepartmentService{
  private apiUrl = 'api/departments';

  constructor(private http:HttpClient) {}

  getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.apiUrl);
  }

  addDepartment(department: Department): Observable<Department>{
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(department: Department): Observable<any>{
    return this.http.put(`${this.apiUrl}/${department.id}`,department)
  }

  deleteDepartment(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}