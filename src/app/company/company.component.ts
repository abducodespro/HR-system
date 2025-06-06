import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  formData: Company = { id: 0, name: '', location: '' };
  displayedColumns: string[] = ['id', 'name', 'location', 'actions'];

  constructor(private comService: CompanyService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadCompany();
  }

  loadCompany() {
    this.comService.getCompanies().subscribe(data => this.companies = data);
  }

  onSubmit() {
    if (this.formData.id === 0) {
      const maxId = this.companies.length ? Math.max(...this.companies.map(d => d.id)) : 0;
      this.formData.id = maxId + 1;
      this.comService.addCompanies(this.formData).subscribe(() => this.loadCompany())
    } else {
      this.comService.updateCompany(this.formData).subscribe(() => this.loadCompany())
    }

    this.resetForm()
  }

  edit(company: Company) {
    this.formData = { ...company }
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comService.deleteCompany(id).subscribe(() => this.loadCompany())
      }
    })
  }

  resetForm() {
    this.formData = { id: 0, name: '', location: '' }
  }

}
