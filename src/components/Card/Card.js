import React from "react";
import "./Card.scss";

function Card(props) {
  const { card } = props;
  return (
    <li className="card-item">
      {/* nếu tồn tại card.cover thì xuất img */}
      {card.cover && <img src={card.cover} className="card-cover" alt="test-img"/>}
      {card.title}
    </li>
  );
}

export default Card;
