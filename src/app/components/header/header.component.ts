declare var google: any;


import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
// import { Common } from '../../providers/common';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { ApiService } from 'src/app/services/api.service';
import { last } from 'rxjs/operators';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild("basicModal", { static: true }) basicModal: ModalDirective;
  @ViewChild("paymentModal", { static: false }) paymentModal: ModalDirective;
  @ViewChild('map_canvas', {static: true}) elemElem: ElementRef;

  firstname: string;
  lastname: string;

  loading: boolean = false;
  amount: number ;

  autocompleteService: any;
  placesService: any;

  GoogleAutocomplete: any;
  autocomplete: any = { input: '', lat: '', lng: '' };
  pickupcomplete: any = { input: '', lat: '', lng: '' };
  dropcomplete: any = { input: '', lat: '', lng: '' };

  autocompleteItems: any;
  pickupautocompleteItems = [];
  dropautocompleteItems = [];

  current_lat: number = 0;
  current_lng: number = 0;

  pickup_location: string;
  drop_location: string;

  email: string;
  user: any;
  
  selected_category: string;
  phone: string;

  categories = [];
  date_of_delivery: string = new Date().toISOString().split('T')[0].toString();

  directionsService;
  trip_distance;
  
  onboarding;
  rate;

  reference = Math.random().toString(36).substr(2, 10);
  singleUser; desc; height: number = 0; width: number = 0;

  constructor(
    public zone: NgZone,
    // public common: Common,
    public afa: AngularFireAuth,
    public afs: AngularFirestore,
    public maps: MapsService,
    public api: ApiService,
    public modal: ModalService
  ) { 
  }

  ngOnInit() {
    this.afa.authState.subscribe(res=>{
      this.user = res;
      this.getUserProfile()
    })
    this.api.getRatePerKm().valueChanges().subscribe(res=>{
      this.rate = res;
      console.log(this.rate)
    })
    this.modal.setModal(this.basicModal);
  }

  ngAfterViewInit(){
    this.api.getAllCategories().valueChanges().subscribe(ref=>{
      this.categories = ref;
      console.log(this.categories)
    })
    setTimeout(() => {
      this.maps.init(this.elemElem.nativeElement).then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService();
      });
    }, 500);
  }

  getUserProfile(){
    this.api.getUserProfile(this.user.uid).valueChanges().subscribe(ref=>{
      this.singleUser = ref;
      if(this.singleUser){
        this.email = this.singleUser.email;
        this.firstname = this.singleUser.firstname;
        this.lastname = this.singleUser.lastname;
        this.phone = this.singleUser.phone;
      }
    })
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    let location = {
      lat: this.current_lat,
      lng: this.current_lng,
    };

    let config = {
      input: this.autocomplete.input
    }

    this.autocompleteService.getPlacePredictions(config,
      (predictions, status) => {
        console.log(status);
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });

  }

  async pickupSearchResults(input) {
    if (input == '') {
      this.pickupautocompleteItems = [];
      return;
    }
    console.log(input)
    let location = {
      lat: this.current_lat,
      lng: this.current_lng,
    };

    let config = {
      bounds: new google.maps.LatLngBounds(location),
      input: input
    }
    this.autocompleteService = await new google.maps.places.AutocompleteService();

    this.autocompleteService.getPlacePredictions(config,
      (predictions, status) => {
        console.log(status);
        this.pickupautocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.pickupautocompleteItems.push(prediction);
          });
          setTimeout(() => {
            console.log(this.pickupautocompleteItems)
          }, 1000);
        });
      });

  }

  async selectPickupLocation(location){
    this.pickup_location = await location;
    console.log(location)
    if(location.description){
      this.pickupcomplete.input = await location.description;

      setTimeout(() => {
        this.pickupautocompleteItems = []
      }, 200);
      this.placesService = await new google.maps.places.PlacesService(this.maps.map);
      await this.placesService.getDetails({ placeId: location.place_id }, (details: any) => {
        this.zone.run(async () => {
          this.pickupcomplete.lat = await details.geometry.location.lat();
          this.pickupcomplete.lng = await details.geometry.location.lng();
        });
        console.log(this.pickupcomplete);
      });

    }
  }

  async dropSearchResults(input) {
    if (input == '') {
      this.dropautocompleteItems = [];
      return;
    }
    console.log(input)
    let location = {
      lat: this.current_lat,
      lng: this.current_lng,
    };

    let config = {
      bounds: new google.maps.LatLngBounds(location),
      input: input
    }
    this.autocompleteService = await new google.maps.places.AutocompleteService();
    this.autocompleteService.getPlacePredictions(config,
      (predictions, status) => {
        console.log(status);
        this.dropautocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.dropautocompleteItems.push(prediction);
          });
          setTimeout(() => {
            console.log(this.dropautocompleteItems)
          }, 1000);
        });
      });

  }

  async selectDropLocation(location){
    // let location = await this.dropcomplete;
    console.log(location)
    if(location.description){
      this.dropcomplete.input = await location.description;
      setTimeout(() => {
        this.dropautocompleteItems = []
      }, 200);
      this.placesService.getDetails({ placeId: location.place_id }, (details: any) => {
        this.zone.run(() => {
          this.dropcomplete.lat = details.geometry.location.lat();
          this.dropcomplete.lng = details.geometry.location.lng();
        });
        console.log(this.dropcomplete);
      });
      this.placesService.getDetails({ placeId: location.place_id }, (details: any) => {
        this.zone.run(() => {
          this.dropcomplete.lat = details.geometry.location.lat();
          this.dropcomplete.lng = details.geometry.location.lng();
        });
        console.log(this.dropcomplete);
      });
    }

  }  

  async continue(uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone, date_of_delivery, desc){
    console.log(uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone, date_of_delivery, desc);
    if(email && firstname && lastname && category && pickupcomplete && dropcomplete && phone && date_of_delivery && desc){
      if(uid){
        this.saveData(uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone, desc)
      }
      else{
        this.signUpUser().then(()=>{
          this.saveData(this.user.uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone, desc)
        })
      }
    } else {
      alert('Kindly ensure you fill all fields')
    }
  }

  async signUpUser(){
    await this.afa.signInAnonymously().then(res=>{
      this.user = res.user
      console.log(this.user) 
    })
  }
  
  async saveData(uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone, desc){
    this.loading = await true;
    console.log(uid, email, firstname, lastname, height, width, category, pickupcomplete, dropcomplete, phone)
    await this.api.getUserProfile(uid).set({
      uid: uid, firstname: firstname, lastname: lastname, email: email, phone: phone, date: new Date().getTime()
    }).then(async ()=>{
      await this.calcRoute().then(()=>{
        setTimeout(() => {
          this.launchPayment(); 
          this.singleUser = {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            uid: this.user.uid
          } 
        }, 6000);
      })
      console.log(this.pickupcomplete, this.dropcomplete)
    })
  }

  async calcRoute() {
    var request = {
      origin: { lat: parseFloat(await this.pickupcomplete.lat), lng: parseFloat(await this.pickupcomplete.lng) },
      destination: { lat: parseFloat(await this.dropcomplete.lat), lng: parseFloat(await this.dropcomplete.lng) },
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    };

    console.log(request);
    this.directionsService = new google.maps.DirectionsService;

    this.directionsService.route(request, (async (response, status) => {
      console.log("calculate")
      if (status == google.maps.DirectionsStatus.OK) {

        new google.maps.DirectionsRenderer({
          map: await this.maps.map,
          directions: response,
          suppressMarkers: true
        });
        var leg = await response.routes[0].legs[0];
        console.log('response legs', response)
        this.trip_distance = await response.routes[0].legs[0].distance.value / 1000;
        this.trip_distance = Math.ceil(await this.trip_distance * 10) / 10;
        this.amount = Math.round(this.trip_distance) * this.rate.rate
        console.log(this.trip_distance)
        console.log(this.amount)
      }
    }),
      err => {
        console.log("ERROR!: ", err);
      }
    );

  }

  async launchPayment(){
    this.loading = await false;
    this.basicModal.hide();
    this.paymentModal.show();
  }

  closeBtn(){
    document.getElementById("close_btn").click();
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentCancel() {
    console.log('payment failed');
  }

  async paymentDone(evt){
    let order_id = await this.afs.createId();
    let pay_id = await this.afs.createId();

    if(evt){
    let order_details = await {
      drop_location: this.dropcomplete,
      pickup_location: this.pickupcomplete,
      category: this.selected_category,
      description: this.desc,
      date_of_delivery: this.date_of_delivery,
      package_height: this.height,
      package_width: this.width,
    }
      //save payment
      await this.api.getPayment(await pay_id).set({
        id: await pay_id,
        amount: this.amount,
        ref: this.reference,
        delivery_status: 'pending',
        user_details: this.singleUser,
        order_details: order_details,
        date: new Date().getTime()
      })

      //save successful order
      await this.api.getOrder(await order_id).set({
        id: await order_id,
        paid: true,
        payment_id: await pay_id,
        amount_paid: this.amount,
        payment_ref: this.reference,
        user_details: this.singleUser,
        order_details: order_details,
        date: new Date().getTime()
      })

      setTimeout(() => {
        alert('Payment Successful, One of our agents will give you a call shortly');
        this.paymentModal.hide();
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }, 300);
    }
  }
}
