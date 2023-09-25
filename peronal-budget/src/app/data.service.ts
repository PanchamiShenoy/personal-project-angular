import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#f6a2eb',
          '#aaaaaa',
          '#fecdae',
          '#36a1ab',
        ],
      },
    ],
    labels: [] as string[],
  };

  constructor(private http: HttpClient) {}

  fetchData() {
    if (this.dataSource.datasets[0].data.length === 0) {
      this.http.get('http://localhost:5000/budget').subscribe((res: any) => {
        for (var i = 0; i < res.budget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.budget[i].budget;
          this.dataSource.labels[i] = res.budget[i].title;
        }
      });
    }
  }
}
