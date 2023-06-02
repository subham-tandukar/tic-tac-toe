import React from "react";
import Nav from "./Nav";
import bg from "../images/bg.png";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "./context/MainContext";
import { useEffect } from "react";

const Home = () => {
  const { setGoHome, setMode, click } = useContext(MainContext);

  useEffect(() => {
    setGoHome(false);
    setMode(false);
  }, []);
  return (
    <>
      <div className="home content-wrapper">
        <div className="content">
          <Nav />

          <div className="uk-container">
            <div className="uk-flex uk-flex-center@s uk-flex-between uk-flex-middle my-4">
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

            <div className="uk-flex uk-flex-center">
              <div className="buttons mx-2">
                <button
                  className="blob-btn"
                  onClick={() => {
                    setGoHome(true);
                    click.play();
                  }}
                >
                  <Link to="/mode" className="d-flex">
                    Single Player <FaUser className="ms-3" size="1rem" />{" "}
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

              <div className="buttons mx-2">
                <button
                  className="blob-btn multi"
                  onClick={() => {
                    setGoHome(true);
                    click.play();
                  }}
                >
                  <Link to="/two-player" className="d-flex">
                    Multi Player{" "}
                    <FaUserFriends className="ms-3" size="1.5rem" />{" "}
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
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default Home;
