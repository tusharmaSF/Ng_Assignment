import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../actions/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  roles = ['Admin','SuperAdmin','Manager','Subscriber','Developer'];
  user_obj: UserModel = new UserModel();
  users : any;
  addbtn! :boolean;
  updatebtn! : boolean;
  formValue !: FormGroup;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService<any, any>) {   }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      eMail: [''],
      _Role: [''],
      phoneNo: [''],
      addRess: [''],
      doe: this.user_obj.doe
    })
    this.getUsers();
  }

  load(){
    document.getElementById("loadbtn")!.innerText = "Refresh Data";
    document.getElementById("table")!.style.visibility = "visible";
  }

  clicked(){
    this.formValue.reset();
    this.addbtn = true;
    this.updatebtn = false;
  }

  postUserDeets(){
    let user_obj: UserModel = new UserModel();
    user_obj.firstName = this.formValue.value.firstName;
    user_obj.middleName = this.formValue.value.middleName;
    user_obj.lastName = this.formValue.value.lastName;
    user_obj.eMail = this.formValue.value.eMail;
    user_obj.phoneNo = this.formValue.value.phoneNo;
    user_obj._Role = this.formValue.value._Role;
    user_obj.addRess = this.formValue.value.addRess;
    this.formValue.value.doe = user_obj.doe;
    
    this.api.postUser(this.formValue.value)
    .subscribe(res=>{
      
      alert("Success");
      let cancel = document.getElementById('cancel');
      cancel!.click();
      this.formValue.reset();
      this.getUsers();
    },
    err=>{
      alert('Failed');
    })
  };

  getUsers(){
    this.api.getUser()
    .subscribe(res=>{
        this.users = res;
    })
  }

  deleteUser(row: any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("Deleted");
      this.getUsers();
    })
  }

  onEdit(row: any){
    this.addbtn = false;
    this.updatebtn = true;
    this.user_obj.id = row.id;
    
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['middleName'].setValue(row.middleName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['eMail'].setValue(row.eMail);
    this.formValue.controls['phoneNo'].setValue(row.phoneNo);
    this.formValue.controls['_Role'].setValue(row._Role);
    this.formValue.controls['addRess'].setValue(row.addRess);
    this.formValue.controls['doe'].setValue(row.doe);
  }

  updateUserDeets(){
    console.log(this.user_obj);
    this.api.updateUser(this.formValue.value, this.user_obj.id)
    .subscribe(res=>{
      console.log(res);
      alert("updated");
      let cancel = document.getElementById('cancel');
      cancel!.click();
      this.formValue.reset();
      this.getUsers();
    })
  }
}
