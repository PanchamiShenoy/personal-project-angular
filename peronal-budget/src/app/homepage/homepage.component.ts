import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData();
    this.createChart();
    this.createD3Chart();
  }

  createChart() {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement | null;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const data = this.dataService.dataSource;
        console.log(data)
        if (data && data.datasets && data.datasets.length > 0) {
          setTimeout(() => {
            const myPieChart = new Chart(ctx, {
              type: 'pie',
              data: data
            });
          }, 100);
        }
      }
    }
  }

  createD3Chart() {
    var data = this.dataService.dataSource.datasets[0].data;
    var labels = this.dataService.dataSource.labels;

    var width = 1000;
    var height = 700;

    var svg = d3.select('#d3-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

    var pie = d3.pie();

    const arc = d3.arc()
        .innerRadius(50)
        .outerRadius(200);

    setTimeout(() => {
        var g = svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var arcs = g.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g');

        arcs.append('path')
            .attr('d', function(d: any) {
                return arc(d)
            })
            .attr('fill', function(d, i) {
                return colors[i];
            });

        arcs.append('text')
            .attr('transform', function(d: any) {
                var centroid = arc.centroid(d);
                return 'translate(' + centroid[0] + ',' + centroid[1] + ')';
            })
            .attr('text-anchor', 'middle')
            .text(function(d, i) {
                return labels[i];
            });
    }, 100);
  }
    }


