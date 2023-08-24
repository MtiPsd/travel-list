import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => {
      // we are mutating state in this case
      // ! and this is not what we want
      // * so we have to create a copy of that array
      // items.push(item);
      // There are many ways of copying an array like :
      // const itemsCopy = [...items];
      // return itemsCopy.push(item);
      // The most simple one is 👇
      return [...items, item];
      // * don't forget that we are using [ADD]
      // * method from JS using spread syntax
      // * witch includes copying the array inside of it
    });
  }

  function handleDeleteItems(id) {
    // * don't forget that we are using [DELETE]
    // * method from JS using filter
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    // * don't forget that we are using [UPDATE]
    // * method from JS using map
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        items={items}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItems, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input');

  return (
    <div className='list'>
      <ul>
        {items.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={item.packed ? { textDecoration: 'line-through' } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? 'You got everything! ready to go ✈'
          : isNaN(percentage)
          ? 'Add some stuff on your list 💼'
          : `You have ${numItems} items on your list, and you already
        have ${numPacked} (${percentage}%) 💼`}
      </em>
    </footer>
  );
}
