import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {

  kTicketsArray:any = [
    {
      ticketId: "Tckt001",
      ticketName: "Task 1",
      status: "To Do"
  },
  {
      ticketId: "Tckt002",
      ticketName: "Task 2",
      status: "In Progress"
  },
  {
      ticketId: "Tckt003",
      ticketName: "Task 3",
      status: "Done"
  },
  {
      ticketId: "Tckt004",
      ticketName: "Task 4",
      status: "To Do"
  },
  {
      ticketId: "Tckt005",
      ticketName: "Task 5",
      status: "In Progress"
  },
  {
      ticketId: "Tckt006",
      ticketName: "Task 6",
      status: "Done"
  },
  {
      ticketId: "Tckt007",
      ticketName: "Task 7",
      status: "To Do"
  },
  {
      ticketId: "Tckt008",
      ticketName: "Task 8",
      status: "In Progress"
  },
  {
      ticketId: "Tckt009",
      ticketName: "Task 9",
      status: "Done"
  },
  {
      ticketId: "Tckt010",
      ticketName: "Task 10",
      status: "To Do"
  },
  {
      ticketId: "Tckt011",
      ticketName: "Task 11",
      status: "In Progress"
  },
  {
      ticketId: "Tckt012",
      ticketName: "Task 12",
      status: "Done"
  }
  ];
  currentItem:any;

  filterTickets(status:string){
    return this.kTicketsArray.filter((item:any) => item.status === status);
  }

  onDragStart(item: any){
    console.log("drag start");
    this.currentItem = item;
    
  }

  onDragOver(event:any){
    //console.log('dragOver');
    event.preventDefault();
  }

  onDrop(event:any, status:string){
    console.log('drop');
    event.preventDefault();
    const record =this.kTicketsArray.find((x:any)=>x.ticketId == this.currentItem.ticketId);
    if(record!=undefined){
      record.status = status;
    }
    this.currentItem = null;
  }

}
