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

export default Stats;
