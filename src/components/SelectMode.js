import React from "react";
import Nav from "./Nav";
import bg from "../images/bg.png";
import { ImEvil2 } from "react-icons/im";
import { FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import { useEffect } from "react";

const SelectMode = () => {
  const { setGoHome, setMode, click } = useContext(MainContext);

  useEffect(() => {
    setGoHome(true);
    setMode(false);
  }, []);
  return (
    <>
      <div className="home content-wrapper">
        <div className="content">
          <Nav />

          <div className="uk-container">
            <div className="uk-flex uk-flex-center@s uk-flex-between uk-flex-middle mt-4 mb-1">
              <div>
                <h1>X</h1>
              </div>
              <div>
                <img src={bg} alt="" className="my-5 home-img" />
              </div>
              <div>
                <h2>O</h2>
              </div>
            </div>

            <>
              <div>
                <h3 className="m-0 mb-3 text-center">Select Mode</h3>
              </div>
              <div className="uk-flex uk-flex-center ">
                <div className="buttons m-0">
                  <button
                    className="blob-btn mode-btn"
                    onClick={() => {
                      setMode(true);
                      click.play();
                    }}
                  >
                    <Link to="/easy" className="d-flex">
                      Easy <FaSmile className="ms-3" size="1rem" />{" "}
                    </Link>
                    <span className="blob-btn__inner">
                      <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                      </span>
                    </span>
                  </button>
                  <br />

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur
                          in="SourceGraphic"
                          result="blur"
                          stdDeviation="10"
                        ></feGaussianBlur>
                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                          result="goo"
                        ></feColorMatrix>
                        <feBlend
                          in2="goo"
                          in="SourceGraphic"
                          result="mix"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>

                <div className="buttons m-0">
                  <button
                    className="blob-btn mode-btn"
                    onClick={() => {
                      setMode(true);
                      click.play();
                    }}
                  >
                    <Link to="/hard" className="d-flex">
                      Hard <ImEvil2 className="ms-3" size="1rem" />{" "}
                    </Link>
                    <span className="blob-btn__inner">
                      <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                      </span>
                    </span>
                  </button>
                  <br />

                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur
                          in="SourceGraphic"
                          result="blur"
                          stdDeviation="10"
                        ></feGaussianBlur>
                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                          result="goo"
                        ></feColorMatrix>
                        <feBlend
                          in2="goo"
                          in="SourceGraphic"
                          result="mix"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default SelectMode;
