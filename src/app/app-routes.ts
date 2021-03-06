import { Routes } from '@angular/router';

import { ApplicationGuard } from './core/guards/application-guard.service';
import { AuthGuard } from './core/guards/auth-guard.service';
import { ClosedApplicationGuard } from './core/guards/closed-application-guard.service';

import { HomeComponent } from './home/home.component';
import { JobListComponent } from './jobs/job-list.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'users', loadChildren: './users/users.module#UsersModule' },
    { path: 'jobs', loadChildren: './jobs/jobs.module#JobsModule' },
    {
        path: 'admin', children: [
            { path: 'jobs', loadChildren: './admin/jobs/jobs-admin.module#JobsAdminModule' },
            { path: 'btn', loadChildren: './admin/dynamic-buttons/dynamic-buttons.module#DynamicButtonsModule' },
            { path: 'users', loadChildren: './admin/user.listing/user.listing.module#UserListingModule' },
        ],
    }];
