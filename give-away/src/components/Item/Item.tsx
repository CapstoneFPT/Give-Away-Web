import React, { PropsWithChildren } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
        <Button className="item-price-old">Add</Button>
      </div>
    </div>
  );
};

export default Item;
