import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ fetchData }) => {
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#f5f5f5",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    leftButton: {
      padding: "8px 16px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    spacer: {
      flexGrow: 1,
    },
    rightButton: {
      padding: "8px 16px",
      backgroundColor: "#2196f3",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };
  return (
    <nav style={styles.navbar}>
      <div style={styles.spacer}></div>
      <button style={styles.rightButton} onClick={() => navigate("/add-user")}>
        Add User
      </button>
    </nav>
  );
};

export default Navbar;
