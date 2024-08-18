import { NameInput, Room } from "../../components";
import { USER_KEY } from "../../constants";
import storage from "../../utils/storage";

const HomePage = () => {
  const user = storage.get(USER_KEY);
  console.log(user)
  
  // return user ? <Room /> : <NameInput />;
  return <>Hello</>
};

export default HomePage;
