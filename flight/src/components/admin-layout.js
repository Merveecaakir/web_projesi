import React from "react";
import "./admin-layout.scss";
import { Row, Col, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div style={{ height: "100vh" }} className="admin">
      <Row className=" m-0 h-100">
        <Col xs={2} className="sidebar p-5">
          <Nav
            defaultActiveKey="/admin"
            className="flex-column fw-bold align-items-center justify-content-evenly "
          >
            <Nav.Link as={Link} to="/admin">
              Havalimanı Ekle
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/addCompany">
              Firma Ekle
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/addAircraft">
              Uçak Ekle
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/addExpedition">
              Sefer Ekle
            </Nav.Link>
          </Nav>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};
