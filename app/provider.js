"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getUsers } from "../configs/db"; 

function Provider({ children }) {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers("users");  
        console.log('users', users);  
        setUserList(users);            
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();  
  }, []);  
  return (
    <div>
      {children}
    </div>
  );
}

export default Provider;
