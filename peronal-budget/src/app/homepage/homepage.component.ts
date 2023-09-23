import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public dataSource = {
    datasets: [{
      data: [] as number[],
      backgroundColor: [
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#f6a2eb',
        '#aaaaaa',
        '#fecdae',
        '#36a1ab'
      ]
    }],
    labels: [] as string[]
  };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/budget').subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.budget[i].budget;
        this.dataSource.labels[i] = res.budget[i].title;
      }
      this.createChart()

    });
  }

  createChart() {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement | null;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      }
    }
  }

}
