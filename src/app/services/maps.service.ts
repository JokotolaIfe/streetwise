import { Injectable } from '@angular/core';
declare var google: any;
declare var window: any;


@Injectable({
  providedIn: 'root'  // <- ADD THIS
})
export class MapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  // apiKey: string =  "AIzaSyB1DSf-PRIb0k0bX9CAqDxLc0EHtAUCuPk";
  apiKey: string = 'AIzaSyDo_9F73WMtinAm7Mq-wXscn9WPz8AcAXM' 

  constructor() {}
  
  init(mapElement: any): Promise<any> {

    this.mapElement = mapElement;

    return this.loadGoogleMaps();

  }


  
  loadGoogleMaps(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        window['mapInit'] = () => {

          this.initMap().then(() => {
            resolve(true);
          });
        }
      
        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'https://maps.google.com/maps/api/js?key='+this.apiKey+'&callback=mapInit&libraries=places';
        } else {
          script.src = 'https://maps.google.com/maps/api/js?callback=mapInit&libraries=places';
        }

        document.body.appendChild(script);        
        resolve(true);
      }

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      this.map = new google.maps.Map(this.mapElement);
      resolve(true);
    });

  }



  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }
  
}