function getItem(key) {
  const latestSearched = JSON.parse(localStorage.getItem(key));
  return latestSearched;
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getItem, setItem };
