import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  success: boolean = false;
  loading: boolean = false;

  name: string; email: string; message: string;

  constructor(
    public api: ApiService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
  }
  
  async submit(name, email, message){
    this.loading = true;
    console.log(name, email, message);
    try {
      let id = await this.afs.createId();
      this.api.getContact(id).set({
        name: name, email: email, message: message, id: id, date: new Date().getTime()
      }).then(()=>{
        setTimeout(() => {
          alert('Thank you! Your message has been sent. We will get back to you shortly')
          this.loading = false; this.name = ''; this.email = ''; this.message = '';
        }, 2000);
      }) 
    } catch (error) {
      console.log(error)
    }
  }

}
