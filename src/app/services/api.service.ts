import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public afs: AngularFirestore
    // public shared: SharedService
  ) { }

  getAllCategories(){
    return this.afs.collection('categories');
  }

  getRatePerKm(){
    return this.afs.collection('rates').doc('rate_per_km')
  }

  getUserProfile(uid){
    return this.afs.collection('users').doc(uid)
  }

  getPayment(id){
    return this.afs.collection('payments').doc(id)
  }

  getOrder(id){
    return this.afs.collection('orders').doc(id)
  }

  getContact(id){
    return this.afs.collection('contacts').doc(id)
  }

  getQuote(id){
    return this.afs.collection('quotes').doc(id)
  }
}
