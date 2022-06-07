import React, { useState } from "react";
import "./index.scss";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { format } from "date-fns";
import { ExpeditionCard } from "../../components/expeditionCard";
import { useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import { formatValue } from "react-currency-input-field";
import Cards from "react-credit-cards";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
const maskGenerator = createDefaultMaskGenerator("9999 9999 9999 9999");
const expiryGenerator = createDefaultMaskGenerator("99/99");
const cvcGenerator = createDefaultMaskGenerator("999");

export const Checkout = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [passengers, setPassengers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setPassengers({
      ...passengers,
      [name]: value,
    });
  };

  const cardChange = ({ target: { name, value } }) => {
    setCard({ ...card, [name]: value });
  };

  const selectedSeats = searchParams.get("selectedSeats").split(",");
  const expeditions = useSelector((state) => state.flight.expeditions);
  const foundItem = expeditions.find((value) => value.id === id);

  const sendEmail = (e) => {
    e.preventDefault();
    window.Email.send({
      SecureToken: "710a419c-b9e6-419b-ae0c-813b9af696de",
      Host: "smtp.elasticemail.com",
      Username: "merveecaakir@gmail.com",
      Password: "BE7874EA1DED33C58CCAE893BC92A042F48C",
      To: email,
      From: "merveecaakir@gmail.com",
      Subject: "Uçak Bileti Satın Alma İşlemi",
      Body: `<h3>Satın Alma İşleminiz Başarıyla Gerçekleşmiştir</h3><br/><div><p>Uçağınız ${format(
        new Date(foundItem.departureDate),
        "HH:mm"
      )} tarihinde ${foundItem.departurePlace}'den kalkıp ${format(
        new Date(foundItem.arrivalDate),
        "HH:mm"
      )} tarihinde ${
        foundItem.arrivalPlace
      }' e iniş yapacaktır.</p></div><div>${selectedSeats.map(
        (item) => item
      )} koltuklarını satın aldınız.</div><div>${card.number
        .toString()
        .substring(0, 4)} ile başlayan kartınızdan ${formatValue({
        value: (foundItem.amount * selectedSeats.length).toString(),
        suffix: "TL",
      }).toString()} tutarında para çekilmiştir</div>`,
    }).then((message) => alert(message));
  };

  return (
    <div
      style={{ minHeight: "100vh", paddingBottom: "50px" }}
      className="checkout"
    >
      <div className="checkout__img">
        <p>Ödeme</p>
      </div>
      <Container height="100%">
        {foundItem ? (
          <Row>
            <Col md={9}>
              <ExpeditionCard item={foundItem} showFooter={false} />
              <Form
                style={{
                  marginTop: "40px",
                }}
                className="checkout__form"
                onSubmit={sendEmail}
              >
                <div
                  className="checkout__form-container"
                  style={{
                    padding: "15px",
                    marginTop: "40px",
                  }}
                >
                  <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>
                    Yolcu Bilgileri
                  </p>
                  {selectedSeats.map((item, index) => (
                    <Form.Group key={index} className="mb-3">
                      <Form.Label>
                        Adı Soyadı ({`Koltuk No: ${item}`})
                      </Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name={item}
                        required
                        placeholder="Yolcu İsmi Giriniz"
                      />
                    </Form.Group>
                  ))}
                </div>
                <div
                  className="checkout__form-container"
                  style={{
                    padding: "15px",
                    marginTop: "40px",
                  }}
                >
                  <p style={{ fontSize: "1.75rem", fontWeight: 600 }}>
                    İletişim Bilgileri
                  </p>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="Email"
                      required
                      placeholder="Email Giriniz"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Ad Soyad</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      required
                      placeholder="Ad Soyad Giriniz"
                    />
                  </Form.Group>
                </div>
                <div
                  className="checkout__form-container"
                  style={{
                    padding: "15px",
                    marginTop: "40px",
                  }}
                >
                  <Row>
                    <Col>
                      <Cards
                        cvc={card.cvc}
                        expiry={card.expiry}
                        focused={card.focus}
                        name={card.name}
                        number={card.number}
                      />
                    </Col>
                    <Col>
                      <Form.Group className="mb-3 mt-2">
                        <Form.Control
                          required
                          name="name"
                          onChange={cardChange}
                          type="text"
                          placeholder="Ad Soyad Giriniz"
                        />
                        <MaskedInput
                          required
                          placeholder="Kart Numarası"
                          value={card.number}
                          onChange={(val) => setCard({ ...card, number: val })}
                          maskGenerator={maskGenerator}
                          name="number"
                          className="mt-2"
                        />
                        <MaskedInput
                          required
                          placeholder="Son kullanma tarihi"
                          value={card.expiry}
                          onChange={(val) => setCard({ ...card, expiry: val })}
                          maskGenerator={expiryGenerator}
                          name="expiry"
                          className="mt-2"
                        />
                        <MaskedInput
                          required
                          placeholder="CVC"
                          value={card.cvc}
                          onChange={(val) => setCard({ ...card, cvc: val })}
                          maskGenerator={cvcGenerator}
                          name="cvc"
                          className="mt-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <Button
                  className="mt-3"
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  Ödeme Yap
                </Button>
              </Form>
            </Col>
            <Col className="mt-5">
              <div className="checkout__payment">
                <Row>
                  <Col>Sefer Fiyatı</Col>
                  <Col>
                    {formatValue({
                      value: foundItem.amount.toString(),
                      suffix: "TL",
                    }).toString()}
                  </Col>
                </Row>
                <Row>
                  <Col>Yolcu Sayısı</Col>
                  <Col>{selectedSeats.length}</Col>
                </Row>
                <div
                  className="mt-2"
                  style={{ height: "1px", width: "100%", background: "#000" }}
                />
                <Row className="mt-3">
                  <Col>
                    <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                      Total
                    </span>
                  </Col>
                  <Col>
                    {formatValue({
                      value: (
                        foundItem.amount * selectedSeats.length
                      ).toString(),
                      suffix: "TL",
                    }).toString()}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        ) : (
          <h1>Geçerli Bir Sefer Bulunamadı</h1>
        )}
      </Container>
    </div>
  );
};
