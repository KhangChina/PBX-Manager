import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import { CoreModule } from '@core/core.module';
import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { RestApiService } from './services/rest-api.service';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './common/admin/admin.module';
import { AuthGuard } from './services/auth-guard';
import { ErrorComponent } from './common/error/error.component';
import { ClientModule } from './common/clients/client.module';
import { CoreSidebarModule, CorePhoneModule,CoreThemeCustomizerModule ,CoreChatModule} from '@core/components';
// import { PhoneModule } from '@core/components/phone/phone.module';

// import { SampleModule } from './main/sample/sample.module';

const appRoutes: Routes = [
  //admin access router
  {
    path: 'admin',
    loadChildren: () => import('./common/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  //client access router
  {
    path: 'authentication',
    loadChildren: () => import('./common/clients/client.module').then(m => m.ClientModule),
  },
  {
    path: '**',
    component:ErrorComponent
  }

]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),
    
    //NgBootstrap
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),

    // App modules (auto check router)
    LayoutModule,
    AdminModule,
    ClientModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    CorePhoneModule,
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }