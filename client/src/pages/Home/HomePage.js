import { NameInput, Room } from "../../components";
import storage from "../../utils/storage";

const HomePage = () => {
  const user = storage.getUser();
  console.log(user)
  
  return user ? <Room /> : <NameInput />;

};

export default HomePage;
