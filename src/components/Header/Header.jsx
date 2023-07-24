import { HashRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieIcon from "@mui/icons-material/Movie";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <h1 className="h1-saga">🎬 &nbsp; The Movies Saga!</h1>
    </div>
  );
}

export default Header;
