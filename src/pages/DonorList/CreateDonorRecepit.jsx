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
import { Card, CardBody, Input } from "@material-tailwind/react";

const exemption = [
  {
    value: "80G",
    label: "80G",
  },
  {
    value: "Non 80G",
    label: "Non 80G",
  },
  {
    value: "FCRA",
    label: "FCRA",
  },
  {
    value: "CSR",
    label: "CSR",
  },
];

const pay_mode = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const pay_mode_2 = [
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const donation_type = [
  {
    value: "Gopalak",
    label: "Gopalak",
  },
  {
    value: "Wet/Dry-Grass",
    label: "Wet/Dry-Grass",
  },
  {
    value: "FIne/Rough Bran",
    label: "FIne/Rough Bran",
  },
  {
    value: "Gou-Daan",
    label: "Gou-Daan",
  },
  {
    value: "Building Fund",
    label: "Building Fund",
  },
  {
    value: "Pigeon Feeds",
    label: "Pigeon Feeds",
  },
  {
    value: "General Fund/Others",
    label: "General Fund/Others",
  },
];

const donation_type_2 = [
  {
    value: "Gopalak",
    label: "Gopalak",
  },
  {
    value: "Wet/Dry-Grass",
    label: "Wet/Dry-Grass",
  },
  {
    value: "FIne/Rough Bran",
    label: "FIne/Rough Bran",
  },
  {
    value: "Gou-Daan",
    label: "Gou-Daan",
  },
  {
    value: "Building Fund",
    label: "Building Fund",
  },
  {
    value: "Pigeon Feeds",
    label: "Pigeon Feeds",
  },
  {
    value: "General Fund/Others",
    label: "General Fund/Others",
  },
];

const CreateDonorRecepit = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [userdata, setUserdata] = useState("");

  console.log(id);
  // Get current date

  const today = moment();
  const todayback = today.format("YYYY-MM-DD");

  // Financial year calculation
  const currentYear = today.toDate().getFullYear();
  const nextYear = (currentYear + 1).toString().substr(-2);
  const financialYear = `${currentYear}-${nextYear}`;

  const [donor, setDonor] = useState({
    donor_fts_id: "",
    receipt_financial_year: "",
    receipt_date: todayback,
    receipt_exemption_type: "",
    receipt_total_amount: "",
    receipt_donation_type: "",
    receipt_tran_pay_mode: "",
    receipt_tran_pay_details: "",
    receipt_occasional: "",
    receipt_email_count: "",
    receipt_remarks: "",
    receipt_reason: "",
  });

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
      dateField.setAttribute("max", todayback);
    }
  }, [todayback]);
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onInputChange = (e) => {
    if (e.target.name == "receipt_total_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDonor({
        ...donor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      donor_fts_id: userdata.donor_fts_id,
      receipt_financial_year: financialYear,
      receipt_date: todayback,
      receipt_exemption_type: donor.receipt_exemption_type,
      receipt_total_amount: donor.receipt_total_amount,
      receipt_donation_type: donor.receipt_donation_type,
      receipt_tran_pay_mode: donor.receipt_tran_pay_mode,
      receipt_tran_pay_details: donor.receipt_tran_pay_details,
      receipt_occasional: donor.receipt_occasional,
      receipt_remarks: donor.receipt_remarks,
      receipt_reason: donor.receipt_reason,
      receipt_email_count: donor.receipt_email_count,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      setIsButtonDisabled(true);

      axios
        .post(`${BaseUrl}/create-receipt`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == "201") {
            toast.success(res.data.msg || "Donor Created Successfully");
            navigate("/cashrecepit");
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
                select
                title="Category"
                type="whatsappDropdown"
                name="receipt_exemption_type"
                value={donor.receipt_exemption_type}
                onChange={(e) => onInputChange(e)}
                options={exemption}
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                type="textField"
                label="Total Amount"
                name="receipt_total_amount"
                value={donor.receipt_total_amount}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                select
                title="Transaction Type"
                type="TransactionType"
                name="receipt_tran_pay_mode"
                value={donor.receipt_tran_pay_mode}
                onChange={(e) => onInputChange(e)}
                donor={donor}
                pay_mode={pay_mode}
                pay_mode_2={pay_mode_2}
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                select
                title="Purpose"
                type="TransactionType1"
                name="receipt_donation_type"
                value={donor.receipt_donation_type}
                onChange={(e) => onInputChange(e)}
                donor={donor}
                donation_type={donation_type}
                donation_type_2={donation_type_2}
              ></Fields>
            </div>
            <div className="mb-4">
              <Fields
                required
                type="textField"
                label="Transaction Pay Details"
                name="receipt_tran_pay_details"
                value={donor.receipt_tran_pay_details}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                type="textField"
                name="receipt_occasional"
                value={donor.receipt_occasional}
                onChange={(e) => onInputChange(e)}
                label="On Occasion"
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                type="textField"
                name="receipt_remarks"
                value={donor.receipt_remarks}
                onChange={(e) => onInputChange(e)}
                label="Remarks"
              />
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

export default CreateDonorRecepit;
