import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreatePost() {
  const [newpost, setNewPost] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts?offset=${offset}`,
        {
          title: title,
        }
      );
      setMessage("投稿が作成されました！");
      setPost("");
    } catch (error) {
      setMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="CreateThread_body">
      <h2>新しい投稿を作成する</h2>
      <form onSubmit={handleSubmit}>
        <label>
          スレッドのタイトル：
          <input type="text" value={newpost} onChange={handleInputChange} />
        </label>
        <button type="submit">作成する</button>
      </form>
      <p>{message}</p>
      <Link to={"/"}>
        <button className="to_home_button">ホームに戻る↩︎</button>
      </Link>
    </div>
  );
}

export default CreatePost;
