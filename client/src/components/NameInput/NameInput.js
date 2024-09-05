import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

import { USER_KEY } from "../../constants";
import storage from "../../utils/storage.js";

const NameInput = () => {
  const [formData, setFormData] = useState({
    userName: "",
    roomId: "main_room",
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim());
    setSubmitDisabled(isSomeFieldEmpty);
  }, [formData]);

  const onChange = useCallback(({ target: { name, value } }) => {
    console.log(name, value)
    setFormData((currentState) => ({ ...currentState, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (submitDisabled) return;

      const userId = nanoid;
      storage.set(USER_KEY, {
        userId,
        ...formData,
      });

      window.location.reload();
    },
    [formData, submitDisabled]
  );

  return (
    <div className="container name-input">
      <h2>Welcome</h2>
      <form onSubmit={onSubmit} className="form name-room">
        <label htmlFor="userName">Enter Your Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          minLength={2}
          required
          value={formData.userName}
          onChange={onChange}
        />
        <button type="submit" disabled={submitDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NameInput;
