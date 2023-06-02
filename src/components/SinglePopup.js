import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import $ from "jquery";
import { Link } from "react-router-dom";
import { useState } from "react";
import View from "./View";
import { useContext } from "react";
import MainContext from "./context/MainContext";

const SinglePopup = ({
  setBoard,
  initial,
  setWinningRow,
  setWin,
  setDraw,
  setWinner,
  setPopup,
  draw,
  winner,
}) => {
  const { click } = useContext(MainContext);
  const [view, setView] = useState(false);
  const handleRe = () => {
    $(".singlePopupBg").removeClass("show-popup-bg");
    $(".singlePopup").removeClass("show-popup");
    setBoard(initial);
    setWinningRow(null);
    setWin(false);
    setDraw(false);
    setWinner("");
    setPopup(false);
    click.play();
  };

  const handleView = () => {
    $(".singlePopupBg").removeClass("show-popup-bg");
    $(".singlePopup").removeClass("show-popup");
    setView(true);
    click.play();
  };

  const handleShowView = () => {
    $(".singlePopupBg").addClass("show-popup-bg");
    $(".singlePopup").addClass("show-popup");
    setView(false);
  };

  return (
    <>
      <section className="popup-bg singlePopupBg">
        <div className="popup singlePopup">
          <div className="popup-body">
            {winner === "X" ? (
              <p>You Won! 🎊</p>
            ) : winner === "O" ? (
              <p className="r">You Lost!</p>
            ) : draw ? (
              <p>Try again! It's a draw.</p>
            ) : (
              ""
            )}
          </div>
          <div className="popup-footer mt-5">
            <button className="uk-button" onClick={() => click.play()}>
              <Link to="/home">
                <FaHome color="#fff" size="2rem" uk-tooltip="Home" />
              </Link>
            </button>
            <button
              className="uk-button"
              uk-tooltip="Restart"
              onClick={handleRe}
            >
              <AiOutlineReload size="2rem" />
            </button>
            <button
              className="uk-button"
              uk-tooltip="View"
              onClick={handleView}
            >
              <MdRemoveRedEye size="2rem" />
            </button>
          </div>
          <div className="overlay"></div>
        </div>
      </section>
      {view && <View handleShowView={handleShowView} />}
    </>
  );
};

export default SinglePopup;
