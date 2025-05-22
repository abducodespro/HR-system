import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  candidates: Candidate[] = []
  formData: Candidate = { id: 0, name: '', email: '', phone: null, appliedPosition: '' }
  displayedColumns: string[] = ['name', 'email', 'phone', 'appliedPosition', 'actions']

  constructor(private candService: CandidateService) { }

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candService.getCandidates().subscribe(data => this.candidates = data)
  }

  onSubmit() {
    if (this.formData.id === 0) {
      this.candService.addCandidate(this.formData).subscribe(() => this.loadCandidates());
    } else {
      this.candService.updateCandidate(this.formData).subscribe(() => this.loadCandidates());
    }
    this.resetForm();
  }

  edit(candidate: Candidate) {
    this.formData = { ...candidate };
  }

  delete(id: number) {
    this.candService.deleteCandidate(id).subscribe(() => this.loadCandidates());
  }

  resetForm() {
    this.formData = { id: 0, name: '', email: '', phone: 0, appliedPosition: '' };
  }

}
