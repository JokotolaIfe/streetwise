import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import { StepperModule, WavesModule, ToastModule, MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FaqComponent } from './pages/faq/faq.component'
import { MapsService } from './services/maps.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { Angular4PaystackModule } from 'angular4-paystack';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { PayComponent } from './pages/pay/pay.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        FooterComponent,
        FaqComponent,
        ContactFormComponent,
        QuoteComponent,
        PayComponent,
        SideNavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        StepperModule, WavesModule,
        AngularFireModule.initializeApp(environment.config),
        AngularFireAuthModule,
        AngularFirestoreModule,
        MDBBootstrapModulesPro.forRoot(),
        ToastModule.forRoot(),
        Angular4PaystackModule.forRoot('pk_test_ee3f4927da5afd3335531127d78110f707f04426'),
        ReactiveFormsModule,   
    ],
    providers: [MapsService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule  {
  
}
