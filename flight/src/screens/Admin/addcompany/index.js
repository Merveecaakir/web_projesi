import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCompany } from "../../../store/slice";

export const AddCompany = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const add = (e) => {
    e.preventDefault();
    dispatch(
      addCompany({
        name,
        airCrafts: [],
      })
    );
  };
  return (
    <Form style={{ width: "30%" }} onSubmit={add}>
      <Form.Group className="mb-3">
        <Form.Label>Firma İsmi</Form.Label>
        <Form.Control
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Lütfen firma ismi giriniz"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
