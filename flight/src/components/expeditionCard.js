import React, { useEffect, useMemo, useState } from "react";
import "./expeditionCard.scss";
import {
  Accordion,
  Row,
  Col,
  Stack,
  Card,
  useAccordionButton,
  Button,
  Placeholder,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatValue } from "react-currency-input-field";
import { useNavigate } from "react-router";

function CustomToggle({ children, eventKey, ...props }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Button
      size="sm"
      style={{
        padding: "8px",
        borderRadius: "10px",
        background:
          "linear-gradient(35deg, #9932f5 0%, #4933f1 53%, #4950f8 70%, #496cfe 100%)",
      }}
      onClick={decoratedOnClick}
      {...props}
    >
      {children}
    </Button>
  );
}
export const ExpeditionCard = ({ item, index, showFooter = true }) => {
  const airports = useSelector((state) => state.flight.airports);
  const companies = useSelector((state) => state.flight.companies);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPlaceHolder, setShowPlaceHolder] = useState(true);
  const navigate = useNavigate();
  const seatClick = (value, index) => {
    if (selectedSeats.find((item) => item.id === value)) {
      const filteredArr = selectedSeats.filter((item) => item.id !== value);
      setSelectedSeats(filteredArr);
    } else {
      if (selectedSeats.length >= 4) {
        toast.error("4 ten fazla koltuk seçemezsiniz");
        return;
      }

      setSelectedSeats((prevState) => [...prevState, { id: value, index }]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPlaceHolder(false);
    }, 1000);
  }, []);

  const goCheckout = () => {
    navigate({
      pathname: `/checkout/${item.id}`,
      search: `?selectedSeats=${selectedSeats.map((item) => item.index)}`,
    });
  };
  const differenceTime = (date1, date2) => {
    if (differenceInHours(date1, date2) < 1) {
      return `${differenceInMinutes(date1, date2)}m`;
    }
    return `${differenceInHours(date1, date2)}h${differenceInMinutes(
      date1,
      date2
    )}m`;
  };

  const foundedCode = (name) => {
    return airports?.find((item) => item.name === name)?.code;
  };

  const foundedAirplane = (name) => {
    let val = "";
    companies.map((item) => {
      const founded = item.airCrafts.find((item1) => item1.name === name);
      if (founded) {
        val = founded;
      }
    });
    return val;
  };

  const arr = useMemo(
    () =>
      [...Array(parseInt(foundedAirplane(item.airplane)?.capacity))]
        //farklı id oluşturuyor her tıklayışta
        .map((item) => ({ id: uuidv4() })),
    []
  );

  return (
    <Accordion
      className="accordion p-3 mt-5"
      style={{ border: "1px solid rgba(13, 21, 75, .15)" }}
    >
      {showPlaceHolder ? (
        <>
          <Placeholder
            as={Row}
            style={{ paddingLeft: "10px" }}
            animation="glow"
          >
            <Col md={3}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
            <Col md={3}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
            <Col md={3}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
          </Placeholder>
          <Placeholder
            as={Row}
            className="mt-1"
            style={{ paddingLeft: "10px" }}
            animation="glow"
          >
            <Col md={2}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
            <Col md={2}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
            <Col md={4}>
              <Placeholder style={{ width: "100%" }} />
            </Col>
          </Placeholder>
        </>
      ) : (
        <Card
          style={{
            all: "unset",
          }}
        >
          <Card.Header style={{ all: "unset" }}>
            <Row style={{ width: "100%" }}>
              <Col lg md={12}>
                <Stack gap={2}>
                  <h5>{item.company}</h5>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#666363",
                    }}
                  >
                    {item.airplane}
                  </span>
                </Stack>
              </Col>
              <Col lg={6} md={12}>
                <Row>
                  <Col>
                    <Stack gap={2} className="accordion__dates">
                      <span
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        {format(new Date(item.departureDate), "HH:mm")}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666363",
                          textTransform: "uppercase",
                        }}
                      >
                        {foundedCode(item.departurePlace)}
                      </span>
                    </Stack>
                  </Col>
                  <Col>
                    <img src={require("../assets/line.png")} />
                  </Col>
                  <Col>
                    <Stack gap={2} className="accordion__dates">
                      <span
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        {format(new Date(item.arrivalDate), "HH:mm")}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666363",
                          textTransform: "uppercase",
                        }}
                      >
                        {foundedCode(item.arrivalPlace)}{" "}
                      </span>
                    </Stack>
                  </Col>
                </Row>
              </Col>
              <Col lg md={12}>
                <Stack gap={2}>
                  <span style={{ fontSize: "12px", color: "#666363" }}>
                    {differenceTime(
                      new Date(item.arrivalDate),
                      new Date(item.departureDate)
                    )}
                  </span>
                </Stack>
              </Col>
              <Col lg md={12}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#496cfe",
                    fontWeight: 600,
                  }}
                >
                  {formatValue({
                    value: item.amount.toString(),
                    suffix: "TL",
                  }).toString()}
                </span>
              </Col>
              <Col className="d-flex" lg md={12}>
                <CustomToggle eventKey={`${index}`}>
                  {showFooter ? "Koltuk Seç" : "Detay Gör"}
                </CustomToggle>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body className="accordion__body p-0 pt-2">
              <Row>
                <Col>
                  <span
                    style={{
                      color: "#666363",
                      fontSize: "0.75rem",
                    }}
                  >
                    Economy
                  </span>
                </Col>
              </Row>
              <Row>
                <Col lg={2}>
                  <Stack gap={2}>
                    <span>
                      {format(new Date(item.departureDate), "LLLL d HH:mm")}
                    </span>
                    <span>
                      {format(new Date(item.arrivalDate), "LLLL d HH:mm")}
                    </span>
                  </Stack>
                </Col>
                <Col lg>
                  <Stack gap={2}>
                    <span>
                      {foundedCode(item.departurePlace)} - {item.departurePlace}
                    </span>
                    <span>
                      {foundedCode(item.arrivalPlace)} - {item.arrivalPlace}
                    </span>
                  </Stack>
                </Col>
              </Row>
              {showFooter && (
                <Row className="mt-5">
                  <Col xs={12} className="d-flex gap-3 flex-wrap ">
                    {arr.map((item, index) => {
                      const isSelected = selectedSeats.find((value) => {
                        return value.id === item.id;
                      });
                      return (
                        <div
                          key={item.id}
                          onClick={() => seatClick(item.id, index)}
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            border: "1px solid #529EF2",
                            borderRadius: "10px",
                            width: "36px",
                            height: "36px",
                            cursor: "pointer",
                            background: isSelected ? "#529EF2" : "transparent",
                            color: isSelected ? "#fff" : "#000",
                          }}
                        >
                          {index}
                        </div>
                      );
                    })}
                  </Col>
                  <Col className="mt-5">
                    {selectedSeats.length <= 0 ? (
                      <span>Lütfen koltuk seçiniz</span>
                    ) : (
                      <div>
                        <span>Seçtiğiniz koltuklar</span>
                        <div className="d-flex gap-3 flex-wrap">
                          {selectedSeats.map((item, index) => (
                            <div
                              key={item.id + index}
                              onClick={() => {
                                seatClick(item.id, index);
                              }}
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                background: "#529EF2",
                                borderRadius: "10px",
                                width: "36px",
                                height: "36px",
                                cursor: "pointer",
                                color: "white",
                              }}
                            >
                              {item.index}
                            </div>
                          ))}
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <span>
                            Toplam Fiyat:
                            {formatValue({
                              value: (
                                item.amount * selectedSeats.length
                              ).toString(),
                              suffix: "TL",
                            }).toString()}
                          </span>
                          <Button
                            onClick={goCheckout}
                            size="sm"
                            style={{
                              padding: "8px",
                              borderRadius: "10px",
                              background:
                                "linear-gradient(35deg, #9932f5 0%, #4933f1 53%, #4950f8 70%, #496cfe 100%)",
                              marginLeft: "40px",
                            }}
                          >
                            Ödemeye Geç
                          </Button>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}
    </Accordion>
  );
};
