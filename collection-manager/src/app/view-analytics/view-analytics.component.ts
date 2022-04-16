import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DevService } from '../dev.service';
import { DocumentData } from '../documentData';


@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.component.html',
  styleUrls: ['./view-analytics.component.css'],
})
export class ViewAnalyticsComponent implements OnInit {
  // activity data
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Website Visits' },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions: ChartOptions & { annotation?: any } = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  // bar chart page visits per category
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Collections',
    'Storage',
    'Market',
    'Chat',
    'Knowledge Hub',
    'Dev/Analytics',
  ];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(47,97,235,1)',
    },
  ];
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Page Visits' },
  ];
  // total documents data

  public docData: DocumentData = new DocumentData();
  private devSub: any;
  public warning: string;
  public currentDate = Date.now();

  constructor(
    private routing: Router,
    private route: ActivatedRoute,
    private devService: DevService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.devSub = this.devService.documentStats().subscribe(
      (response) => {
        this.docData = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }
}
