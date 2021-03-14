const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json');
req.send();
req.onload = function () {
  const json = JSON.parse(req.responseText);
  createTable(json);
};

function createTable(dataset) {
  const w = 1200;
  const h = 800;
  const padding = 100;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const average = dataset.baseTemperature;

  const xScale = d3.scaleLinear().
  domain([d3.min(dataset.monthlyVariance, d => d.year), d3.max(dataset.monthlyVariance, d => d.year)]).
  range([padding, w - padding]);

  const yScale = d3.scaleBand().
  domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).
  range([padding, h - padding]);

  const colorScale = d3.scaleLinear().
  domain([4, 11]).
  range([0, 7]);

  const color = ["#2859d4", "#7cadf7", "#7ccaf7", "#c2f5ff", "#ffe0b3", "#fcba03", "#fc9003", "#fc0303"];

  var svg = d3.select("#table-body").
  append("svg").
  attr("width", w).
  attr("height", h).
  attr("class", "table");

  const xAxis = svg.append("g").
  attr("transform", `translate(-1, ${h - padding})`).
  attr("id", "x-axis").
  call(d3.axisBottom(xScale).
  tickFormat(d => d));

  const yAxis = svg.append("g").
  attr("transform", `translate(${padding - 1}, 0)`).
  attr("id", "y-axis").
  call(d3.axisLeft(yScale).
  tickFormat(d => monthNames[d]));


  svg.selectAll("rect").
  data(dataset.monthlyVariance).
  enter().
  append("rect").
  attr("x", (d, i) => xScale(d.year)).
  attr("y", (d, i) => yScale(d.month - 1)).
  attr("width", 4).
  attr("height", 50).
  attr("class", "cell").
  attr("data-month", (d, i) => d.month - 1).
  attr("data-year", (d, i) => d.year).
  attr("data-temp", (d, i) => d.variance + average).
  style("fill", (d, i) => d.variance + average >= 11.5 ? color[7] : d.variance + average < 3.5 ? color[0] : color[Math.round(colorScale(d.variance + average))]).
  append("title").
  attr("id", "tooltip").
  text((d, i) =>
  `Year: ${d.year}
           Month: ${monthNames[d.month - 1]}
           Temperature: ${average + d.variance}`).
  attr("data-year", (d, i) => d.year);


  const legendsvg = d3.select("#table-body").
  data(dataset.monthlyVariance).
  append("svg").
  attr("x", padding).
  attr("y", h).
  attr("width", w).
  attr("height", 100).
  attr("id", "legend");

  const legendScale = d3.scaleLinear().
  domain([4, 12]).
  range([padding, 300]);



  const legendAxis = legendsvg.append("g").
  attr("transform", `translate(0, 10)`).
  call(d3.axisBottom(legendScale).
  ticks(8).
  tickFormat(d => d - 0.5));

  legendsvg.selectAll("rect").
  data([4, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5]).
  enter().
  append("rect").
  attr("x", (d, i) => padding + 25 * i).
  attr("y", 0).
  attr("height", 10).
  attr("width", 25).
  style("fill", (d, i) => color[i]);

}