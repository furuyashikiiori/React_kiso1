import React, { useState, useEffect } from "react";

function ThreadList() {
  const [threads, setThreads] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchThreads() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`
        );
        const data = await response.json();
        if (data.length < 10) {
          setHasMore(false);
        }
        setThreads((prevThreads) => [...prevThreads, ...data]);
      } catch (error) {
        console.error("Error fetching threads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchThreads();
  }, [offset]);

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  return (
    <div>
      <h1>新着スレッド</h1>
      {threads.map((thread) => (
        <div key={thread.id} className="thread">
          <div className="thread-content">
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button className="Load_button" onClick={loadMore}>
          さらに見る ↓
        </button>
      )}
    </div>
  );
}

export default ThreadList;
