import React from "react";
import "../App.css";

const History = ({ history, search }) => {
  return (
    <div className="history-container">
      <h3>Recent Searches:</h3>
      <div className="history-buttons">
        {history.length > 0 ? (
          history.map((item, index) => (
            <button key={index} className="history-button" onClick={() => search(item)}>
              {item}
            </button>
          ))
        ) : (
          <p className="no-history">No recent searches</p>
        )}
      </div>
    </div>
  );
};

export default History;
