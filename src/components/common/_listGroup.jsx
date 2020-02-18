import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  let {
    items, // item in list menu
    textProperty,
    valueProperty,
    onItemSelect, // function to set state
    itemSelected
  } = props;

  const genresMenu = items.map(singleItem => {
    return (
      <li
        className={
          itemSelected === singleItem[textProperty]
            ? "list-group-item active"
            : "list-group-item"
        }
        key={singleItem[valueProperty]}
        onClick={() => onItemSelect(singleItem)}
      >
        {singleItem[textProperty]}
      </li>
    );
  });
  return <ul className="list-group">{genresMenu}</ul>;
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  itemSelected: PropTypes.object.isRequired
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
