import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IssueService {

  url = 'http://localhost:4000';
  constructor(private http: HttpClient) { 

  }
  getIssues()
  {
    return this.http.get(`${this.url}/issues`);
  }
  getIssueById(id: any){
    return this.http.get(`${this.url}/issues/${id}`);
  }
  addIssue(title: any,responsible: any,description: any,severity: any)
  {
    const issue = {
      title: title,
      responsible : responsible,
      description: description,
      severity: severity

    };
    return this.http.post(`${this.url}/issues/add`,issue) 
  }
  updateIssue(id: any,title: any,responsible: any,description: 
    any,severity: any,status: any)
  {
    const issue = {
      title: title,
      responsible : responsible,
      description: description, 
      severity: severity,
      status: status,

    };
    return this.http.post(`${this.url}/issues/update/${id}`,issue) 
  }

  deleteIssue(id){
    return this.http.get(`${this.url}/issues/delete/${id}`);
  }

}
