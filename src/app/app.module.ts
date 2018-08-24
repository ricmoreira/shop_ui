import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';

// import services
import { AuthenticationService } from '../services/authentication.service'
import { AuthGuardService } from '../services/auth-guard.service'
import { ProductsService } from '../services/products.service';
import { StockMovsService } from '../services/stock-movs.service';
import { InvoicesService } from '../services/invoices.service';
import { SAFTService } from '../services/saft.service';
import { HeadersService } from '../services/headers.service';
import { NotificationService } from '../services/notification.service';

// Import components
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { P404Component } from './404/404.component';
import { P500Component } from './500/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { ProductsComponent } from './products/products.component';
import { StockMovsListComponent } from './stock-movs/stock-movs-list.component';
import { StockMovsCreateComponent } from './stock-movs/stock-movs-create.component';
import { StockCountListComponent } from './stock-count/stock-count-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SAFTComponent } from './saft/saft.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular'

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    ProductsComponent,
    StockMovsListComponent,
    StockMovsCreateComponent,
    InvoicesComponent,
    SAFTComponent,
    CompanyInfoComponent,
    StockCountListComponent,
    CashRegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    AuthenticationService,
    AuthGuardService,
    ProductsService,
    StockMovsService,
    InvoicesService,
    SAFTService,
    NotificationService,
    HeadersService,
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
