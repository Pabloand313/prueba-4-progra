import React from 'react';
import Item from './Item';

function List({
  items,
  deleteItem,
  editItem,
  toggleComplete,
}) {
  return (
    <ul>
      {items.length > 0 ? (
        items.map((item) => (
          <Item
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            toggleComplete={toggleComplete}
          />
        ))
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </ul>
  );
}

export default List;