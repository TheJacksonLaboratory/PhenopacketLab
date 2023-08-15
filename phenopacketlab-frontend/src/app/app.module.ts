import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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

import { AppRoutingModule } from './app.routing.module';
import { HelpComponent } from './component/help/help.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './component/about/about.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { SharedModule } from './component/shared/shared.module';
import { PhenoCreatorModule } from './component/pheno-creator/pheno-creator.module';
import { environment } from '../environments/environment';
import { PhenopacketListModule } from './component/phenopacket-list/phenopacket-list.module';
const config: AuthConfig = {
    ...environment.AUTH
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        GridModule,
        PhenoCreatorModule,
        PhenopacketListModule,
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
        HelpComponent

    ],
    exports: [RouterModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
