// import News from "../components/Dashboard/News";
import Filters from "../components/Dashboard/Filters";
import PayoutCalculator from "../components/Dashboard/PayoutCalculator";
import Chart from "../components/Dashboard/Chart";
import ExportData from "../components/Dashboard/ExportData";
import PayoutTable from "../components/Dashboard/PayoutTable";
import React, { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([
    { author: "John Doe", articles: 5, payoutRate: 10, totalPayout: 50 },
    { author: "Jane Smith", articles: 3, payoutRate: 12, totalPayout: 36 },
    { author: "Unknown", articles: 2, payoutRate: 10, totalPayout: 20 },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Filters />
      {/* <News /> */}
      <Chart />
      <PayoutCalculator />
      <PayoutTable />
      <ExportData data={data} filteredData={filteredData} />
    </div>
  );
};

export default Dashboard;
