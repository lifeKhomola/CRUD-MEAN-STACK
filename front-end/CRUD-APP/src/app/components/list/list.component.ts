import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/services/issue.service';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Issue } from 'src/app/issue.model';
import { observable } from 'rxjs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title','responsible','severity','status','actions'];

  constructor(private issueService: IssueService,
    private router:Router) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
    .getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Data requested ... ');
      console.log(this.issues);
    });
  }


  editIssue(id){
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id)
  {
   this.issueService.deleteIssue(id).subscribe(()=>{
    this.fetchIssues();
   });
  }
}
