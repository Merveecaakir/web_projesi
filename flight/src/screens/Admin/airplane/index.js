import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addAirplane } from "../../../store/slice";
export const AddAirplane = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const add = (e) => {
    e.preventDefault();
    dispatch(addAirplane({ name, code }));
    setName("");
    setCode("");
  };

  return (
    <div>
      <Form onSubmit={add}>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Label>Havalimanı İsmi</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Lütfen havalimanı ismi giriniz"
          />
          <Form.Text className="text-muted">
            Ayrıca havalimanının kodunuda girmeniz gerekmektedir.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Havalimanı Kodu</Form.Label>
          <Form.Control
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Kod giriniz"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
