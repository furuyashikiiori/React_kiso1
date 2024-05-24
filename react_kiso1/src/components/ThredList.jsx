import React, { useState, useEffect } from "react";

function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    async function fetchThreads() {
      try {
        const response = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads"
        );
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    }

    fetchThreads();
  }, []);

  return (
    <div>
      {threads.length > 0 ? (
        threads.map((thread) => (
          <div key={thread.id}>
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ThreadList;
