import { Component, OnInit } from '@angular/core';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  formData: Department = {id:0 , name: ''}
  displayedColumns: string[] = ['id', 'name', 'actions']

  constructor(private dptService: DepartmentService) { }

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment(){
    this.dptService.getDepartments().subscribe(data => this.departments = data);
  }

  onSubmit(){
    if(this.formData.id === 0){
      this.dptService.addDepartment(this.formData).subscribe(()=> this.loadDepartment())
    }else{
      this.dptService.updateDepartment(this.formData).subscribe(() => this.loadDepartment())
    }

    this.resetForm()
  }

  edit(department: Department){
    this.formData = {...department}
  }

  delete(id: number){
    this.dptService.deleteDepartment(id).subscribe(()=> this.loadDepartment())
  }

  resetForm(){
    this.formData = {id: 0, name: ''}
  }

}
