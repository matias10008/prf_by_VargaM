import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';
import { AdminService } from '../utils/admin.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tyres: any[] = [];
  users: any[] = [];
  orders: any[] = [];

  originalValues: any = {};
  currentTyre: any = {};
  originalTyreValues: any = {};

  newtyreName : string;
  newtyreType : string;
  newtyreWidth : number;
  newtyreHeight : number;
  newtyreDiameter : string;
  newtyrePrice : string;

  updatetyreName : string;
  updatetyreType : string;
  updatetyreWidth : number;
  updatetyreHeight : number;
  updatetyreDiameter : string;
  updatetyrePrice : string;


  tyreName : string;
  tyreType : string;
  tyreWidth : number;
  tyreHeight : number;
  tyreDiameter : string;
  tyrePrice : string;


  constructor(private connectionService: ConnectionService, private router: Router, private adminService : AdminService ){
    this.newtyreName = '';
    this.newtyreType = '',
    this.newtyreWidth = 0;
    this.newtyreHeight = 0;
    this.newtyreDiameter = '';
    this.newtyrePrice = '';

    this.tyreName = '';
    this.tyreType = '',
    this.tyreWidth = 0;
    this.tyreHeight = 0;
    this.tyreDiameter = '';
    this.tyrePrice = '';

    this.updatetyreName = '';
    this.updatetyreType = '',
    this.updatetyreWidth = 0;
    this.updatetyreHeight = 0;
    this.updatetyreDiameter = '';
    this.updatetyrePrice = '';
  }

  addTyre(){
    if(this.newtyreName != '', this.newtyreType!='', this.newtyreWidth != 0, this.newtyreHeight !=0, this.newtyreDiameter !='', this.newtyrePrice !=''){
      this.adminService.addTyre(this.newtyreName, this.newtyreType, this.newtyreWidth,this.newtyreHeight,this.newtyreDiameter,this.newtyrePrice).subscribe(msg => {
        this.router.navigate(['/admin']);
        this.ngOnInit();
      });
    }
  }

  deleteTyre(tyreName :string, tyrePrice : string){
    if(tyreName !='' && tyrePrice !=''){
      this.adminService.deleteTyre(tyreName, tyrePrice).subscribe(msg => {
        this.router.navigate(['/admin']);
        this.ngOnInit();
      });
    }
  }

  deleteUser(username : string, email : string){
    if(username !='' && email !=''){
      this.adminService.deleteUser(username, email).subscribe(msg => {
        this.ngOnInit();
        this.router.navigate(['/admin']);
      });
    }
  }

  getTyreNameById(tyreId: string): string {
    const tyre = this.tyres.find(t => t._id === tyreId);
    return tyre ? tyre.name : '';
  }


  //updateTyre(newName: string, newType: string, newWidth: string, newHeight: string, newDiameter: string, newPrice: string) {
  updateTyre(currentTyreName : string, currentTyretype : string,currentTyrewidth : number,
  currentTyreheight:number,currentTyrediameter:string,currentTyreprice :string ){
    var tyreName = "";
    var tyreType = "";
    var tyreWidth = 0;
    var tyreHeight = 0;
    var tyreDiameter = "";
    var tyrePrice = "";
    if(this.updatetyreName == ""){
      tyreName = currentTyreName;
    } else{
      tyreName = this.updatetyreName;
    }
    if(this.updatetyreType == ""){
      tyreType = currentTyretype;
    } else{
      tyreType = this.updatetyreType;
    }
    if(this.updatetyreWidth == 0){
      tyreWidth = currentTyrewidth;
    } else{
      tyreWidth = this.updatetyreWidth;
    }
    if(this.updatetyreHeight == 0){
      tyreHeight = currentTyreheight;
    } else{
      tyreHeight = this.updatetyreHeight;
    }
    if(this.updatetyreDiameter == ""){
      tyreDiameter = currentTyrediameter;
    } else{
      tyreDiameter = this.updatetyreDiameter;
    }
    if(this.updatetyrePrice == ""){
      tyrePrice = currentTyreprice;
    } else{
      tyrePrice = this.updatetyrePrice;
    }
    this.adminService.updateTyre(tyreName, tyreType,tyreWidth,tyreHeight,tyreDiameter,tyrePrice,
      currentTyreName,currentTyretype,currentTyrewidth,currentTyreheight,currentTyrediameter,currentTyreprice ).subscribe(msg => {
      this.router.navigate(['/admin']);
      this.ngOnInit();
    });
  }

  openModal(tyre: any) {
    this.currentTyre = { ...tyre };
    this.originalTyreValues = { ...this.originalValues };
    const myModal = new bootstrap.Modal(document.getElementById('modifyModal')!, {});
    myModal.show();
  }


  ngOnInit(): void {
    this.adminService.getTyres().subscribe(
      data => {
        this.tyres = data;
      });
    this.adminService.getUsers().subscribe(
      data => {
        this.users = data;
      })
    this.adminService.getOrders().subscribe(
      data => {this.orders = data;},
    )
  }

  logout() {
    this.connectionService.logout().subscribe();
    this.router.navigate(['/login']);
    }

}
