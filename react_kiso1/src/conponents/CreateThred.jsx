import React, { useState } from "react";
import axios from "axios";

function CreateThread() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("https://railway.bulletinboard.techtrain.dev/threads", {
        title: title,
      });
      setMessage("スレッドが作成されました！");
      setTitle("");
    } catch (error) {
      setMessage("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div>
      <h2>新しいスレッドを作成する</h2>
      <form onSubmit={handleSubmit}>
        <label>
          スレッドのタイトル：
          <input type="text" value={title} onChange={handleInputChange} />
        </label>
        <button type="submit">作成する</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateThread;
