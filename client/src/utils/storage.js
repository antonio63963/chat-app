const storage = {
  get: (key) => {
    const dataFromLocal = localStorage.getItem(key);
    return dataFromLocal ? JSON.parse(dataFromLocal) : null;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default storage;
