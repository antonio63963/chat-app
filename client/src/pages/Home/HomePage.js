import { NameInput, Room } from "components";
import { USER_KEY } from "../../constants";
import storage from "../../utils/storage";

const HomePage = () => {
  const user = storage.get(USER_KEY);
  
  return user ? <Room /> : <NameInput />;
};

export default HomePage;
