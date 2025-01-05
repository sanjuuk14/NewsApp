import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const Filters = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles || []);
        const fetchedArticles = response.data.articles || [];
        setFilteredArticles(response.data.articles || []);
        setTotalArticles(fetchedArticles.length);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        (article.author && article.author.toLowerCase().includes(query))
    );

    setFilteredArticles(filtered);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>News Articles</h2>

      <input
        type="text"
        placeholder="Search articles by title or author..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      <div style={styles.totalArticles}>
        <h3>Total Articles/Blogs Fetched: {totalArticles}</h3>
      </div>

      {filteredArticles.length > 0 ? (
        filteredArticles.map((article, index) => (
          <div key={index} style={styles.articleContainer}>
            <h3 style={styles.articleTitle}>{article.title}</h3>
            <p style={styles.articleInfo}>
              By {article.author || "Unknown"} on{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p style={styles.articleDescription}>{article.description}</p>
          </div>
        ))
      ) : (
        <p>No articles found for "{searchQuery}".</p>
      )}
    </div>
  );
};

// Inline styles
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
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  totalArticles: {
    padding: "15px",
    backgroundColor: "#e9e9e9",
    borderRadius: "5px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  articleContainer: {
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  articleTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  articleInfo: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "10px",
  },
  articleDescription: {
    fontSize: "16px",
    color: "#555",
  },
};

export default Filters;
