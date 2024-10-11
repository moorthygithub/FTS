import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import Layout from "../../../layout/Layout";
import Fields from "../../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { BaseUrl } from "../../../base/BaseUrl";
import { Input } from "@material-tailwind/react";
import { Card, CardBody } from "@material-tailwind/react";
import moment from "moment";

// Unit options for dropdown
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

const EditRecepit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [donor, setDonor] = React.useState({
    receipt_date: "",
    receipt_exemption_type: "",
    receipt_total_amount: "",
    receipt_donation_type: "",
    receipt_ref_no: "",
    receipt_tran_pay_mode: "",
    receipt_tran_pay_details: "",
    receipt_remarks: "",
    receipt_reason: "",
    receipt_email_count: "",
    receipt_occasional: "",
    donor: {
      donor_full_name: "",
      donor_pan_no: "",
      donor_fts_id: "",
    },
  });

  useEffect(() => {
    const fetchRecepitData = async () => {
      const response = await axios.get(`${BaseUrl}/fetch-receipt-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDonor(response.data.receipt);
    };

    fetchRecepitData();
  }, [id]);

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
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      receipt_total_amount: donor.receipt_total_amount,
      receipt_donation_type: donor.receipt_donation_type,
      receipt_tran_pay_mode: donor.receipt_tran_pay_mode,
      receipt_tran_pay_details: donor.receipt_tran_pay_details,
      receipt_remarks: donor.receipt_remarks,
      receipt_reason: donor.receipt_reason,
      receipt_occasional: donor.receipt_occasional,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();
    console.log(data);
    if (isValid) {
      try {
        const res = await axios.put(
          `${BaseUrl}/update-receipt-by-id/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.code == "201") {
          toast.success(" Updated Successfully");
          navigate("/cashrecepit");
        } else {
          toast.error("Error occurred");
        }
      } catch {
        toast.error("An error occurred, please try again.");
      }
    }
  };

  const handleBackButton = () => {
    navigate("/cashrecepit");
  };

  return (
    <Layout>
      <div>
        <div className="flex mb-4 mt-6">
          <MdKeyboardBackspace
            onClick={handleBackButton}
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
            Edit Recepit
          </h1>
        </div>

        <Card className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="text-gray-700">
                <strong>Name:</strong> {donor.donor.donor_full_name}
              </div>
              <div className="text-gray-700">
                <strong>PDS ID:</strong> {donor.donor.donor_fts_id}
              </div>
              <div className="text-gray-700">
                <strong>Pan No:</strong> {donor.donor.donor_pan_no}
              </div>
              <div className="text-gray-700">
                <strong>Receipt Date:</strong>{" "}
                {moment(donor.donor.donor_joining_date).format("DD-MM-YYYY")}
              </div>
              <div className="text-gray-700">
                <strong>Year:</strong> 2024-25
              </div>
              <div className="text-gray-700">
                <strong>Receipt Ref:</strong> {donor.receipt_ref_no}
              </div>
              <div className="text-gray-700">
                <strong>Exemption Type:</strong> {donor.receipt_exemption_type}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg ">
          <form
            id="addIndiv"
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="mb-4">
              <Fields
                required
                label="Total Amount"
                type="textField"
                value={donor.receipt_total_amount}
                onChange={(e) => onInputChange(e)}
                name="purchase_total_bill"
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                title="Transaction Type"
                type="whatsappDropdown"
                select
                options={pay_mode}
                value={donor.receipt_tran_pay_mode}
                onChange={(e) => onInputChange(e)}
                name="receipt_tran_pay_mode"
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                select
                title="Purpose"
                type="whatsappDropdown"
                name="receipt_donation_type"
                value={donor.receipt_donation_type}
                onChange={(e) => onInputChange(e)}
                options={donation_type}
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                label="Transaction Pay Details"
                type="textField"
                name="receipt_tran_pay_details"
                value={donor.receipt_tran_pay_details}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-4">
              <Fields
                required
                label="on Occasion"
                type="textField"
                name="receipt_occasional"
                value={donor.receipt_occasional}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                label="Remarks"
                type="textField"
                value={donor.receipt_remarks}
                onChange={(e) => onInputChange(e)}
                name="receipt_remarks"
              />
            </div>

            <div className="mb-4">
              <Fields
                required
                label="Reason"
                type="textField"
                name="recepit_reason"
                value={donor.receipt_reason}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </form>
          <div className="flex justify-center mt-4 space-x-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
        </div>
      </div>
    </Layout>
  );
};

export default EditRecepit;
