import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import CurrencyInput from "react-currency-input-field";
import { addExpedition, addFlight } from "../../../store/slice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { set } from "date-fns";

export const AddExpedition = () => {
  const companies = useSelector((state) => state.flight.companies);
  const airports = useSelector((state) => state.flight.airports);
  const [company, setCompany] = useState("");
  const [airplane, setAirplane] = useState("");
  const [departurePlace, setDeparturePlace] = useState("");
  const [arrivalPlace, setArrivalPlace] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const selectedCompany = companies.find((item) => item.name === company);

  const add = (e) => {
    e.preventDefault();

    if (departureDate > arrivalDate) {
      toast.error("Kalkış Tarihi, Varış tarihinden büyük olamaz");
    } else {
      dispatch(
        addExpedition({
          id: uuidv4(),
          departurePlace,
          arrivalPlace,
          departureDate,
          arrivalDate,
          amount,
          company,
          airplane,
        })
      );
      setCompany("");
      setAirplane("");
      setDeparturePlace("");
      setArrivalPlace("");
      setArrivalDate(new Date());
      setDepartureDate(new Date());
      setAmount(0);
    }
  };
  return (
    <Form style={{ width: "30%" }} onSubmit={add}>
      <Form.Group className="mb-4">
        <Form.Label>Firma Seçimi</Form.Label>
        <Form.Select
          required
          aria-label="Uçuş Firmaları"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        >
          <option key="blankChoice" hidden value>
            {" "}
            Firma seçiniz{" "}
          </option>
          {companies.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Uçak Seçimi</Form.Label>
        <Form.Select
          required
          aria-label="Uçaklar"
          value={airplane}
          onChange={(e) => {
            setAirplane(e.target.value);
          }}
        >
          <option key="blankChoice" hidden value>
            {" "}
            Uçak seçiniz{" "}
          </option>
          {selectedCompany?.airCrafts?.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name} - {item.capacity} kapasiteli
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Kalkış Yeri Seçimi</Form.Label>
        <Form.Select
          required
          aria-label="Havalimanları"
          value={departurePlace}
          onChange={(e) => {
            setDeparturePlace(e.target.value);
          }}
        >
          <option key="blankChoice" hidden value>
            {" "}
            Kalkış Yeri seçiniz{" "}
          </option>
          {airports.map((item, i) => (
            <option key={i} value={item.name}>
              {item.name} - {item.code}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Varış Yeri Seçimi</Form.Label>
        <Form.Select
          required
          aria-label="Havalimanları"
          value={arrivalPlace}
          onChange={(e) => {
            setArrivalPlace(e.target.value);
          }}
        >
          <option key="blankChoice" hidden value>
            {" "}
            Varış Yeri seçiniz{" "}
          </option>
          {airports
            .filter((item) => item.name !== departurePlace)
            .map((item, i) => (
              <option key={i} value={item.name}>
                {item.name} - {item.code}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <DatePicker
          required
          showTimeSelect
          placeholderText="Kalkış Saati"
          dateFormat="dd/MM/yyyy HH:mm"
          selected={departureDate}
          onChange={(date) => {
            console.log(date);
            setDepartureDate(date);
          }}
          timeIntervals={15}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <DatePicker
          required
          showTimeSelect
          placeholderText="Varış Saati"
          dateFormat="dd/MM/yyyy HH:mm"
          selected={arrivalDate}
          onChange={(date) => setArrivalDate(date)}
          timeIntervals={15}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <CurrencyInput
          required
          id="input-example"
          name="amount"
          placeholder="Lütfen Sefer Ücreti Giriniz"
          decimalsLimit={2}
          onValueChange={(value, name) => setAmount(value)}
          suffix="TL"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sefer Ekle
      </Button>
    </Form>
  );
};
