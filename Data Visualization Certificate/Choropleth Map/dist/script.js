const reqEducation = new XMLHttpRequest();
reqEducation.open("GET", 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json', true);
reqEducation.send();
reqEducation.onload = function () {
  const educationResponse = JSON.parse(reqEducation.responseText);

  const reqCounties = new XMLHttpRequest();
  reqCounties.open("GET", 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json', true);
  reqCounties.send();
  reqCounties.onload = function () {
    const countiesResponse = JSON.parse(reqCounties.responseText);
    createTable(educationResponse, countiesResponse);
  };
};
function createTable(educationData, countyData) {
  const w = 1800;
  const h = 650;
  const margin = { top: 50, bottom: 20, left: 50, right: 50 };
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;
  const matchedEducation = [];
  for (let i = 0; i < countyData.objects.counties.geometries.length; i++) {
    for (let j = 0; j < educationData.length; j++) {
      if (educationData[j].fips == countyData.objects.counties.geometries[i].id) {
        matchedEducation.push(educationData[j]);
        break;
      }
    }
  }
  const colorScale = d3.scaleLinear()
  /*.domain([d3.min(educationData, d => d.bachelorsOrHigher), d3.max(educationData, d => d.bachelorsOrHigher)])*/.
  domain([10, 50]).
  range([1, 5]);

  const color = ["#e2e2e0", "#f7f5b7", "#d2cf00", "#b1c811", "#6d9211", "#0c4e00"];
  const pathGenerator = d3.geoPath();
  const counties = topojson.feature(countyData, countyData.objects.counties).features;

  const svg = d3.select("#test").
  append("svg").
  attr("width", w).
  attr("height", h);

  const g = svg.append("g").
  attr("transform", `translate(${margin.left}, ${margin.top})`);

  const paths = g.selectAll("path").
  data(counties).
  enter().
  append("path").
  attr("x", innerWidth).
  attr("y", innerHeight).
  attr('d', d => pathGenerator(d)).
  attr('class', 'county').
  attr('data-fips', (d, i) => matchedEducation[i].fips).
  attr('data-education', (d, i) => matchedEducation[i].bachelorsOrHigher).
  style('fill', (d, i) => matchedEducation[i].bachelorsOrHigher < 10 ? color[0] : matchedEducation[i].bachelorsOrHigher > 50 ? color[5] : color[Math.floor(colorScale(matchedEducation[i].bachelorsOrHigher))]).
  style('stroke', '#75a999').
  append('title').
  text((d, i) => `${matchedEducation[i].area_name}
                 Bachelors or Higher: ${matchedEducation[i].bachelorsOrHigher}
                 `);

  const legendsvg = d3.select("#test").
  data([0, 10, 20, 30, 40, 50, 60]).
  append("svg").
  attr("x", 10).
  attr("y", h).
  attr("width", 300).
  attr("height", 200).
  attr("id", "legend");

  const legendScale = d3.scaleLinear().
  domain([0, 60]).
  range([10, 300]);

  const legendAxis = legendsvg.append("g").
  attr("transform", `translate(0, 20)`).
  call(d3.axisBottom(legendScale).
  ticks(6).
  tickFormat(d => d > 50 ? "" : `${d}%`));

  legendsvg.selectAll("rect").
  data([0, 10, 20, 30, 40, 50]).
  enter().
  append("rect").
  attr("x", (d, i) => 11 + 48 * i).
  attr("y", 0).
  attr("height", 20).
  attr("width", 48).
  style("fill", (d, i) => color[i]);
}