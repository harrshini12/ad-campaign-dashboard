import React from "react";
import * as d3 from "d3";

const RevenueChartOverAll = ({ data }) => {
  // Filter the data by source for conversion optimisation target
  const filteredDataForConversion = data.filter((item) => {
    return item.optimisation_target === "conversions";
  });

  // Filter the data by source for revenue optimisation target
  const filteredDataForRevenue = data.filter((item) => {
    return item.optimisation_target === "revenue";
  });

  // Bar chart to display total revenue by source for both optimisation target
  const revenueDataForConversion = d3.rollup(
    filteredDataForConversion,
    (v) => d3.sum(v, (d) => d.attributed_revenue),
    (d) => d.source
  );
  const revenueDataForRevenue = d3.rollup(
    filteredDataForRevenue,
    (v) => d3.sum(v, (d) => d.attributed_revenue),
    (d) => d.source
  );

  const margin = { top: 120, right: 140, bottom: 200, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 700 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(revenueDataForConversion.keys())
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      0,
      d3.max([
        ...revenueDataForConversion.values(),
        ...revenueDataForRevenue.values(),
      ]),
    ]);

  const color = d3
    .scaleOrdinal()
    .domain(["revenueDataForConversion", "revenueDataForRevenue"])
    .range(["lightRed", "lightBlue"]);

  const xAxis = d3
    .axisBottom(x)
    .tickFormat((d) => d)
    .tickPadding(10)
    .tickSizeOuter(0);

  const yAxis = d3.axisLeft(y).tickFormat((d) => `${d}`);

  const svg = d3
    .select("#revenue-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-60)")
    .style("text-anchor", "end");

  svg.append("g").attr("class", "y-axis").call(yAxis);

  svg
    .selectAll(".revenue-bar-forConversion")
    .data(revenueDataForConversion.entries())
    .enter()
    .append("rect")
    .attr("class", "revenue-bar-forConversion")
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(d[1]))
    .attr("width", x.bandwidth() / 2)
    .attr("height", (d) => height - y(d[1]))
    .style("fill", color("revenueDataForConversion"));

  // Add revenue numbers on top of the bars for revenueDataForConversion
  svg
    .selectAll(".revenueDataForConversionLabel")
    .data(revenueDataForConversion.entries())
    .enter()
    .append("text")
    .attr("class", "revenueDataLabel")
    .attr("x", (d) => x(d[0]) + x.bandwidth() / 2)
    .attr("y", (d) => y(d[1]) - 10)
    .attr("font-size", "12px")
    .attr(
      "transform",
      (d) => `rotate(-90 ${x(d[0]) + x.bandwidth() / 2},${y(d[1]) - 5})`
    )
    .text((d) => `${d[1].toFixed(2)}`);

  svg
    .selectAll(".revenue-bar-forRevenue")
    .data(revenueDataForRevenue.entries())
    .enter()
    .append("rect")
    .attr("class", "revenue-bar-forRevenue")
    .attr("x", (d) => x(d[0]) + x.bandwidth() / 2)
    .attr("y", (d) => y(d[1]))
    .attr("width", x.bandwidth() / 2)
    .attr("height", (d) => height - y(d[1]))
    .style("fill", color("revenueDataForRevenue"));

  // Add revenue numbers on top of the bars for revenueDataForRevenue
  svg
    .selectAll(".revenueDataForRevenueLabel")
    .data(revenueDataForRevenue.entries())
    .enter()
    .append("text")
    .attr("class", "revenueDataForRevenueLabel")
    .attr("x", (d) => x(d[0]) + x.bandwidth() - x.bandwidth() / 4)
    .attr("y", (d) => y(d[1]) - 1)
    .attr("font-size", "12px")
    .attr(
      "transform",
      (d) =>
        `rotate(-90 ${x(d[0]) + x.bandwidth() - x.bandwidth() / 4},${
          y(d[1]) - 5
        })`
    )
    .text((d) => `${d[1].toFixed(2)}`);

  // Add x-axis label
  svg
    .append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2 - 40)
    .attr("y", height + margin.top + 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text("source");

  // Add y-axis label
  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .text("attributed_revenue");

  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 150}, 10)`);

  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 210)
    .attr("height", 50)
    .style("fill", "white")
    .style("stroke", "black");

  legend
    .append("rect")
    .attr("x", 5)
    .attr("y", 25)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", color("revenueDataForConversion"));

  legend
    .append("text")
    .attr("x", 30)
    .attr("y", 40)
    .attr("font-size", "12px")
    .text("optimisation_target Conversion");

  legend
    .append("rect")
    .attr("x", 5)
    .attr("y", 5)
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", color("revenueDataForRevenue"));

  legend
    .append("text")
    .attr("x", 30)
    .attr("y", 20)
    .attr("font-size", "12px")
    .text("optimisation_target Revenue");

  return (
    <div class="container mt-5 mb-10">
      <h2>Revenue per source</h2>
      <p>
        For revenue optimisation, analyzing Total Revenue by Source helps
        identify the most profitable sources and adjust marketing strategies
        accordingly. For conversion optimisation, understanding Total Revenue by
        Source can help identify sources with high conversion rates and allocate
        resources to improve conversions on lower-performing sources.
      </p>
      <div class="text-center" id="revenue-chart"></div>
    </div>
  );
};

export default RevenueChartOverAll;
