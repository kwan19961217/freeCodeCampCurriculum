const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
req.send();
req.onload = function () {
  const json = JSON.parse(req.responseText);
  createTable(json.data);
};

function createTable(data) {
  const year = data.map(d => d[0].split("-")[0]);
  const h = 1000;
  const w = 1200;
  const padding = 100;
  const xScale = d3.scaleLinear().
  domain([d3.min(year, d => d), d3.max(year, d => d)]).
  range([padding, w - padding]);

  const yScale = d3.scaleLinear().
  domain([0, d3.max(data, d => d[1])]).
  range([h - padding, padding]);

  const svg = d3.select("#table").
  append("svg").
  attr("width", w).
  attr("height", h);
  svg.selectAll("rect").
  data(data).
  enter().
  append("rect").
  attr("class", "bar").
  attr("x", (d, i) => xScale(1947 + i / 4)).
  attr("y", (d, i) => yScale(d[1])).
  attr("width", 1).
  attr("height", (d, i) => h - yScale(d[1]) - padding).
  attr("data-date", (d, i) => d[0]).
  attr("data-gdp", (d, i) => d[1]).
  append("title").
  attr("id", "tooltip").
  attr("data-date", (d, i) => d[0]).
  text((d, i) => `Date: ${d[0]} GDP: ${d[1]}`);

  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);

  svg.append("g").
  attr("transform", `translate(${padding} ,0)`).
  attr("id", "y-axis").
  call(yAxis);

  svg.append("g").
  attr("transform", `translate(0, ${h - padding})`).
  attr("id", "x-axis").
  call(xAxis);
}