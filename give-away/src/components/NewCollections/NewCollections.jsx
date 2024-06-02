import React from "react";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import "./NewCollections.css";
const NewCollections = () => {
  return (
    <div className="new-collections">
      <h1> New Collections </h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              category={item.category}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
