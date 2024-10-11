import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdDelete } from "react-icons/md";
import axios from "axios";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";
import { BaseUrl } from "../../base/BaseUrl";
import moment from "moment/moment";
import { Card, CardBody } from "@material-tailwind/react";

// Unit options for dropdown
const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const CreateDonor = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [userdata, setUserdata] = useState("");

  console.log(id);
  // Get current date

  const today = moment();
  const todayBackFormatted = today.format("YYYY-MM-DD");

  // Financial year calculation
  const currentYear = today.toDate().getFullYear();
  const nextYear = (currentYear + 1).toString().substr(-2);
  const financialYear = `${currentYear}-${nextYear}`;

  const [donor, setDonor] = useState({
    indicomp_fts_id: "",
    m_receipt_financial_year: financialYear,
    m_receipt_date: todayBackFormatted,
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_email_count: "",
    m_receipt_count: "",
    m_receipt_reason: "",
    m_receipt_remarks: "",
    m_receipt_sub_data: "",
    m_receipt_occasional: "",
    m_manual_receipt_no: "",
    m_receipt_vehicle_no: "",
  });

  const useTemplate = {
    m_receipt_sub_item: "",
    m_receipt_sub_quantity: "",
    m_receipt_sub_unit: "",
    m_receipt_sub_amount: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  const [fabric_inward_count, setCount] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fetch vendors and items on mount
  useEffect(() => {
    const fetchVendorData = async () => {
      const response = await axios.get(`${BaseUrl}/fetch-vendor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVendors(response.data.vendor);
    };

    const fetchItemData = async () => {
      const response = await axios.get(`${BaseUrl}/fetch-item`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(response.data.item);
    };

    fetchVendorData();
    fetchItemData();

    const dateField = document.getElementById("datefield");
    if (dateField) {
      dateField.setAttribute("max", todayBackFormatted); // Set max attribute for date input
    }
  }, [todayBackFormatted]);

  const addItem = () => {
    setUsers([...users, useTemplate]);
    setCount(fabric_inward_count + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };

  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const onItemChange = (e, index) => {
    const updatedUsers = users.map((user, i) =>
      index === i ? { ...user, [e.target.name]: e.target.value } : user
    );
    setUsers(updatedUsers);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      indicomp_fts_id: donor.indicomp_fts_id,
      m_receipt_financial_year: financialYear,
      m_receipt_date: donor.m_receipt_date,
      m_receipt_total_amount: donor.m_receipt_total_amount,
      m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
      m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
      m_receipt_remarks: donor.m_receipt_remarks,
      m_receipt_reason: donor.m_receipt_reason,
      m_receipt_email_count: donor.m_receipt_email_count,
      m_manual_receipt_no: donor.m_manual_receipt_no,
      m_receipt_count: fabric_inward_count,
      m_receipt_sub_data: users,
      m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
      m_receipt_occasional: donor.m_receipt_occasional,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      setIsButtonDisabled(true);

      axios
        .post(`${BaseUrl}/create-m-receipt`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == "200") {
            toast.success(res.data.msg || "Donor Created Successfully");
            navigate("/donor-list");
          } else {
            toast.error(res.data.message || "Error occurred");
          }
        })
        .catch((err) => {
          // Improved error logging
          if (err.response) {
            toast.error(
              `Error: ${
                err.response.data.message || "An error occurred on the server"
              }`
            );
            console.error("Server Error:", err.response);
          } else if (err.request) {
            toast.error("No response from the server.");
            console.error("No Response:", err.request);
          } else {
            toast.error(`Error: ${err.message}`);
            console.error("Error Message:", err.message);
          }
        })
        .finally(() => {
          setIsButtonDisabled(false);
        });
    }
  };

  const handleBackButton = () => {
    navigate("/donor-list");
  };

  useEffect(() => {
    axios({
      url: BaseUrl + "/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUserdata(res.data.donor);
      console.log("datatable", res.data.donor);
      setLoader(false);
    });
  }, []);
  return (
    <Layout>
      <div>
        <div className="flex mb-4 mt-6">
          <MdKeyboardBackspace
            onClick={handleBackButton}
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
            Material Receipt
          </h1>
        </div>
        <Card className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-4 mb-4">
              <div className="text-gray-700">
                <strong>Name:</strong>
                {userdata.donor_full_name}
              </div>
              <div className="text-gray-700">
                <strong>PDS ID:</strong>
                {userdata.donor_fts_id}
              </div>
              <div className="text-gray-700">
                <strong>Pan No:</strong>
                {userdata.donor_pan_no}
              </div>
              <div className="text-gray-700">
                <strong>Receipt Date:</strong>{" "}
                {moment(userdata.donor_joining_date).format("DD-MM-YYYY")}
              </div>
              <div className="text-gray-700">
                <strong>Year:</strong>
                {financialYear}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form id="addIndiv" onSubmit={onSubmit}>
            {/* Purchase Details */}
            <div className="mb-4">
              <Fields
                required
                type="textField"
                label="Approx Value"
                name="m_receipt_total_amount"
                value={donor.m_receipt_total_amount}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                type="textField"
                label="Vehicle No"
                name="m_receipt_vehicle_no"
                value={donor.m_receipt_vehicle_no}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                type="textField"
                label="On Occasion of"
                name="m_receipt_occasional"
                value={donor.m_receipt_occasional}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                type="textField"
                name="m_receipt_remarks"
                value={donor.m_receipt_remarks}
                onChange={onInputChange}
                label="Remarks"
              />
            </div>

            {/* Line Items */}
            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4 mt-4"
              >
                <Fields
                  required
                  select
                  title="Item"
                  type="itemdropdown"
                  value={user.purchase_sub_item}
                  name="purchase_sub_item"
                  onChange={(e) => onItemChange(e, index)}
                  options={items}
                />
                <Fields
                  required
                  label="Quantity"
                  type="textField"
                  value={user.m_receipt_sub_quantity}
                  name="m_receipt_sub_quantity"
                  onChange={(e) => onItemChange(e, index)}
                />
                <Fields
                  required
                  select
                  title="Unit"
                  type="whatsappDropdown"
                  name="m_receipt_sub_unit"
                  value={user.m_receipt_sub_unit}
                  onChange={(e) => onItemChange(e, index)}
                  options={unitOptions}
                />
                <IconButton color="error" onClick={() => removeUser(index)}>
                  <MdDelete />
                </IconButton>
              </div>
            ))}

            <div className="display-flex justify-start">
              <Button
                variant="outlined"
                color="primary"
                onClick={addItem}
                className="mt-4"
              >
                Add More
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isButtonDisabled}
                className="mt-4"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="mt-4"
                onClick={handleBackButton}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDonor;