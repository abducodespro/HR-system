import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class DataService implements InMemoryDbService{
    createDb(){
        const employees = [
            { id: 1, name: 'getu', position: 'developer', departmentId: 1, phone: 9181818181, salary: 25000},
            { id: 2, name: 'abebe', position: 'designer', departmentId: 2, phone: 9181818181, salary: 11000},
            { id: 3, name: 'mike', position: 'developer', departmentId: 2, phone: 9181818181, salary: 20000}
        ];

        const candidates = [
            {id: 1, name: 'jhon', email: 'jhon@gmail.com', phone: 918181818, position: 'developer', departmentId: 1, salary: 20000},
            {id: 2, name: 'Abel', email: 'abel@gmail.com', phone: 918181818, position: 'Designer', departmentId: 2, salary: 14000},
            {id: 3, name: 'Ermias', email: 'abel@gmail.com', phone: 918181818, position: 'accountant', departmentId: 3, salary: 14000},
        ];

        const departments = [
            {id: 1, name: 'Software Engineer', companyId: 1},
            {id: 2, name: 'Computer Science', companyId: 1},
            {id: 3, name: 'Accounting', companyId: 1},
            {id: 4, name: 'Management', companyId: 1}
        ];

        const companies = [
            {id: 1, name: 'xyz', location: 'addis ababa'},
            {id: 2, name: 'XOKA', location: 'addis ababa'},
            {id: 3, name: 'Kuraz', location: 'addis ababa'}
        ]
        
        return{ employees, candidates, departments, companies }
    }
}