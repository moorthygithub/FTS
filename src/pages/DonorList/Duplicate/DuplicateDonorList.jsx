import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { ContextPanel } from "../../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { BaseUrl } from "../../../base/BaseUrl";
import { Spinner, Button } from "@material-tailwind/react";
import CommonListing from "../CommonListing";

const DuplicateDonorList = () => {
  const [webdonation, setWebDonation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BaseUrl}/fetch-donors-duplicate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const res = response.data?.individualCompanies || [];

        const tempRows = res.map((item, index) => {
          if (item["donor_type"] === "Individual") {
            return [
              index + 1,
              item["donor_fts_id"],
              item["donor_full_name"],
              item["donor_type"],
              item["donor_spouse_name"],
              item["donor_mobile"],
              item["donor_email"],
              item["c_receipt_count"],
              item["c_receipt_count"] + "#" + item["id"],
            ];
          } else {
            return [
              index + 1,
              item["donor_fts_id"],
              item["donor_full_name"],
              item["donor_type"],
              item["donor_contact_name"],
              item["donor_mobile"],
              item["donor_email"],
              item["c_receipt_count"],
              item["c_receipt_count"] + "#" + item["id"],
            ];
          }
        });

        setWebDonation(tempRows);
      } catch (error) {
        console.error("Error fetching pending list request data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRData();
  }, [isPanelUp, navigate]);

  const updateData = (value) => {
    axios({
      url: BaseUrl + "/update-donors-duplicate-by-id/" + value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log("receipt", res.data);
      toast.success("Data Updated Successfully");
      // window.location.href = "listing";
    });
  };

  const columns = [
    {
      name: "#",
      label: "#",
      options: { filter: false, print: true, download: true, sort: false },
    },
    {
      name: "PDS Id",
      label: "PDS Id",
      options: { filter: false, sort: false },
    },
    { name: "Name", label: "Name", options: { filter: false, sort: false } },
    { name: "Type", label: "Type", options: { filter: false, sort: false } },
    {
      name: "Spouse/Contact",
      label: "Spouse/Contact",
      options: { filter: false, sort: false },
    },
    {
      name: "Mobile",
      label: "Mobile",
      options: { filter: false, sort: false },
    },
    { name: "Email", label: "Email", options: { filter: false, sort: false } },
    {
      name: "Receipt Count",
      label: "Receipt Count",
      options: { filter: false, sort: false },
    },
    {
      name: "Actions",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <div style={{ minWidth: "150px" }}>
            <Button
              className="text-white py-1 px-2 bg-gradient-to-b from-[#7c8492] to-[#677080] border-[#677080] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_1px_rgba(0,0,0,0.075)]"
              onClick={() => updateData(value.substr(value.indexOf("#") + 1))}
            >
              <MdDelete />
            </Button>
          </div>
        ),
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
    setRowProps: (rowData) => ({
      style: {
        borderBottom: "10px solid #f1f7f9",
      },
    }),
  };

  return (
    <Layout>
      <CommonListing />
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Duplicate List
        </h3>
      </div>
      <div
        className="flex justify-between items-center  p-4"
        style={{ backgroundColor: "#b8f2ed" }}
      >
        <p className="text-black">
          Duplicate Criteria: If Mobile Number is Same or Donor Name is Same.
          <br />
          (Note: All the below data is not 100% duplicate. It is all recommended
          data that may be duplicated. Please make the changes very carefully.
          We advise you to make a note before removing.)
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-12 w-12" color="purple" />
        </div>
      ) : (
        <div className="mt-5">
          <MUIDataTable
            data={webdonation}
            columns={columns}
            options={options}
          />
        </div>
      )}
    </Layout>
  );
};

export default DuplicateDonorList;
