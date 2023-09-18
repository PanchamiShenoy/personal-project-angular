// chart.js

// Load the budget data from the JSON file
d3.json('budgetData.json', function(error, data) {
    if (error) {
      console.error(error);
      return;
    }
  
    // Extract the budget data from the JSON
    const budgetData = data.budget;
  
    // Define the SVG dimensions
    const width = 400;
    const height = 300;
  
    // Create an SVG element
    const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    // Define scales for x and y axes
    const xScale = d3.scaleBand()
      .domain(budgetData.map(d => d.title))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(budgetData, d => d.budget)])
      .range([height, 0]);
  
    // Create and append the bars to the chart
    svg.selectAll('rect')
      .data(budgetData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.title))
      .attr('y', d => yScale(d.budget))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.budget))
      .attr('fill', 'steelblue');
  
    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
  
    // Append the axes to the chart
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
  
    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  });
  