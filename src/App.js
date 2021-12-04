import "./styles.css";
import { useState } from "react";
import DatePicker from "react-date-picker";

function App() {
  const [dob, setDob] = useState(new Date());
  const [luckynum, setLuckynum] = useState();
  const [result, setResult] = useState("");

  const checkLucky = (e) => {
    let date = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(dob);
    let sum = date // 04/12/2021
      .split("/") // ["04", "12", "2021"]
      .join("") // "04122021"
      .split("") // ["0", "4", "1", ...]
      .map(Number) // [0, 4, 1, ...]
      .reduce((a, b) => a + b, 0);
    if (luckynum != undefined && luckynum != "") {
      console.log(luckynum);
      if (sum % luckynum === 0) {
        setResult("Congratulations. Your birthday is lucky!");
      } else {
        setResult("Maybe your birthday isn't lucky, but you are :)");
      }
    }
  };

  const restrictToNumbers = (e) => {
    const re = /^[0-9.]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setLuckynum(e.target.value);
    } else {
      setLuckynum(0);
    }
  };

  return (
    <div className="App">
      <div className="app__title">Is your birthday lucky?</div>
      <div className="app__subtitle">Date of Birth:</div>
      <DatePicker
        allowClear={false}
        className="lucky__inputname lucky__input"
        locale="en-IN"
        showLeadingZeros={true}
        clearIcon={false}
        onChange={setDob}
        value={dob}
        maxDate={new Date()}
      />
      <div className="app__subtitle">Lucky Number:</div>
      <input
        id="amount"
        value={luckynum}
        className="lucky__inputname lucky__input"
        onChange={restrictToNumbers}
      />
      <input
        type="submit"
        className="lucky__inputname lucky__submit"
        value="Check"
        onClick={checkLucky}
      />
      {result != "" && (
        <div>
          <div className="app__resultlabel">{result}</div>
          <marquee
            direction="down"
            width="300"
            height="200"
            behavior="alternate"
          >
            <marquee behavior="alternate">
              <img height="100" src="lucky.gif" alt="" />
            </marquee>
          </marquee>
        </div>
      )}
      <div className="footer">
        <div>
          Made by <a href="https://rohit.xyz">Rohit Gaur</a> with{" "}
          <i className="fab fa-react"></i> and <i className="fa fa-heart"></i>
        </div>
        <div className="privacy">
          <div className="privacy-hover">We do not store any data</div>
          Privacy Notice
        </div>
      </div>
    </div>
  );
}

export default App;
