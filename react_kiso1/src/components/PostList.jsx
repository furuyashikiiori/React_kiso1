import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { threadId } = useParams();

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts?offset=${offset}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "エラーが発生しました");
      }

      if (data && Array.isArray(data.posts)) {
        if (data.posts.length < 10) {
          setHasMore(false);
        }
        setPosts((prevPosts) => {
          const newPosts = data.posts.filter(
            (newPost) =>
              !prevPosts.some((prevPost) => prevPost.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });
        setOffset((prevOffset) => prevOffset + data.posts.length);
      } else {
        console.error("Unexpected data format:", data);
        setError("データの形式が正しくありません");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message || "データの取得中にエラーが発生しました");
    } finally {
      setLoading(false);
      setInitialFetchDone(true);
    }
  }, [threadId, offset, loading, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const loadMore = () => {
    fetchPosts();
  };

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div className="PostList_body">
      <h1>スレッド返信</h1>
      {initialFetchDone && posts.length === 0 ? (
        <p>投稿がありません</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post.id} className="PostList_post">
              <p>{post.post}</p>
            </div>
          ))}
          {loading && <p>Loading...</p>}
          {hasMore && !loading && (
            <button onClick={loadMore}>さらに見る ↓</button>
          )}
        </>
      )}
      <Link to={"/"}>
        <button className="To_home_button">ホームに戻る↩︎</button>
      </Link>
    </div>
  );
}

export default PostList;
