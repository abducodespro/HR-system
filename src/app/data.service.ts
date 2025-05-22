import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class DataService implements InMemoryDbService{
    createDb(){
        const employees = [
            { id: 1, name: 'abb', position: 'developer', departmentId: 1, salary: 2000},
            { id: 2, name: 'abb', position: 'developer', departmentId: 1, salary: 2000}
        ];

        const candidates = [
            {id: 1, name: 'jhon', email: 'jhon@gmail.com', phone: 918181818, appliedPosition: 'disigner'},
            {id: 2, name: 'jhon', email: 'jhon@gmail.com', phone: 918181818, appliedPosition: 'disigner'},
        ];

        const departments = [
            {id: 1, name: 'Software Engineer'},
            {id: 2, name: 'Computer Science'},
            {id: 3, name: 'Accounting'},
            {id: 4, name: 'Management'}
        ]

        return{ employees, candidates, departments }
    }
}