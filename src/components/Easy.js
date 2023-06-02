import React, { useState, useEffect } from "react";
import "../App.css";
import Nav from "./Nav";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import $ from "jquery";
import SinglePopup from "./SinglePopup";

function Easy() {
  const {
    setGoHome,
    setMode,
    userAudio,
    computerAudio,
    winAudio,
    drawAudio,
    loseAudio,
  } = useContext(MainContext);
  const initial = Array(9).fill(null);
  const [board, setBoard] = useState(initial);
  const [player, setPlayer] = useState("X");
  const [winningRow, setWinningRow] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setGoHome(false);
    setMode(true);
    setWin(false);
    setDraw(false);
    setWinner("");
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
    if (!isUserTurn || board[index] !== null || winningRow !== null) {
      // User cannot make a move right now
      return;
    }
    // Play sound based on the turn
    if (isUserTurn) {
      userAudio.play();
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsUserTurn(false);
    setPlayer(player === "X" ? "O" : "X");
    checkWinner(newBoard);
  };

  const checkWinner = (currBoard) => {
    let isDraw = true;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        currBoard[a] &&
        currBoard[a] === currBoard[b] &&
        currBoard[b] === currBoard[c]
      ) {
        setWinningRow(i);
        setWin(true);
        setPopup(true);
        if (currBoard[a] === "X") {
          setWinner(currBoard[a]);
        } else {
          setWinner("O");
        }
        return true;
      }
    }

    for (let i = 0; i < currBoard.length; i++) {
      if (currBoard[i] === null) {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      setDraw(true);
      setPopup(true);
      return true;
    }

    return false;
  };

  const botMove = () => {
    if (!checkWinner(board)) {
      const newBoard = [...board];
      let moveMade = false;
      while (!moveMade) {
        const randomIndex = Math.floor(Math.random() * newBoard.length);
        if (newBoard[randomIndex] === null) {
          newBoard[randomIndex] = "O";
          moveMade = true;
          setIsUserTurn(true);
          setBoard(newBoard);
          setPlayer("X");
          checkWinner(newBoard);
          computerAudio.play();
        }
      }
    }
  };

  useEffect(() => {
    if (!isUserTurn) {
      setTimeout(() => {
        botMove();
      }, 1000);
    }
  }, [isUserTurn, win, draw]);

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
    $(".player").removeClass("animate");
    setTimeout(() => {
      $(".player").addClass("animate");
    }, 0);
  }, [player]);

  useEffect(() => {
    setTimeout(() => {
      if (popup) {
        $(".singlePopupBg").addClass("show-popup-bg");
        $(".singlePopup").addClass("show-popup");

        if (winner === "X") {
          winAudio.play();
        } else if (winner === "O") {
          loseAudio.play();
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
              <h5>
                Single Player <span className="x">(Mode : Easy)</span>{" "}
              </h5>
              {win ? (
                <>
                  <p className="player">
                    <span className={`${winner === "X" ? "b" : "r"}`}>
                      {`${winner === "X" ? "You won !" : "You Lost !"}`}
                    </span>
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
                    <p className="player b">Your turn</p>
                  ) : (
                    <p className="player r">Computer's turn</p>
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
      <SinglePopup
        setBoard={setBoard}
        initial={initial}
        setWinningRow={setWinningRow}
        winner={winner}
        setWin={setWin}
        draw={draw}
        setDraw={setDraw}
        setWinner={setWinner}
        setPopup={setPopup}
      />
    </>
  );
}

export default Easy;
