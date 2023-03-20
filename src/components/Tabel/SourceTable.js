import React, { useState, useEffect } from "react";

function SourceTable() {
  const [sources, setSources] = useState([]);
  const [optimisationTargets, setOptimisationTargets] = useState([]);
  const [type, setType] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [revenueData, setRevenueData] = useState([]);
  const [conversionsData, setConversionsData] = useState([]);
  const [spendsData, setSpendsData] = useState([]);

  useEffect(() => {
    console.log("Fetching sources...");
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Sources fetched:", data);
        const uniqueSources = [...new Set(data.map((d) => d.source))];
        setSources(uniqueSources);
      });
  }, []);

  useEffect(() => {
    console.log("Fetching optimisation targets...");
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("optimisation targets fetched:", data);
        const Target = [...new Set(data.map((d) => d.optimisation_target))];
        setOptimisationTargets(Target);
      });
  }, []);

  useEffect(() => {
    console.log("Fetching type...");
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("type:", data);
        const Type = [...new Set(data.map((d) => d.type))];
        setType(Type);
      });
  }, []);

  useEffect(() => {
    if (selectedSource === "" && selectedTarget === "" && selectedType === "") {
      fetch(`http://localhost:3000/data`)
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
          console.log("check", revenueByMonth);
        });
    }
  }, [selectedSource, selectedTarget, selectedType]);

  useEffect(() => {
    if (selectedSource) {
      fetch(`http://localhost:3000/data/source/${selectedSource}`)
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedSource]);

  useEffect(() => {
    if (selectedTarget) {
      fetch(`http://localhost:3000/data/target/${selectedTarget}`)
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedTarget]);

  useEffect(() => {
    if (selectedType) {
      fetch(`http://localhost:3000/data/type/${selectedType}`)
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedSource && selectedTarget) {
      fetch(
        `http://localhost:3000/data/source/${selectedSource}/target/${selectedTarget}`
      )
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedSource, selectedTarget]);

  useEffect(() => {
    if (selectedTarget && selectedType) {
      fetch(
        `http://localhost:3000/data/target/${selectedTarget}/type/${selectedType}`
      )
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedTarget, selectedType]);

  useEffect(() => {
    if (selectedSource && selectedType) {
      fetch(
        `http://localhost:3000/data/source/${selectedSource}/type/${selectedType}`
      )
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedSource, selectedType]);

  useEffect(() => {
    if (selectedSource && selectedTarget && selectedType) {
      fetch(
        `http://localhost:3000/data/source/${selectedSource}/target/${selectedTarget}/type/${selectedType}`
      )
        .then((response) => response.json())
        .then((data) => {
          const revenueByMonth = [];
          const conversionsByMonth = [];
          const spendsByMonth = [];
          for (let month = 6; month <= 11; month++) {
            const monthData = data.filter(
              (d) => new Date(d.date).getMonth() === month - 1
            );
            const revenueForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_revenue,
              0
            );
            revenueByMonth.push(revenueForMonth);
            const conversionsForMonth = monthData.reduce(
              (acc, d) => acc + d.attributed_conversions,
              0
            );
            conversionsByMonth.push(conversionsForMonth);
            const spendsForMonth = monthData.reduce(
              (acc, d) => acc + d.spends,
              0
            );
            spendsByMonth.push(spendsForMonth);
          }
          setRevenueData(revenueByMonth);
          setConversionsData(conversionsByMonth);
          setSpendsData(spendsByMonth);
        });
    }
  }, [selectedSource, selectedTarget, selectedType]);

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleTargetChange = (event) => {
    setSelectedTarget(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleClearAll = () => {
    setSelectedSource("");
    setSelectedTarget("");
    setSelectedType("");
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">
        Ad campaign performance based on source, optimisation target and type
      </h2>
      <p>
        In the given data, there are 15 sources, 2 optimisation targets and 2
        types, there are three parameters also used as a filters for the table
        data below . In the table below the monthly data depicts the monthly
        performance of Ad campaign such as Attributed Revenue, Attributed
        conversions and spends for the various combinations of filters used.{" "}
      </p>

      <p>
        For the different combination of filters, the data in the table
        dynamically changes which will allow the consumer of this web page to
        get a better visualisation of the data for different combination.{" "}
      </p>
      <div className="my-5 card shadow">
        <div className="row mx-auto">
          <div className="col-md-3 mt-4">
            <label htmlFor="source-dropdown" className="form-label">
              Select Source:
            </label>
            <select
              id="source-dropdown"
              className="form-select mb-3"
              value={selectedSource}
              onChange={handleSourceChange}
            >
              <option value="">--Select Source--</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mt-4">
            <label htmlFor="target-dropdown" className="form-label">
              Select optimisation Target:
            </label>
            <select
              id="target-dropdown"
              className="form-select mb-3"
              value={selectedTarget}
              onChange={handleTargetChange}
            >
              <option value="">--Select Target--</option>
              {optimisationTargets.map((target) => (
                <option key={target} value={target}>
                  {target}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mt-4">
            <label htmlFor="type-dropdown" className="form-label">
              Select Type:
            </label>
            <select
              id="type-dropdown"
              className="form-select mb-3"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">--Select Type--</option>
              {type.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mt-4">
            <button className="clear-all-button" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
          <div className="col-md-15 mt-3">
            <h2>Performance Data by Months</h2>
            <div className="table-responsive m-3">
              <table className="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th></th>
                    {revenueData.map((revenue, index) => (
                      <th key={index}>{`Month ${index + 6}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: "#BFE9FF" }}>
                    <td>Attributed Revenue</td>
                    {revenueData.map((revenue, index) => (
                      <td key={index}>{revenue.toFixed(2)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Attributed Conversions</td>
                    {conversionsData.map((conversions, index) => (
                      <td key={index}>{conversions.toFixed(2)}</td>
                    ))}
                  </tr>
                  <tr style={{ backgroundColor: "#BFE9FF" }}>
                    <td>Spends</td>
                    {spendsData.map((spends, index) => (
                      <td key={index}>{spends.toFixed(2)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="m-3">
          <h2>Performance Data Summary</h2>
          <ul>
            <li>
              <strong>Attributed Revenue:</strong> The total revenue attributed
              to the selected{" "}
              {selectedSource ? `source ${selectedSource}` : "all sources"},{" "}
              {selectedTarget ? `target ${selectedTarget}` : "all targets"},{" "}
              {selectedType ? `type ${selectedType}` : "all types"} over the
              past six months is{" "}
              {revenueData.reduce((acc, curr) => acc + curr, 0).toFixed(2)}.
            </li>
            <li>
              <strong>Attributed Conversions:</strong> The total number of
              conversions attributed to the selected{" "}
              {selectedSource ? `source ${selectedSource}` : "all sources"},{" "}
              {selectedTarget ? `target ${selectedTarget}` : "all targets"},{" "}
              {selectedType ? `type ${selectedType}` : "all types"} over the
              past six months is{" "}
              {conversionsData.reduce((acc, curr) => acc + curr, 0).toFixed(2)}.
            </li>
            <li>
              <strong>Spends:</strong> The total amount spent on the selected{" "}
              {selectedSource ? `source ${selectedSource}` : "all sources"},{" "}
              {selectedTarget ? `target ${selectedTarget}` : "all targets"},{" "}
              {selectedType ? `type ${selectedType}` : "all types"} over the
              past six months is{" "}
              {spendsData.reduce((acc, curr) => acc + curr, 0).toFixed(2)}.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SourceTable;
