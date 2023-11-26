const getLocalStorageItem = (label: string) => {
  const ls = JSON.parse(localStorage.getItem(label) || 'null');
  return ls ? ls : null;
};

export default getLocalStorageItem;
