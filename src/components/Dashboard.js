import React, { useState, useEffect } from "react";
import axios from "axios";
import RevenueChartOverAll from "./D3Chat/RevenueChartOverAll";
import ConversionsChartOverAll from "./D3Chat/ConversionsChartOverAll";
import SpendsBySource from "./D3Chat/SpendsBySource";
import SourceTable from "./Tabel/SourceTable";
import ProjectSummary from "./ProjectSummary";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/data");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Display a message to the user
        alert("Failed to fetch data. Please run the backend of the project.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-light">
      <header className="bg-dark text-light">
        <div className="container">
          <h1 className="text-center">Ad Campaign Performance Dashboard</h1>
        </div>
      </header>
      <div>
        <ProjectSummary />
      </div>
      <div>
        <SourceTable />
      </div>
      <div className="border-top my-3">
        <RevenueChartOverAll data={data} />
      </div>
      <div className="border-top my-3">
        <ConversionsChartOverAll data={data} />
      </div>
      <div className="border-top my-3">
        <SpendsBySource data={data} />
      </div>
      <footer className="bg-dark text-light text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; Harrshini</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
