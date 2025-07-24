import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { ApiRequest } from "../../utils/ApiRequest";
import Navbar from "../../Layouts/NavBar";
import { useToast } from "../../context/ToastProvider";

const UserTable = () => {
  const { showCustomToast } = useToast();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const params = {
      url: "/get-all-users",
      method: "GET",
    };
    const response = await ApiRequest(params);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const params = {
        url: `/delete-user/${userId}`,
        method: "DELETE",
      };
      const response = await ApiRequest(params);
      if (response.status) {
        showCustomToast(response.message, "success");
        setTimeout(() => fetchData(), 1000);
      }
    } catch (error) {
      showCustomToast("Something went wrong!", "danger");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.address?.city,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Website",
      selector: (row) => (row.website !== "" ? row.website : "---"),
    },
    {
      name: "Company",
      selector: (row) => row.company?.name,
    },
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn btn-sm btn-info"
            onClick={() => navigate(`single-user/${row._id}`)}
          >
            View
          </button>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`edit-user/${row._id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar fetchData={fetchData} />
      <DataTable
        title="User Datas"
        columns={columns}
        data={data}
        persistTableHead
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
        highlightOnHover
        striped
        responsive
      />
    </>
  );
};

export default UserTable;
