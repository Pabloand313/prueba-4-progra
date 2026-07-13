import React from 'react';

function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li>
      <span className={item.completed ? "completed" : ""}>
        {item.value}
      </span>

      <div>
        <button
          className="btn-complete"
          onClick={() => toggleComplete(item.id)}
        >
          {item.completed ? "Deshacer" : "Completar"}
        </button>

        <button
          className="btn-edit"
          onClick={() => editItem(item)}
        >
          Editar
        </button>

        <button
          className="btn-delete"
          onClick={() => deleteItem(item.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;