import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthConfig, AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@angular/flex-layout/grid';

import { ROUTING } from './app.routing';
import { HelpComponent } from './component/help/help.component';
import { LoginComponent } from "./component/header/login.component";
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { CohortListComponent } from './component/cohort-list/cohort-list.component';
import { FamilyListComponent } from './component/family-list/family-list.component';
import { PhenopacketModule } from './component/phenopacket/phenopacket.module';
import { AboutComponent } from './component/about/about.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { SharedModule } from './component/shared/shared.module';
import { PhenoCreatorModule } from './component/pheno-creator/pheno-creator.module';
import { PhenopacketListComponent } from './component/phenopacket-list/phenopacket-list.component';
import { environment } from '../environments/environment';
const config: AuthConfig = {
    ...environment.AUTH
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ROUTING,
        RouterModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        GridModule,
        PhenoCreatorModule,
        PhenopacketModule,
        SharedModule,
        AuthModule.forRoot(config)
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        AboutComponent,
        HelpComponent,
        PhenopacketListComponent,
        CohortListComponent,
        FamilyListComponent,
        LoginComponent

    ],
    exports: [RouterModule],
    providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
        // provider used to create a fake backend
        // fakeBackendProvider
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
