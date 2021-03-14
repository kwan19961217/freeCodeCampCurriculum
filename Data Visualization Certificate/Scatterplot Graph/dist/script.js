const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
req.send();
req.onload = function () {
  const json = JSON.parse(req.responseText);
  createTable(json);
};

function createTable(dataset) {
  const w = 1000;
  const h = 600;

  const timearray = [];

  for (let i = 0; i < dataset.length; i++) {
    var date = new Date();
    date.setMinutes(dataset[i].Seconds / 60);
    date.setSeconds(dataset[i].Seconds % 60);
    timearray.push(date);
  }

  const padding = 100;
  const xScale = d3.scaleLinear().
  domain([d3.min(dataset, d => d.Year - 1), d3.max(dataset, d => d.Year + 1)]).
  range([padding, w - padding]);

  const yScale = d3.scaleLinear().
  domain([d3.min(dataset, d => d.Seconds - 10), d3.max(dataset, d => d.Seconds + 10)]).
  range([h - padding, padding]);

  const yScale2 = d3.scaleLinear().
  domain([d3.min(dataset, d => d.Seconds - 10), d3.max(dataset, d => d.Seconds + 10)]).
  range([padding, h - padding]);



  const svg = d3.select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  svg.selectAll("circle").
  data(dataset).
  enter().
  append("circle").
  attr("cx", (d, i) => xScale(d.Year)).
  attr("cy", (d, i) => h - yScale(d.Seconds)).
  attr("r", 5).
  attr("class", "dot").
  attr("fill", (d, i) => d.Doping ? "#404080" : "#69b3a2").
  attr("data-xvalue", (d, i) => d.Year).
  attr("data-yvalue", (d, i) => timearray[i]).
  append("title").
  attr("id", "tooltip").
  attr("data-year", (d, i) => d.Year).
  text((d, i) =>
  `Year: ${d.Year}
           Time: ${d.Time}
           ${d.Doping}`);




  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale2).tickFormat(d => d3.timeFormat('%M:%S')(new Date(0).setSeconds(d)));

  svg.append("g").
  attr("transform", `translate(0, ${h - padding})`).
  attr("id", "x-axis").
  call(xAxis);

  svg.append("g").
  attr("transform", `translate(${padding}, 0)`).
  attr("id", "y-axis").
  call(yAxis);

  var legend = svg.append("g").
  attr("class", "legend").
  attr("id", "legend");

  legend.append("circle").attr("cx", w - 255).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2");
  legend.append("circle").attr("cx", w - 255).attr("cy", 160).attr("r", 6).style("fill", "#404080");
  legend.append("text").attr("x", w - 235).attr("y", 130).text("No doping allegations").style("font-size", "15px");
  legend.append("text").attr("x", w - 235).attr("y", 160).text("Riders with doping allegations").style("font-size", "15px");

}