const toTitle = (text) => {
  const words = text.toLowerCase().split(' ');

  const newText = words.map((word) => (
    word.charAt(0).toUpperCase() + word.slice(1)
  ));

  return newText.join(' ');
}

const toChileanPesos = (value) => {
  const locales = { style: 'currency', currency: 'CLP', minumunFractionDigits: 3 }

  return new Intl.NumberFormat('en-US', locales).format(value);
}

export { toTitle, toChileanPesos };