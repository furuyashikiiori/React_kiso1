import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h3>掲示板</h3>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/threads/new">スレッド作成</Link>
          </li>
          {/* <li>
            <Link to="/threads/:thread_id">投稿作成</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
