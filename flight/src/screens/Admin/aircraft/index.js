import { set } from "date-fns";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFlight } from "../../../store/slice";

export const AddAircraft = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.flight.companies);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const add = (e) => {
    e.preventDefault();
    dispatch(addFlight({ company, name, capacity }));
    setCompany("");
    setName("");
    setCapacity(0);
  };

  return (
    <Form style={{ width: "30%" }} onSubmit={add}>
      {companies.length <= 0 ? (
        <div>Lütfen Önce Firma Ekleyiniz</div>
      ) : (
        <>
          <Form.Group className="mb-4">
            <Form.Label>Firma Seçimi</Form.Label>
            <Form.Select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              aria-label="Uçuş Firmaları"
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
            <Form.Label>Uçak İsmi</Form.Label>
            <Form.Control
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lütfen uçak ismi giriniz"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Uçak Kapasitesi</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Lütfen kapasite giriniz"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Uçak Ekle
          </Button>
        </>
      )}
    </Form>
  );
};
