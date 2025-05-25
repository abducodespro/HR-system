import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../services/department.service';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  companys: Company[] = []
  formData: Department = { id: 0, name: '', companyId: null }
  displayedColumns: string[] = ['id', 'name', 'company', 'actions']

  constructor(private dptService: DepartmentService, private cmpService: CompanyService) { }

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment() {
    this.dptService.getDepartments().subscribe(data => this.departments = data);
    this.cmpService.getCompanies().subscribe(data => this.companys = data)
  }

  getCompanyName(id: number){
    const cmp = this.companys.find(c => c.id === id);
    return cmp? cmp.name: 'unknown';
  }

  onSubmit() {
    if (this.formData.id === 0) {
      const maxId = this.departments.length ? Math.max(...this.departments.map(d => d.id)) : 0;
      this.formData.id = maxId + 1;
      this.dptService.addDepartment(this.formData).subscribe(() => this.loadDepartment())
    } else {
      this.dptService.updateDepartment(this.formData).subscribe(() => this.loadDepartment())
    }

    this.resetForm()
  }

  edit(department: Department) {
    this.formData = { ...department }
  }

  delete(id: number) {
    this.dptService.deleteDepartment(id).subscribe(() => this.loadDepartment())
  }

  resetForm() {
    this.formData = { id: 0, name: '', companyId: null }
  }

}
