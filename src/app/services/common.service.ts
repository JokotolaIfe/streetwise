import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public afs: AngularFirestore
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
}
