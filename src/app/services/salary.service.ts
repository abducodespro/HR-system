import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Salary } from "../models/salary.model";

@Injectable({
    providedIn: 'root',
})

export class SalaryServices{

    private apiUrl = 'api/salaries';

    constructor(private http: HttpClient) {}

    getSalaries(): Observable<Salary[]>{
        return this.http.get<Salary[]>(this.apiUrl);
    }

    addSalary(salary: Salary): Observable<Salary>{
        return this.http.post<Salary>(this.apiUrl, salary);
    }

    updateSalary(salary: Salary): Observable<any>{
        return this.http.put(`${this.apiUrl}/${salary.id}`, salary);
    }

    deleteSalary(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
    
}