import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from 'src/app/services/api.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, AfterViewInit {
  @ViewChild('tabs', {static: true}) public tabs;

  public radioModel: string;
  add_insurance: string = ''; delivery_option: string = ''; address: string = '';
  email: string = ''; first_name: string = ''; phone: string = ''; last_name: string = '';
  pickup_address: string = ''; drop_address: string = ''; pmb: string = ''; city: string = ''; state: string = '';
  width: string = ''; height: string = ''; depth: string = ''; weight: string = ''; shipment_note: string = '';
  constructor(
    public api: ApiService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.radioModel = 'Fleet_Management'
  }

  nextTab(no) {
    this.tabs.setActiveTab(no);
  }

  submit(){
    const id = this.afs.createId();
    let personal_details = {
      name: this.first_name+ ' '+this.last_name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      p_o_box: this.pmb,
      city: this.city,
      state: this.state
    };
    let delivery_details = {
      delivery_service: this.radioModel,
      delivery_option: this.delivery_option,
      pickup_address: this.pickup_address,
      drop_address: this.drop_address,
      width: this.width,
      height: this.height,
      depth: this.depth,
      add_insurance: this.add_insurance,
      shipoment_note: this.shipment_note
    }
    if(this.first_name && this.last_name && this.phone && this.email && this.delivery_option && this.radioModel && this.pmb && this.pickup_address && this.drop_address){
      this.api.getQuote(id).set({
        id: id,
        user_details: personal_details,
        service_details: delivery_details,
        date: new Date().getTime()
      }).catch(err=>{
        console.log(err)
      }).then(()=>{
        alert('Thanks for reaching out to us, we will get back to you shortly')
        location.reload();
      })
    }
    else{
      alert('Ensure you fill all fields.')
    }
  }

}
