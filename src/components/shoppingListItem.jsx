import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

const ShoppingListItem = ({ item, onItemDelete, onItemEdit, onItemPicked }) => {
  return (
    <Row>
      <Col xs={1} onClick={() => onItemDelete(item)}>
        <FontAwesomeIcon icon="trash-alt" color="blue" />
      </Col>
      <Col xs={1} onClick={() => onItemPicked(item)}>
        {item.qty}
      </Col>
      <Col xs={3} onClick={() => onItemPicked(item)}>
        {item.measure}
      </Col>
      <Col xs={5} onClick={() => onItemPicked(item)}>
        {item.ingredientName}
      </Col>
      <Col onClick={() => onItemEdit(item)}>
        <FontAwesomeIcon icon="edit" color="blue" />
      </Col>
    </Row>
  );
};
export default ShoppingListItem;
