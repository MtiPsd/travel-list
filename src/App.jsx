import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './stats';

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
