import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import Layout from "../../../layout/Layout";
import Fields from "../../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { BaseUrl } from "../../../base/BaseUrl";
import { Card, CardBody } from "@material-tailwind/react";
import moment from "moment";
import { Spinner } from "@material-tailwind/react";

const unit = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const EditMaterial = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState({
    m_receipt_date: "",
    indicomp_fts_id: "",
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_remarks: "",
    m_receipt_reason: "",
    m_receipt_sub_data: "",
    m_receipt_count: "",
    m_receipt_occasional: "",
    m_manual_receipt_no: "",
    m_receipt_vehicle_no: "",
    donor: {
      donor_full_name: "",
      donor_pan_no: "",
      donor_fts_id: "",
      m_receipt_ref_no: "",
    },
  });

  const useTemplate = {
    id: "",
    purchase_sub_item: "",
    purchase_sub_qnty: "",
    purchase_sub_unit: "",
    purchase_sub_amount: "",
  };

  const validateOnlyDigits = (inputtxt) =>
    /^\d+$/.test(inputtxt) || inputtxt.length === 0;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "m_receipt_total_amount" && validateOnlyDigits(value)) {
      setDonor({ ...donor, [name]: value });
    } else if (name !== "m_receipt_total_amount") {
      setDonor({ ...donor, [name]: value });
    }
  };

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUsers = users.map((user, i) =>
      index === i ? { ...user, [name]: value } : user
    );
    setUsers(updatedUsers);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      m_receipt_date: donor.m_receipt_date,
      indicomp_fts_id: donor.donor_fts_id,
      m_receipt_total_amount: donor.m_receipt_total_amount,
      m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
      m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
      m_receipt_remarks: donor.m_receipt_remarks,
      m_receipt_reason: donor.m_receipt_reason,
      m_receipt_count: donor.m_receipt_count,
      m_manual_receipt_no: donor.m_manual_receipt_no,
      m_receipt_sub_data: users,
      m_receipt_occasional: donor.m_receipt_occasional,
      m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
    };

    try {
      const res = await axios.put(`${BaseUrl}/update-m-receipt/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.code == "200") {
        toast.success("Updated Successfully");
        navigate("/recepit-material");
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      toast.error("An error occurred, please try again.");
    }
  };

  const handleBackButton = () => navigate("/recepit-material");

  // const [occasion, setOccasion] = useState([]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch(`${BaseUrl}/fetch-occasion`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setOccasion(data.occasion));
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/fetch-m-receipt-by-id/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { receipts, receiptSub, donor } = res.data;
        setDonor(receipts || {});
        setUsers(receiptSub || []);
        setDonors(donor || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [item, setItem] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BaseUrl}/fetch-item`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setItem(data.item));
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-12 w-12" color="purple" />
        </div>
      ) : (
        <div>
          <div className="flex mb-4 mt-6">
            <MdKeyboardBackspace
              onClick={handleBackButton}
              className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            />
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Edit Material
            </h1>
          </div>

          <Card className="p-6 mt-5 bg-white shadow-md rounded-lg">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text-gray-700">
                  <strong>Name:</strong> {donors.donor_full_name}
                </div>
                <div className="text-gray-700">
                  <strong>PDS ID:</strong> {donors.donor_fts_id}
                </div>
                <div className="text-gray-700">
                  <strong>Pan No:</strong> {donors.donor_pan_no || "NA"}
                </div>
                <div className="text-gray-700">
                  <strong>Receipt Date:</strong>{" "}
                  {moment(donor.m_receipt_date).format("DD-MM-YYYY")}
                </div>
                <div className="text-gray-700">
                  <strong>Year:</strong> {donor.m_receipt_financial_year}
                </div>
                <div className="text-gray-700">
                  <strong>Receipt Ref:</strong> {donor.m_receipt_ref_no}
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
            <form id="addIndiv" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4 ">
                  <Fields
                    required
                    label="Approx Value"
                    type="textField"
                    value={donor.m_receipt_total_amount}
                    onChange={onInputChange}
                    name="m_receipt_total_amount"
                  />
                </div>
                <div className="mb-4">
                  <Fields
                    required
                    label="Vehicle No"
                    type="textField"
                    value={donor.m_receipt_vehicle_no}
                    onChange={onInputChange}
                    name="m_receipt_vehicle_no"
                  />
                </div>
                <div className="mb-4">
                  <Fields
                    required
                    label="On Occasion"
                    type="textField"
                    value={donor.m_receipt_occasional}
                    onChange={onInputChange}
                    name="m_receipt_occasional"
                  />
                </div>
                <div className="mb-4">
                  <Fields
                    required
                    label="Remarks"
                    type="textField"
                    value={donor.m_receipt_remarks}
                    onChange={onInputChange}
                    name="m_receipt_remarks"
                  />
                </div>
              </div>

              {/* Mapping all items */}
              {users.map((user, index) => (
                <div key={index}>
                  <div className="mb-4">
                    <Fields
                      required
                      title="Item "
                      type="itemdropdown"
                      select
                      options={item}
                      value={user.purchase_sub_item}
                      onChange={(e) => onChange(e, index)}
                      name="purchase_sub_item"
                    />
                  </div>
                  <div className="mb-4">
                    <Fields
                      required
                      label="Quantity"
                      type="textField"
                      value={user.purchase_sub_qnty}
                      onChange={(e) => onChange(e, index)}
                      name="purchase_sub_qnty"
                    />
                  </div>
                  <div className="mb-4">
                    <Fields
                      required
                      select
                      title="Unit"
                      type="whatsappDropdown"
                      name="purchase_sub_unit"
                      value={user.purchase_sub_unit}
                      onChange={(e) => onChange(e, index)}
                      options={unit}
                    />
                  </div>
                </div>
              ))}

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
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EditMaterial;
