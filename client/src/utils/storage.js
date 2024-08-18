import { USER_KEY } from "../constants";

const storage = {
  get: (key) => {
    const dataFromLocal = localStorage.getItem(key);
    return dataFromLocal ? JSON.parse(dataFromLocal) : null;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getUser: () => {
    return this.get(USER_KEY);
  }
};

export default storage;
