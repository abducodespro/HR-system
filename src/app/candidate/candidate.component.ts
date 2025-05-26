import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from '../services/candidate.service';
import { Department } from '../models/department.model';
import { DepartmentService } from '../services/department.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
})

export class CandidateComponent implements OnInit {
  candidates: Candidate[] = [];
  employees: Employee[] = [];
  dpts: Department[] = [];
  formData: Candidate = { id: 0, name: '', email: '', phone: null, position: '', departmentId: 0, salary: null }
  displayedColumns: string[] = ['name', 'email', 'phone', 'position', 'department', 'salary', 'actions']

  constructor(private candService: CandidateService, private dptService: DepartmentService,
    private emplService: EmployeeService, private snackbar: MatSnackBar, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadCandidates();
    this.dptService.getDepartments().subscribe(data => this.dpts = data);
    this.emplService.getEmployees().subscribe(data => this.employees = data)
  }

  loadCandidates() {
    this.candService.getCandidates().subscribe(data => this.candidates = data)
  }

  getDepartmentName(id: number): string {
    const dept = this.dpts.find(d => d.id === id)
    return dept ? dept.name : 'Unknown';
  }

  onSubmit() {
    if (this.formData.id === 0) {
      this.candService.addCandidate(this.formData).subscribe(() => this.loadCandidates());
      alert('candidate added successfully')
    } else {
      this.candService.updateCandidate(this.formData).subscribe(() => this.loadCandidates());
    }
    this.resetForm();
  }

  hire(id: number) {
    const maxId = this.employees.length ? Math.max(...this.employees.map(d => d.id)) : 0;
    const empId = maxId + 1;

    const candidate = this.candidates.find(d => d.id === id);
    if (!candidate) {
      console.error('Candidate not found');
      return;
    }

    const newEmployee: Employee = {
      id: empId,
      name: candidate.name,
      position: candidate.position,
      departmentId: candidate.departmentId,
      phone: candidate.phone,
      salary: candidate.salary,
    };

    this.emplService.addEmployee(newEmployee).subscribe(() => {
      this.snackbar.open('Candidate hired successfuly!!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.candService.deleteCandidate(candidate.id).subscribe(() => this.loadCandidates());
    });
  }


  edit(candidate: Candidate) {
    this.formData = { ...candidate };
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.candService.deleteCandidate(id).subscribe(() => this.loadCandidates());
      }
    })
  }

  resetForm() {
    this.formData = { id: 0, name: '', email: '', phone: 0, position: '', departmentId: 0, salary: 0 };
  }

}
