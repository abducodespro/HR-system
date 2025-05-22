import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Candidate } from "../models/candidate.model";

@Injectable({
    providedIn: 'root',
})

export class CandidateService {
    private apiUrl = 'api/candidates';

    constructor(private http: HttpClient) { }

    getCandidates(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.apiUrl);
    }

    addCandidate(employee: Candidate): Observable<Candidate> {
        return this.http.post<Candidate>(this.apiUrl, employee);
    }

    updateCandidate(employee: Candidate): Observable<any> {
        return this.http.put(`${this.apiUrl}/${employee.id}`, employee);
    }

    deleteCandidate(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}