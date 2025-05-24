import { Component, OnInit } from '@angular/core';
import { Salary } from '../models/salary.model';
import { SalaryServices } from '../services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  salaries: Salary[] = [];
  formData: Salary = {id: 0, employee: '', amount: 0, date: ''};
  displayedColumns: string[] = ['employee', 'amount', 'date', 'actions']

  constructor(private salaryService: SalaryServices) { }

  ngOnInit() {
    this.loadSalary()
  }

  loadSalary(){
    this.salaryService.getSalaries().subscribe(data => this.salaries = data)
  }

  onSubmit(){
    if(this.formData.id === 0){
      this.salaryService.addSalary(this.formData).subscribe(()=> this.loadSalary())
    }else{
      this.salaryService.updateSalary(this.formData).subscribe(()=> this.loadSalary())
    }
    this.setForm()
  }

  edit(salary: Salary){
    this.formData = {...salary}
  }

  delete(id: number){
    this.salaryService.deleteSalary(id).subscribe(()=> this.loadSalary())
  }

  setForm(){
    this.formData = {id: 0, employee: '', amount: 0, date: ''}
  }

}
