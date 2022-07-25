import React, { useState, useEffect } from "react";
import Routes from "./Components/Routes";
import { UidContext } from "./Components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log(err));
    }
    fecthToken();

    if (uid) dispatch(getUser(uid));

  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
