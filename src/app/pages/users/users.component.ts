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
  
  userToDelete: any;
  userToDeleteName:any;

  constructor(private http:HttpClient){}
  @ViewChild('DeleteUserModal') DeleteUserModal!: ElementRef;


 

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

 
  onSave(){
    this.http.post('https://freeapi.miniprojectideas.com/api/Jira/CreateUser', this.userObj)
    .subscribe((res:any)=>{
      if(res.result){
        alert(res.message);
        this.getAllUsers();
      }
      else{
        alert(res.message);
      }
    })
  }


  ConfirmDeleteModal(userId: number) {
   // this.isModalVisible=true;
    this.userToDelete= this.getAllUsers().find((u:any)=>u.userId==userId);
    this.userToDeleteName=this.userToDelete.fullName;
  }

  deleteUser(userIdToDelete:any) {
    this.http.delete(`https://freeapi.miniprojectideas.com/api/Jira/DeleteUserById?id=${userIdToDelete}`)
    .subscribe(
      (res:any) => {
        if(res){
          alert(res.message);
        }
        this.getAllUsers();
      },
      (error) => {
        // Handle errors, display an error message, etc.
        console.error('Error deleting user', error);
      }
    );
  }

}
