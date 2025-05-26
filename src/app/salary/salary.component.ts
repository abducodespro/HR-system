import { Component, OnInit } from '@angular/core';
import { Salary } from '../models/salary.model';
import { SalaryServices } from '../services/salary.service';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  employees: Employee[] = [];
  formData: Employee = {id: 0, name: '', salary: null, position: '', departmentId: null, phone: null};
  displayedColumns: string[] = ['name', 'salary', 'actions']

  constructor(private empService: EmployeeService) { }

  isEditing = false;

  ngOnInit() {
    this.loadSalary()
  }

  loadSalary(){
    this.empService.getEmployees().subscribe(d => this.employees = d);
  }

  onSubmit(){
    if (!this.isEditing) return;
      this.empService.updateEmployee(this.formData).subscribe(()=> this.loadSalary())
    
    this.setForm()
  }

  edit(employee: Employee){
    this.formData = {...employee}
    this.isEditing = true
  }

  setForm(){
    this.formData = {id: 0, name: '', salary: null, position: '', departmentId: null, phone: null}
    this.isEditing= false
  }

}
