import { useState, useEffect } from "react";
import axios from "axios";
import { GRAPH_URL, getToken, removeToken } from "../config";

const useAuth = () => {
  // console.log("use auth");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserByMe = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    const data = {
      query: `
        query UserByMe {
          userByMe {
            data {
              avatar
              dob
              email
              firstName
              gender
              id
              lastName
              phone
            }
            status {
              message
              success
              type
              code
            }
          }
        }
      `,
    };
    try {
      const response = await axios.post(GRAPH_URL, data, config);
      const temp = response.data.data;

      if (temp.userByMe.status.success) {
        setUser(temp.userByMe.data);
      } else {
        removeToken();
        // setError(temp.userByMe.status.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserByMe();
  }, []);

  return { user, loading, error };
};

export default useAuth;
