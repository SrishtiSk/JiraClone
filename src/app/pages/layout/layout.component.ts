import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  projectList:any[]=[];
  userList:any[]=[];
  issueTypes:string[]=['Ticket', 'Task', 'Epic', 'Bug'];
  statusTypes:string[]=['To Do', 'In Progress', 'Done'];

  ticketObj:any={
    "ticketId": 0,
    "createdDate": new Date(),
    "summary": "",
    "status": "",
    "description": "",
    "parentId": 0,
    "storyPoint": 0,
    "ticketGuid": "",
    "assignedTo": 0,
    "createdBy": 0,
    "projectId": 0
  }

  

  constructor(private http:HttpClient, private master:MasterService){
    const loginData = localStorage.getItem('jiraLoginDetails');
    if(loginData!=null){
      const parseData = JSON.parse(loginData);
      this.ticketObj.createdBy = parseData.userId;
    }
  }

  ngOnInit():void{
    this.getAllProjects();
    this.getAllUsers();
  }

  getAllProjects(){
    this.http.get("https://freeapi.miniprojectideas.com/api/Jira/GetAllProjects")
    .subscribe((res:any)=>{
      this.projectList = res.data;
      this.master.onProjectChange.next(this.projectList[0])
    })
  }

  getAllUsers(){
    this.http.get("https://freeapi.miniprojectideas.com/api/Jira/GetAllUsers")
    .subscribe((res:any)=>{
      this.userList = res.data;
    })
    return this.userList;
  }

  CreateTicket(){
    this.http.post("https://freeapi.miniprojectideas.com/api/Jira/CreateTicket", this.ticketObj)
    .subscribe((res:any)=>{
      if(res){
        alert(res.message);
        this.master.onTicketCreate.next(true);
      }
      else{
        alert(res.message);
      }
    });
  }

  setProject(obj:any){
    this.master.onProjectChange.next(obj);
  }
}
