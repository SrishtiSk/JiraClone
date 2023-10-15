import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  
  projectList:any[]=[];
  projectObj:any = {
    "projectId": 0,
    "projectName": "",
    "shortName": "",
    "createdDate": new Date()
  }
  projectToDelete:any;
  projectToDeleteName:any;
  editProject:any;

  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.getAllProjects();
  }

  getAllProjects(){
    this.http.get("https://freeapi.miniprojectideas.com/api/Jira/GetAllProjects")
    .subscribe((res:any)=>{
      this.projectList = res.data;
    })
    return this.projectList;
  }

 
  onSave(){
    this.http.post('https://freeapi.miniprojectideas.com/api/Jira/CreateProject', this.projectObj)
    .subscribe((res:any)=>{
      if(res.result){
        alert(res.message);
        this.getAllProjects();
      }
      else{
        alert(res.message);
      }
    })
  }

  ConfirmDeleteProject(projectId:number){
    this.projectToDelete = this.getAllProjects().find((p:any)=> p.projectId == projectId);
  }

  deleteProject(projectIdToDelete:any){
    this.http.delete(`https://freeapi.miniprojectideas.com/api/Jira/DeleteProjectById?id=${projectIdToDelete}`)
    .subscribe((res:any)=> {
      if(res){
        alert(res.message);
      }
      this.getAllProjects();
    },
    (error) => {
      // Handle errors, display an error message, etc.
      console.error('Error deleting user', error);
    }
    );
  }

  ConfirmEditProject(projectId:number){
    this.editProject= this.getAllProjects().find((p:any)=> p.projectId == projectId);
    this.projectToDeleteName = this.projectToDelete.fullName;
  }

}
