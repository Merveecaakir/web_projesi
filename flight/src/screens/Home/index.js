import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Col, Container, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoCalendar } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

export const Home = () => {
  const navigate = useNavigate();

  const flights = useSelector((state) => state.flight.airports);
  const [airport, setAirport] = useState();
  const [arriveAirport, setArriveAirport] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const goDetail = () => {
    navigate({
      pathname: `/flights/${startDate}`,
      search: `?departurePlace=${airport}&arrivalPlace=${arriveAirport}`,
    });
  };

  return (
    <div className="home">
      <div className="home__img" />
      <Container>
        <Row className="home__top align-items-center">
          <Col className="d-flex flex-column">
            <p className="home__title">
              Explore <br />
              The World
            </p>
            <p className="home__text">
              You can create a Custom Trip.Search Our Lowest Fares to <br />
              Your Favorite Destinations.Find a better way to travel{" "}
            </p>

            <Row className="home__select-container gap-1">
              <Col>
                <Row className=" mt-3 gap-2">
                  <Col className="home__select" md={3}>
                    <img src={require("../../assets/select-1.png")} />
                    <select
                      value={airport}
                      onChange={(e) => {
                        setAirport(e.target.value);
                      }}
                    >
                      <option key="blankChoice" hidden value>
                        {" "}
                        Kalkış Yeri seçiniz{" "}
                      </option>
                      {flights.map((item, index) => (
                        <option key={index} value={item.key}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col className="home__select" md={3}>
                    <img src={require("../../assets/select-2.png")} />
                    <select
                      value={arriveAirport}
                      onChange={(e) => {
                        setArriveAirport(e.target.value);
                      }}
                    >
                      <option key="blankChoice" hidden value>
                        {" "}
                        Varış Yeri seçiniz{" "}
                      </option>
                      {flights
                        .filter((value) => value.name !== airport)
                        .map((item) => (
                          <option value={item.key}>{item.name}</option>
                        ))}
                    </select>
                  </Col>
                  <Col className="home__select" md={4}>
                    <div>
                      <GoCalendar size={24} color="#6a79b9cc" />
                    </div>
                    <DatePicker
                      placeholderText="Gidiş"
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        console.log(date);
                        setStartDate(date);
                      }}
                    />
                  </Col>
                  <Col md={1} className="d-flex justify-content-center">
                    <Button
                      onClick={goDetail}
                      className="home__button border-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(8deg, #9932f5 0%, #4933f1 53%, #4950f8 70%, #496cfe 100%)",
                        height: "50px",
                        width: "50px",
                      }}
                    >
                      <AiOutlineSearch size={24} />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="content text-center">
          <p className="content__title">Neden Bizi Seçmelisiniz</p>
          <p className="content__sub-title">Temel Değerlerimiz</p>
          <Row
            className="home__boxes gap-5 m-0 mt-5 justify-content-center"
            noGutters={true}
            xs={1}
            md={3}
          >
            <Col className="home__box d-flex justify-content-center align-items-center flex-column">
              <img src={require("../../assets/box-1.png")} />
              <p>Güvenli Uçuş</p>
              <span>En güvenli uçaklarla uçuş keyfine varın.</span>
            </Col>
            <Col className="home__box  d-flex justify-content-center align-items-center flex-column">
              <img src={require("../../assets/box-2.png")} />
              <p>Uygun Fiyatlar</p>
              <span>Fiyaları uygun olan seferlerle istediğiniz yere gidin</span>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
