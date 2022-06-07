import React from "react";
import { useSearchParams, useParams } from "react-router-dom";
import "./index.scss";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { differenceInDays } from "date-fns";
import { ExpeditionCard } from "../../components/expeditionCard";

export const Flights = () => {
  const expeditions = useSelector((state) => state.flight.expeditions);
  const { date } = useParams();
  console.log("datE: ", date);
  const [searchParams] = useSearchParams();
  const filtered = expeditions.filter((item) => {
    console.log(
      searchParams.get("departurePlace").toLowerCase(),
      item.departurePlace.toLowerCase()
    );

    return (
      differenceInDays(new Date(item.departureDate), new Date(date)) === 0 &&
      (item.departurePlace.toLowerCase() ===
        searchParams.get("departurePlace").toLowerCase() ||
        item.arrivalPlace.toLowerCase() ===
          searchParams.get("arrivalPlace").toLowerCase())
    );
  });
  console.log(filtered);
  const filteredArray = filtered.length > 0 ? filtered : expeditions;
  return (
    <div
      style={{ minHeight: "100vh", paddingBottom: "100px" }}
      className="flights"
    >
      <div className="flights__img">
        <p>Seferler</p>
      </div>
      <Container height="100%">
        {filtered.length === 0 && filteredArray.length !== 0 && (
          <h3>
            Aramınıza uygun bir sefer bulamadık. Bütün seferler listeleniyor
          </h3>
        )}
        {filteredArray.length > 0 ? (
          <Row>
            <Col>
              <Row>
                <Col lg={12} md={6} xs={12}>
                  {filteredArray.map((item, index) => (
                    <ExpeditionCard
                      key={item.arrivalDate + index}
                      item={item}
                      index={index}
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <h1>Uygun Sefer Bulamadık</h1>
        )}
      </Container>
    </div>
  );
};
