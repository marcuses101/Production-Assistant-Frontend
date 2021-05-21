import React from "react";

const liStyle = {
  display: "grid",
  gridTemplateColumns: "repeat( auto-fit, minmax(100px, 1fr) )",
};

export function ItemSelector({ items, handleCheck }) {

  const listItems = items.map((item) => {
    return (
      <li key={item.id} style={liStyle}>
        <span>
          <label htmlFor={`checkbox-${item.id}`}>
            Select:
            <br />
            <input
              type="checkbox"
              data-id={item.id}
              name={`checkbox-${item.id}`}
              id={`checkbox-${item.id}`}
              checked={item.checked ?? false}
              onChange={handleCheck}
            />
          </label>
        </span>

        <span>
          <strong>Name: </strong>
          <br />
          {item.name}
        </span>
        <span>
          <strong>Acquired: </strong>
          <br />
          {item.acquired ? "Yes" : "No"}
        </span>
      </li>
    );
  });
  return <ul>{listItems}</ul>;
}
