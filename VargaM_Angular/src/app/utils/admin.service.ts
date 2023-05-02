import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

      //Lekeres
      getTyres() {
        return this.http.get<any[]>('http://localhost:3000/products');
      }

      //Gumi Hozzadas
      addTyre(newtyreName : string, newtyreType : string, newtyreWidth : number,newtyreHeight : number,newtyreDiameter: string, newtyrePrice:string ){
        return this.http.post('http://localhost:3000' + '/addtyre', {
          newtyreName:newtyreName,
          newtyreType : newtyreType,
          newtyreWidth:newtyreWidth,
          newtyreHeight:newtyreHeight,
          newtyreDiameter:newtyreDiameter,
          newtyrePrice:newtyrePrice
       }, {withCredentials:true,responseType :'text', observe: 'response' as 'response'});
      }

      //Gumi torlese
      deleteTyre(tyreName : string,tyrePrice:string){
        return this.http.post('http://localhost:3000' + '/deleteTyre', {
          tyreName:tyreName,
          tyrePrice:tyrePrice
       }, {responseType :'text', observe: 'response' as 'response'});
      }

      updateTyre(
        tyreName : string, tyreType: string,tyreWidth:number,tyreHeight:number,tyreDiameter : string,tyrePrice : string,
        currentTyreName : string,currentTyretype :string,currentTyrewidth:number,currentTyreheight : number,
        currentTyrediameter : string,currentTyreprice: string
        ) {
        const oldTyre = {
          name: currentTyreName,
          type: currentTyretype,
          width: currentTyrewidth,
          height: currentTyreheight,
          diameter: currentTyrediameter,
          price: currentTyreprice
        };
        const updatedTyre = {
          name: tyreName,
          type: tyreType,
          width: tyreWidth,
          height: tyreHeight,
          diameter: tyreDiameter,
          price: tyrePrice
        }
        return this.http.post('http://localhost:3000' + '/updateTyre', {
          oldTyre:oldTyre,
          updatedTyre:updatedTyre
       }, {responseType :'text', observe: 'response' as 'response'});
      }

      //Lekeres
      getUsers() {
        return this.http.get<any[]>('http://localhost:3000/users');
      }

      //User torlese
      deleteUser(username : string,email:string){
        return this.http.post('http://localhost:3000' + '/deleteUser', {
          username:username,
          email:email
        }, {responseType :'text', observe: 'response' as 'response'});
      }

      //Lekeres
      getOrders() {
        return this.http.get<any[]>('http://localhost:3000/orders');
      }

      //User torlese
      deleteOrder(billingName : string,address:string){
        return this.http.post('http://localhost:3000' + '/deleteOrder', {
          billingName:billingName,
          address:address
        }, {responseType :'text', observe: 'response' as 'response'});
      }
}
