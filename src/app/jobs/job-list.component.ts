import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DateAdapter,
  MatDatepickerInputEvent,
  MatSnackBarConfig,
  PageEvent,
} from '@angular/material';

import { JobType } from '../models/job-type';
import { AuthService } from './../core/auth.service';
import { JobTypesService } from './../core/job-types.service';
import { JobsService } from './../core/jobs.service';
import { JobAd } from './../models/job-ad';
import { SharedSnackModule } from './../shared/material/shared-snack.module';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  public jobs: JobAd[];
  public paginatedJobs: JobAd[];
  public length: number;
  public pageSize = 10;
  public keyword: string;
  public jobTypes: JobType[];
  public selectedCategory = 'none';
  public userInput: string;
  public startDateInput: string;
  public endDateInput: string;
  private startDate = '01/01/1970';
  private endDate = '30/11/9999';
  private snackOptions = {
    duration: 2500,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    public jobsService: JobsService,
    public snack: SharedSnackModule,
    public authService: AuthService,
    public jobTypesService: JobTypesService,
    public adapter: DateAdapter<any>,
  ) {}

  public ngOnInit(): void {
    this.jobsService.getAll().subscribe((data) => {
      this.jobs = data;
      this.length = this.jobs.length;
      if (this.length === 0) {
        this.snack.openSnackMsg('There are no open positions - please try later', 'Close', this.snackOptions);
      }
      this.onChangePage({
        pageIndex: 0,
        length: this.length,
        pageSize: this.pageSize,
      });
    });

    this.jobTypesService.getAll().subscribe((jobTypes) => {
      this.jobTypes = jobTypes;
    });
  }

  public onChangePage(event: PageEvent): void {
    const copy = this.jobs.slice();
    this.paginatedJobs = copy.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize,
    );
  }

  private filterJobs(input: string, startDate: string, endDate: string): void {
    const copy = this.jobs.slice();
    this.userInput = input;
    this.paginatedJobs = this.jobsService.filter(copy, input, this.selectedCategory, startDate, endDate);
    if (this.paginatedJobs.length === 0) {
      this.snack.openSnackMsg('There are no open positions with these criteria', 'Close', this.snackOptions);
    } else {
      this.snack.dismissSnackMsg();
    }
  }

  private onStartDateChanged(event: MatDatepickerInputEvent<Date>): void {
    const input = event.targetElement as HTMLInputElement;
    this.startDate = input.value;
    this.filterJobs(this.userInput, this.startDate, this.endDate);
  }
  private onEndDateChanged(event: MatDatepickerInputEvent<Date>): void {
    const input = event.targetElement as HTMLInputElement;
    this.endDate = input.value;
    this.filterJobs(this.userInput, this.startDate, this.endDate);
  }

  private clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = 'none';
    this.paginatedJobs = this.jobs.slice();
    this.startDate = '01/01/1970';
    this.endDate = '30/11/9999';
    this.startDateInput = '';
    this.endDateInput = '';
  }
}
