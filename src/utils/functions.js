const toTitle = (text) => {
  const words = text.toLowerCase().split(' ');

  const newText = words.map((word) => (
    word.charAt(0).toUpperCase() + word.slice(1)
  ));

  return newText.join(' ');
}

export { toTitle };