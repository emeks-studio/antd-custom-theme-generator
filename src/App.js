import React from "react";
import { Row, Col, Button, Input, Menu, Dropdown, Typography } from "antd";
import logo from "./logo.svg";
import "./App.scss";

const { Title } = Typography;

const menu = (
  <Menu>
    <Menu.Item> Opción 1 </Menu.Item>
    <Menu.Item> Opción 2 </Menu.Item>
    <Menu.Item> Opción 3 </Menu.Item>
  </Menu>
);

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Row>
        <Col span={24}>
          <Title>Probando Antd</Title>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary">Opciones</Button>
          </Dropdown>
        </Col>
        <Col span={16}>
          <Input placeholder="Input de ejemplo" />
        </Col>
      </Row>
    </header>
  </div>
);

export default App;
