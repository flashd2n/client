import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateAdapter } from '@angular/material';

import { ApplicationGuard } from './guards/application-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { ClosedApplicationGuard } from './guards/closed-application-guard.service';

import { AppConfig } from '../config/app.config';
import { ApplicationsService } from './applications.service';
import { AuthService } from './auth.service';
import { JobTypesService } from './job-types.service';
import { JobsService } from './jobs.service';

import { CustomDateAdapter } from './../shared/material/date-adapter';

@NgModule({
  providers: [
    JobsService,
    AppConfig,
    AuthService,
    ApplicationsService,
    ApplicationGuard,
    AuthGuard,
    ClosedApplicationGuard,
    JobTypesService,
    {provide: DateAdapter, useClass: CustomDateAdapter},
  ],
})
export class CoreModule { }
