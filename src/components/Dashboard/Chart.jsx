import React, { useEffect, useState } from "react";
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

const Chart = () => {
  const [authorData, setAuthorData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&apiKey=c72a6c6cbc2844708334457fc75ca841`
        );
        const articles = response.data.articles || [];

        const authorCounts = {};
        articles.forEach((article) => {
          const author = article.author || "Unknown";
          authorCounts[author] = (authorCounts[author] || 0) + 1;
        });

        const authorDataArray = Object.entries(authorCounts).map(
          ([author, count]) => ({
            author,
            count,
          })
        );

        setAuthorData(authorDataArray);

        const typeCounts = { news: 0, blogs: 0 };
        articles.forEach((article) => {
          const type = article.source.name.includes("blog") ? "blogs" : "news";
          typeCounts[type] += 1;
        });

        const typeDataArray = Object.entries(typeCounts).map(
          ([type, count]) => ({
            name: type,
            value: count,
          })
        );

        setTypeData(typeDataArray);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Article Trends</h2>

      <h3>Articles by Author</h3>
      <BarChart
        width={600}
        height={300}
        data={authorData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="author" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
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

export default Chart;
