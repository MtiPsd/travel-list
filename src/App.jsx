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

  function handleClearItems() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items ?',
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
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

function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;
  ///////////////////////////////
  switch (sortBy) {
    case 'input':
      sortedItems = items;
      break;

    case 'description':
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;

    case 'packed':
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;

    default:
      console.log('It is impossible');
      break;
  }
  ///////////////////////////////

  return (
    <div className='list'>
      <ul>
        {sortedItems.map(item => (
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
        <button onClick={onClearItems}>Clear list</button>
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
          ? 'ُStart adding some items to your packing list 🚀'
          : `You have ${numItems} items on your list, and you already
        have ${numPacked} (${percentage}%) 💼`}
      </em>
    </footer>
  );
}
