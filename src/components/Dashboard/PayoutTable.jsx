import React, { useState, useEffect } from "react";
import axios from "axios";

const PayoutTable = () => {
  const [articles, setArticles] = useState([]);
  const [authorPayouts, setAuthorPayouts] = useState({});
  const [payoutRate, setPayoutRate] = useState(10);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&apiKey=c72a6c6cbc2844708334457fc75ca841`
        );
        const fetchedArticles = response.data.articles || [];

        const payouts = {};
        fetchedArticles.forEach((article) => {
          const author = article.author || "Unknown";
          if (!payouts[author]) {
            payouts[author] = { articles: 0, payout: 0 };
          }
          payouts[author].articles += 1;
          payouts[author].payout += payoutRate;
        });

        setArticles(fetchedArticles);
        setAuthorPayouts(payouts);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [payoutRate]);

  const handlePayoutRateChange = (author, newRate) => {
    const updatedPayouts = { ...authorPayouts };
    updatedPayouts[author].payout = updatedPayouts[author].articles * newRate;
    setAuthorPayouts(updatedPayouts);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Payout Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Author
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Articles
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Payout Rate ($)
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Total Payout ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(authorPayouts).map(([author, data]) => (
            <tr key={author} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {author}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {data.articles}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <input
                  type="number"
                  value={data.payout / data.articles || payoutRate}
                  onChange={(e) =>
                    handlePayoutRateChange(
                      author,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  style={{ padding: "5px", width: "80px" }}
                />
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {data.payout.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
export default PayoutTable;
