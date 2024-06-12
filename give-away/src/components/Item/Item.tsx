import React, { PropsWithChildren } from "react";
import "./Item.css";
import { Link } from "react-router-dom";

interface ItemProps {
  id: number;
  category: string;
  clothType: string;
  name: string;
  image: string;
  new_price: number;
  old_price: number;
}

const Item = (props: PropsWithChildren<ItemProps>) => {
  return (
    <div className="item">
      <Link to={`/${props.category}/${props.clothType}/${props.name}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{props.new_price}</div>
        <div className="item-price-old">{props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
