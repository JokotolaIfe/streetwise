import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  first_name; last_name; email; phone;
  payment_for; amount: number;
  reference = Math.random().toString(36).substr(2, 10);

  constructor(
    public afs: AngularFirestore,
    public api: ApiService
  ) { }

  ngOnInit() {
  }

  changeAmount(amount){
    this.amount = amount
  }


  
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentCancel() {
    console.log('payment failed');
  }

  async paymentDone(evt){
    let pay_id = this.afs.createId();

    if(evt){
    let order_details = {
      description: 'Payment of '+this.amount+' for '+this.payment_for,
    }
    let user_details = {
      firstname: this.first_name, 
      lastname: this.last_name, 
      email: this.email, 
      phone: this.phone, 
      date: new Date().getTime()
    }
      //save payment
      await this.api.getPayment(pay_id).set({
        id: pay_id,
        amount: this.amount,
        ref: this.reference,
        delivery_status: 'pending',
        user_details: user_details,
        order_details: order_details,
        date: new Date().getTime()
      })

      setTimeout(() => {
        alert('Payment Successful, One of our agents will give you a call shortly');
        window.location.reload()
      }, 300);
    }
  }
}
