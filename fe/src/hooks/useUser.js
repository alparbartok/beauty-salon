import { useEffect, useState, useContext } from "react";
import { userApi } from "../api/user";
import { PopulatorContext } from "../provider/Populator";

export const useMyUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    userApi
      .getMe()
      .then(({ data }) => setUser(data))
      .catch((e) => console.error(e));
  }, []);

  return { user };
};

export const useUserTypes = () => {
  const { state, setState } = useContext(PopulatorContext);

  useEffect(() => {
    if (state.user_types.length === 0) {
      userApi
        .getUserTypes()
        .then(({ data }) => setState({ ...state, user_types: data }))
        .catch((e) => console.error(e));
    }
  }, []);

  return { user_types: state.user_types };
};
