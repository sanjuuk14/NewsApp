import React from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ExportData = ({ data, filteredData }) => {
  // Generate headers for CSV
  const headers = [
    { label: "Author", key: "author" },
    { label: "Articles", key: "articles" },
    { label: "Payout Rate ($)", key: "payoutRate" },
    { label: "Total Payout ($)", key: "totalPayout" },
  ];

  // Prepare CSV data
  const csvData = filteredData.map((item) => ({
    author: item.author,
    articles: item.articles,
    payoutRate: item.payoutRate,
    totalPayout: item.totalPayout,
  }));

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Report", 20, 10);

    const tableData = filteredData.map((item) => [
      item.author,
      item.articles,
      item.payoutRate,
      item.totalPayout,
    ]);

    doc.autoTable({
      head: [["Author", "Articles", "Payout Rate ($)", "Total Payout ($)"]],
      body: tableData,
    });

    doc.save("payout_report.pdf");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Export Data</h2>
      <div style={styles.buttonContainer}>
        <CSVLink
          data={csvData}
          headers={headers}
          filename="payout_report.csv"
          className="export-button"
          style={styles.button}
        >
          Export to CSV
        </CSVLink>

        <button onClick={exportToPDF} style={styles.button}>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};

export default ExportData;
