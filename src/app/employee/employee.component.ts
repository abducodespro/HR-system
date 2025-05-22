import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  formData: Employee = { id: 0, name: '', position: '', departmentId: 0, salary: 0 };
  displayedColumns: string[] = ['name', 'position', 'departmentId', 'salary', 'actions'];

  constructor(private empService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe(data => this.employees = data);
  }

  onSubmit() {
    if (this.formData.id === 0) {
      this.empService.addEmployee(this.formData).subscribe(() => this.loadEmployees());
    } else {
      this.empService.updateEmployee(this.formData).subscribe(() => this.loadEmployees());
    }
    this.resetForm();
  }

  edit(employee: Employee) {
    this.formData = { ...employee };
  }

  delete(id: number) {
    this.empService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  resetForm() {
    this.formData = { id: 0, name: '', position: '', departmentId: 0, salary: 0 };
  }
}