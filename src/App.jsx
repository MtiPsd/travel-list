import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems(items => {
      // we are mutating state in this case
      // ! and this is not what we want
      // * so we have to create a copy of that array
      // ==========> items.push(item);
      // There are many ways of copying an array like :
      // const itemsCopy = [...items];
      // return itemsCopy.push(item);
      // * The most simple one is 👇
      return [...items, item];
    });
  }

  function handleDeleteItems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList onDeleteItems={handleDeleteItems} items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  //
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    // hint: same key & values can be written once
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>what do you need for your trip 😍 ?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map(
          num => (
            <option value={num} key={num}>
              {num}
            </option>
          ),
        )}
      </select>
      <input
        type='text'
        placeholder='Items ...'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems }) {
  return (
    <div className='list'>
      <ul>
        {items.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems }) {
  return (
    <li>
      <span
        style={item.packed ? { textDecoration: 'line-through' } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>
        💼 You have X items on your list, and you already have X (X%)
      </em>
    </footer>
  );
}
