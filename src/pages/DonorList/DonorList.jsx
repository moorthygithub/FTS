import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL, { BaseUrl } from "../../base/BaseUrl";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { MdEdit, MdShoppingBasket } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { BiAbacus } from "react-icons/bi";

const DonorList = () => {
  const [donorListData, setDonorListData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOpenData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BaseUrl}/fetch-donor-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data.donor;

        if (Array.isArray(responseData)) {
          const tempRows = responseData.map((item, index) => [
            index + 1,
            item.donor_fts_id,
            item.donor_full_name,
            item.donor_type,
            item.donor_spouse_name,
            item.donor_mobile,
            item.donor_email,
            item.id,
          ]);
          setDonorListData(tempRows);
        } else {
          console.error("Expected an array but received", responseData);
          setDonorListData([]);
        }
      } catch (error) {
        console.error("Error fetching open list enquiry data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpenData();
  }, []);

  const columns = [
    {
      name: "#",
      options: {
        filter: false,
        print: true,
        download: true,
        sort: false,
      },
    },
    {
      name: "PDS ID",
      options: {
        filter: true,
        print: true,
        download: true,
        display: "included",
        sort: false,
      },
    },

    {
      name: "Name ",
      label: " Name ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Type ",
      label: " Type ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Spouse/Contact ",
      label: " Spouse/Contact ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Mobile ",
      label: " Mobile ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Email ",
      label: " Email ",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex items-center space-x-2">
              <IoEye
                onClick={() => navigate(`/viewdonor-list/${id}`)}
                title="edit courses list"
                className="h-5 w-5 cursor-pointer"
              />

              <MdEdit
                onClick={() => navigate(`/edit-donor/${id}`)}
                title="edit courses list"
                className="h-5 w-5 cursor-pointer"
              />

              <BiAbacus
                onClick={() => navigate(`/createrecepit-donor/${id}`)}
                title="edit courses list"
                className="h-5 w-5 cursor-pointer"
              />
              <MdShoppingBasket
                onClick={() => navigate(`/create-donor/${id}`)}
                title="edit courses list"
                className="h-5 w-5 cursor-pointer"
              />
            </div>
          );
        },
      },
    },
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
    setRowProps: (rowData) => {
      return {
        style: {
          borderBottom: "10px solid #f1f7f9",
        },
      };
    },
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Donor List
        </h3>

        <Link
          to="/add-donor"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          + Add Donor
        </Link>
      </div>
      <div className="mt-5">
        <MUIDataTable
          data={donorListData ? donorListData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default DonorList;
