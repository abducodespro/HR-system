import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CandidateComponent } from './candidate/candidate.component';
import { DepartmentComponent } from './department/department.component';
import { SalaryComponent } from './salary/salary.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
  {path:'', component: EmployeeComponent},
  {path:'candidate', component: CandidateComponent},
  {path:'department', component: DepartmentComponent},
  {path:'salary', component: SalaryComponent},
  {path:'company', component: CompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
