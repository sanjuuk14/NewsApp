import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const PayoutVisualization = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [payoutPerArticle, setPayoutPerArticle] = useState(10);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles || []);
        setFilteredArticles(response.data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const { author, type, startDate, endDate } = filters;
    const filtered = articles.filter((article) => {
      const articleDate = new Date(article.publishedAt);
      const isWithinDateRange =
        (!startDate || articleDate >= new Date(startDate)) &&
        (!endDate || articleDate <= new Date(endDate));
      const matchesAuthor = author
        ? article.author?.toLowerCase().includes(author.toLowerCase())
        : true;
      const matchesType = type
        ? article.source.name?.toLowerCase().includes(type.toLowerCase())
        : true;

      return isWithinDateRange && matchesAuthor && matchesType;
    });

    setFilteredArticles(filtered);
  }, [filters, articles]);

  const totalPayout = filteredArticles.length * payoutPerArticle;

  const chartData = filteredArticles.map((article) => ({
    name: article.author || "Unknown",
    payout: payoutPerArticle,
  }));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payout Visualization</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Filter by author"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="date"
          placeholder="Start Date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input
          type="date"
          placeholder="End Date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          style={{ padding: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Total Payout: ${totalPayout}</h3>
        <label>
          Payout per Article/Blog:{" "}
          <input
            type="number"
            value={payoutPerArticle}
            onChange={(e) => setPayoutPerArticle(Number(e.target.value))}
            style={{ padding: "5px", width: "80px", marginLeft: "10px" }}
          />
        </label>
      </div>

      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="payout" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
};

export default PayoutVisualization;
