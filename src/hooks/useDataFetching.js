import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function useDataFetching(dataSource) {
  const { token, badge } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}/${dataSource}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
        setError(response.text);
      });
  }, [dataSource, badge]);

  return [loading, error, data];
}

export default useDataFetching;
