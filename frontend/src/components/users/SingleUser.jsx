import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDetailsCard from "./UserDetailsCard";
import { ApiRequest } from "../../utils/ApiRequest";

const SingleUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const params = {
        url: `/get-user/${userId}`,
        method: "GET",
      };
      const response = await ApiRequest(params);
      if (response.status) {
        setUser(response.data);
      }
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <div className="container">
      <h3 className="mt-3">User Details</h3>
      <UserDetailsCard user={user} />
    </div>
  );
};

export default SingleUser;
