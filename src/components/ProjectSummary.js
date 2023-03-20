import React from "react";

const ProjectSummary = () => {
  return (
    <div class="container mt-5 py-5">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="card-title mb-4">Project Description</h2>
          <p class="card-text">
            This project involves the creation of a web-based dashboard to
            visualize and analyze the performance data of an advertising
            campaign for six months from June to November in 2022. The dataset
            provides information about the campaign's performance in terms of
            attributed conversions, attributed revenue, total spend on
            advertising, and other metrics for each source and optimisation
            target.
          </p>
          <p class="card-text">
            The Ad Campaign Performance Dashboard will provide users with an
            interactive and visually appealing interface to explore and analyze
            this data. Users will be able to filter source, optimisation target,
            and type to know the average of attributed conversions, attributed
            revenue, and total spend. The dashboard will display bar charts, pie
            charts, and other visualizations to show trends and patterns in the
            data, as well as summary statistics and key performance indicators.
          </p>
          <p class="card-text">
            The goal of this project is to help potential customers understand
            the performance of their advertising campaigns and make data-driven
            decisions to optimize their campaigns for better results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
