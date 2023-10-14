import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  ticketsArray: any[] = [];
  status: string[]= ['To Do','In Progress','Done'];
  selectedProjectData!:any;


  constructor(private master:MasterService, private http:HttpClient){
    this.master.onProjectChange.subscribe((res:any)=>{
      //debugger;
      this.getProjectTickets(res.projectId);
      this.selectedProjectData = res;
    })
    this.master.onTicketCreate.subscribe((res:any)=>{
      //debugger;
      this.getProjectTickets(this.selectedProjectData.projectId);
    })
  }

  ngOnInit():void{}

    getProjectTickets(id:number){
    this.http.get(`https://freeapi.miniprojectideas.com/api/Jira/GetTicketsByProjectId?=${id}`)
    .subscribe((res:any)=>{
      this.ticketsArray = res.data;
    })
  }

    filterTicket(status:string){
    return this.ticketsArray.filter(m=>m.status == status);
  }


}





