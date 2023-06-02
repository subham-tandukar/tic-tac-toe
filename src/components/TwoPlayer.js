import React, { useState, useEffect } from "react";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import $ from "jquery";
import Popup from "./Popup";

function TwoPlayer() {
  const { setGoHome, setMode, userAudio, computerAudio, winAudio, drawAudio } =
    useContext(MainContext);
  const initial = Array(9).fill(null);
  const [board, setBoard] = useState(initial);
  const [player, setPlayer] = useState("X");
  const [number, setNumber] = useState("1");
  const [winningRow, setWinningRow] = useState(null);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const [winnerNumber, setWinnerNumber] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setGoHome(true);
    setMode(false);
    setWin(false);
    setDraw(false);
    setWinner("");
    setWinnerNumber("");
    setPopup(false);
  }, []);

  const winningConditions = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] !== null || winningRow !== null) {
      // User cannot make a move right now
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
    if (player === "X") {
      userAudio.play();
    } else {
      computerAudio.play();
    }
  };

  useEffect(() => {
    const checkWinner = () => {
      let isDraw = true;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          setWinningRow(i);
          setWin(true);
          setWinner(board[a]);
          setPopup(true);
          // setBoard(initial);
        }
      }
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          isDraw = false;
          break;
        }
      }

      if (isDraw) {
        setDraw(true);
        setPopup(true);
        return true;
      }
    };

    checkWinner();
  }, [board]);

  const renderSquare = (index) => {
    const isWinningSquare =
      winningRow !== null && winningConditions[winningRow].includes(index);
    const isX = board[index] === "X";

    return (
      <button
        className={`square ${isWinningSquare ? "winning" : ""} ${
          isX ? "x" : "o"
        }`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  useEffect(() => {
    if (player === "X") {
      setNumber("1");
    } else {
      setNumber("2");
    }
    $(".player").removeClass("animate");
    setTimeout(() => {
      $(".player").addClass("animate");
    }, 0);
  }, [player]);

  useEffect(() => {
    if (winner === "X") {
      setWinnerNumber("1");
    } else {
      setWinnerNumber("2");
    }
  }, [winner]);

  useEffect(() => {
    setTimeout(() => {
      if (popup) {
        $(".modalPopupBg").addClass("show-popup-bg");
        $(".modalPopup").addClass("show-popup");
        if (win) {
          winAudio.play();
        } else if (draw) {
          drawAudio.play();
        }
      }
    }, 1000);
  }, [popup]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <Nav />
          <div className="uk-container">
            <div className="game mt-5">
              <h5>Multi Player</h5>
              {win ? (
                <>
                  <p className="player">
                    {`Player ${winnerNumber} `} (
                    <span className={`${winner === "X" ? "x" : "o"}`}>
                      {`${winner}`}
                    </span>
                    ) won !
                  </p>
                </>
              ) : draw ? (
                <>
                  <p className="player">
                    {" "}
                    <span className="x">DRAW</span> ! No one won
                  </p>
                </>
              ) : (
                <>
                  {player === "X" ? (
                    <p className="player">
                      {`Player ${number} `} (
                      <span className="x">{`${player}`}</span>) turn
                    </p>
                  ) : (
                    <p className="player">
                      {`Player ${number} `} (
                      <span className="o">{`${player}`}</span>) turn
                    </p>
                  )}
                </>
              )}

              <div className="game-board">
                <div
                  className={`board-row ${
                    winningRow === 0 ? "winning-row" : ""
                  }`}
                >
                  {renderSquare(0)}
                  {renderSquare(1)}
                  {renderSquare(2)}
                </div>
                <div
                  className={`board-row ${
                    winningRow === 1 ? "winning-row" : ""
                  }`}
                >
                  {renderSquare(3)}
                  {renderSquare(4)}
                  {renderSquare(5)}
                </div>
                <div
                  className={`board-row ${
                    winningRow === 2 ? "winning-row" : ""
                  }`}
                >
                  {renderSquare(6)}
                  {renderSquare(7)}
                  {renderSquare(8)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <Popup
        winnerNumber={winnerNumber}
        setBoard={setBoard}
        initial={initial}
        setWinningRow={setWinningRow}
        win={win}
        setWin={setWin}
        draw={draw}
        setDraw={setDraw}
        setWinner={setWinner}
        setPopup={setPopup}
        setWinnerNumber={setWinnerNumber}
      />
    </>
  );
}

export default TwoPlayer;
