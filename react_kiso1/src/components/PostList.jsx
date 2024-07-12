import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { threadId } = useParams();
  const location = useLocation();
  const threadTitle = location.state?.title || "スレッド";

  const [newpost, setNewPost] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
        {
          post: newpost,
        }
      );
      setMessage("投稿が作成されました！");
      setNewPost("");
      window.location.reload();
    } catch (error) {
      setMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

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
      <h1 className="PostList_threadtitle">{threadTitle}</h1>{" "}
      {/* ここにタイトルを表示 */}
      <h2>スレッド投稿一覧 ⇩</h2>
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
      <div className="CreatePost_body">
        <h2>新しい投稿を作成する</h2>
        <form onSubmit={handleSubmit} className="CreatePostForm">
          <label>
            投稿の内容：
            <input type="text" value={newpost} onChange={handleInputChange} />
          </label>
          <button type="submit">作成する</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default PostList;
