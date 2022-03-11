import { Injectable } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  basicModal:ModalDirective;
  createSMS:ModalDirective;
  createAlert: ModalDirective
  buyUnits: ModalDirective;  
  
  constructor() { }

    setModal(modal:ModalDirective) {
      this.basicModal = modal;  
    }
    
    showModal() {
      this.basicModal.show();
    }

    hideModal() {
      this.basicModal.hide()
    }

}
