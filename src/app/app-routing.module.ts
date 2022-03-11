import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component'
import { PayComponent } from "./pages/pay/pay.component";
import { QuoteComponent } from "./pages/quote/quote.component";

const routes: Routes = [
  // { path: "**", component: LoginComponent},
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "about", component: AboutComponent},
  { path: "contact", component: ContactComponent},
  { path: "faq", component: FaqComponent},
  { path: "pay", component: PayComponent},
  { path: "quote", component: QuoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
