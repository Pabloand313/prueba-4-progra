import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(
        items.map((item) =>
          item.id === itemToEdit.id
            ? { ...item, value }
            : item
        )
      );
      setItemToEdit(null);
    } else {
      setItems([
        ...items,
        {
          id: Date.now(),
          value,
          completed: false,
        },
      ]);
    }
  };

  const deleteItem = (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este elemento?"
    );

    if (confirmar) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteAll = () => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar todos los elementos?"
    );

    if (confirmar) {
      setItems([]);
      setItemToEdit(null);
    }
  };

  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>

      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />

      <input
        type="text"
        className="search"
        placeholder="Buscar elemento..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="contador">
        <strong>Total:</strong> {items.length}
      </p>

      {items.length > 0 && (
        <button
          className="btn-delete-all"
          onClick={deleteAll}
        >
          Borrar todos
        </button>
      )}

      <List
        items={filteredItems}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;