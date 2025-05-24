import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  dpts: Department[] = []
  formData: Employee = { id: 0, name: '', position: '', departmentId: 0, phone: null, salary: null };
  displayedColumns: string[] = ['name', 'position', 'departmentId', 'phone', 'salary', 'actions'];

  constructor(private empService: EmployeeService, private dptService: DepartmentService) { }

  ngOnInit() {
    this.loadEmployees();
    this.dptService.getDepartments().subscribe(data => this.dpts = data)
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe(data => this.employees = data);
  }

  getDepartmentName(id: number): string {
    const dept = this.dpts.find(d => d.id === id);
    return dept ? dept.name : 'Unknown';
  }

  onSubmit() {
    if (this.formData.id === 0) {
      const maxId = this.employees.length ? Math.max(...this.employees.map(d => d.id)): 0;
      this.formData.id = maxId + 1;
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
    this.formData = { id: 0, name: '', position: '', departmentId: 0, phone: null, salary: null };
  }
}