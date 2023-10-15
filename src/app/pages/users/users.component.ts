import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {
  userObj:any={
    "userId": 0,
    "emailId": "string",
    "fullName": "string",
    "password": "string"
  }

  userList:any=[];
  
  deleteUserObj: any={
    "userId": 0,
    "emailId": "string",
    "fullName": "string",
    "password": "string"
  }


  constructor(private http:HttpClient){}
  //@ViewChild('DeleteUserModal') DeleteUserModal!: ElementRef;
 
  ngOnInit():void{
    this.getAllUsers();
  }

  getAllUsers(){
    this.http.get("https://freeapi.miniprojectideas.com/api/Jira/GetAllUsers")
    .subscribe((res:any)=>{
      this.userList = res.data;
    })
    return this.userList;
  }

 
  onSave(action:string){
    const url = `https://freeapi.miniprojectideas.com/api/Jira/${action}User`;
    if(action == 'Create'){
      this.http.post(url, this.userObj).subscribe((res:any)=>{
        this.subscriptionHandeling(res);
      });
    }
    else{
      this.http.put(url, this.userObj).subscribe((res:any)=>{
        this.subscriptionHandeling(res);
      });
    }
    this.userObj= {};
  }
  closeModal(){
    this.userObj = {};
  }

  subscriptionHandeling(res:any){
    if(res.result){
      alert(res.message);
      this.getAllUsers();
    }
    else{
      alert(res.message);
    }
  }

 
  ConfirmModal(user:any, action:string){
    if(action == 'delete'){
      this.deleteUserObj = user;
    }
    if(action == 'edit'){
      this.userObj = user;
    }
  }

  DeleteUser(userIdToDelete:any) {
    this.http.delete(`https://freeapi.miniprojectideas.com/api/Jira/DeleteUserById?id=${userIdToDelete}`)
    .subscribe(
      (res:any) => this.subscriptionHandeling(res)
    );
    this.deleteUserObj = {};
  }

}
