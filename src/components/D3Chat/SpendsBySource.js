import React from "react";
import * as d3 from "d3";

const SpendsBySource = ({ data }) => {
  // Group data by source and sum spends
  const attributedSpendData = d3.rollups(
    data,
    (v) => d3.sum(v, (d) => d.spends),
    (d) => d.source
  );

  // Sort data by descending order of spends
  attributedSpendData.sort((a, b) => d3.descending(a[1], b[1]));

  // Create an array of colors for the pie chart
  const color = d3
    .scaleOrdinal()
    .domain(attributedSpendData.map((d) => d[0]))
    .range(d3.schemeCategory10);

  // Create a pie chart layout
  const pie = d3.pie().value((d) => d[1]);

  // Set the radius of the pie chart
  const radius = Math.min(350, 350) / 2;

  // Create an arc generator for the pie chart
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Create an SVG element for the pie chart
  const svg = d3
    .select("#SpendsBySource-chart")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400);

  // Create a group element for the pie chart
  const g = svg
    .append("g")
    .attr("transform", `translate(${radius + 50}, ${radius})`);

  // Create the pie chart slices
  // eslint-disable-next-line
  const slices = g
    .selectAll("path")
    .data(pie(attributedSpendData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data[0]));

  // Add the percentage values inside the pie chart
  // eslint-disable-next-line
  const label = g
    .selectAll("text")
    .data(pie(attributedSpendData))
    .enter()
    .filter((d, i) => i < attributedSpendData.length - 5) // filter out last five labels
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)}) rotate(80)`)
    .attr("dy", "0.35em")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .text(
      (d) =>
        `${(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(1)}%`
    );

  // Add a legend for the pie chart
  const legend = svg
    .append("g")
    .attr("transform", `translate(${radius * 2 + 80}, 50)`)
    .selectAll(".legend")
    .data(pie(attributedSpendData))
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", (d) => color(d.data[0]));

  legend
    .append("text")
    .attr("x", 15)
    .attr("y", 5)
    .attr("dy", "0.35em")
    .attr("font-size", "12px")
    .text((d) => `${d.data[0]}`);

  return (
    <div class="container mt-5 mb-10">
      <h2>Total spends per source</h2>
      <p>
        Total Spends by Source refers to the total amount of money spent on
        different marketing sources (e.g., baseline, direct, tv, radio etc.,).
        Analyzing Total Spends by Source can help businesses identify which
        sources are most cost-effective and adjust marketing budgets
        accordingly. Also the pie chart depicts the value in percentage just to
        visualise which sources has higher percentage of spends.{" "}
      </p>
      <div>
        <div class="text-center" id="SpendsBySource-chart"></div>
      </div>
    </div>
  );
};

export default SpendsBySource;
