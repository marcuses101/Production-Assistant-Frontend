import React from "react";

const liStyle = {
  display: "grid",
  gridTemplateColumns: "repeat( auto-fit, minmax(100px, 1fr) )",
  boxShadow: "var(--box-shadow-outline)",
  borderRadius: "5px",
  padding: ".5rem",
};

export function ItemSelector({ items, handleCheck }) {
  const listItems = items.map((item) => {
    return (
      <label key={item.id} htmlFor={`checkbox-${item.id}`}>
        <li style={liStyle}>
          <span>
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
      </label>
    );
  });
  return <ul>{listItems}</ul>;
}
