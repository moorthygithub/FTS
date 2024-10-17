import Layout from "../../../layout/Layout";
import { Card, Button } from "@material-tailwind/react";
import { LuDownload } from "react-icons/lu";
import { MdEmail, MdKeyboardBackspace } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import BASE_URL, { BaseUrl } from "../../../base/BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaWhatsapp } from "react-icons/fa";

function ViewMaterialRecepit() {
  const [receipts, setReceipts] = useState(null);
  const [company, setCompany] = useState({});
  const [donor, setDonor] = useState(null);
  const [recepitsub, setRecepitsub] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios({
      url: `${BaseUrl}/fetch-m-receipt-by-id/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setReceipts(res.data.receipts || {});
        setCompany(res.data.company || {});
        setDonor(res.data.donor);
        setRecepitsub(res.data.receiptSub || []);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
      });
  }, [id]);

  const downloadReceipt = (e) => {
    e.preventDefault();
    let check = (window.location.href = BaseUrl + "/download-receiptsm/" + id);
    if (check) {
      toast.success("Receipt Downloaded Successfully");
    } else {
      toast.error("Receipt Not Downloaded");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: BaseUrl + "/send-receiptm/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Email Sent Successfully");
    });
  };

  const printReceipt = (e) => {
    e.preventDefault();
    axios({
      url: BaseUrl + "/print-receiptm/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      window.open(BaseUrl + "/print-receiptm/" + id, "_blank");
    });
  };

  const whatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = donor.donor_whatsapp;
    const message = "Hello!";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-2 bg-white rounded-lg">
        <div className="flex flex-row justify-start items-center p-2">
          <MdKeyboardBackspace
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            onClick={() => navigate("/cashrecepit")}
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
            Material Receipt
          </h1>
        </div>
        <div
          className="flex justify-end "
          onClick={() => {
            navigate("/donor-list");
          }}
        >
          <Button variant="standard" color="red">
            Add New Recepit
          </Button>
        </div>
      </div>
      {receipts && (
        <div>
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
            <Button
              variant="text"
              className="flex items-center space-x-2"
              onClick={downloadReceipt}
              style={{
                display:
                  localStorage.getItem("user_type_id") == 4 ? "none" : "",
              }}
            >
              <LuDownload className="text-lg" />
              <span>Download</span>
            </Button>

            <Button
              variant="text"
              className="flex items-center space-x-2"
              onClick={whatsApp}
              style={{
                display:
                  localStorage.getItem("user_type_id") == 4 ? "none" : "",
              }}
            >
              <FaWhatsapp className="text-lg text-green-400" />
              <span className="text-green-400">Whatsapp</span>
            </Button>

            {/* Email Section */}
            <div className=" p-4">
              {donor !== null &&
                typeof donor !== "undefined" &&
                donor.donor_email !== null && (
                  <a>
                    <Button
                      variant="text"
                      className="flex items-center bg-green-400"
                      onClick={sendEmail}
                    >
                      <MdEmail className="text-lg" />
                      <span>Email</span>
                    </Button>
                    {receipts?.receipt_email_count == null ? (
                      <small style={{ fontSize: "10px" }}>
                        Email Sent 0 Times
                      </small>
                    ) : (
                      <small style={{ fontSize: "10px" }}>
                        Email Sent {receipts.receipt_email_count} Times
                      </small>
                    )}
                  </a>
                )}

              {receipts !== null &&
                typeof donor !== "undefined" &&
                donor.donor_email == null && (
                  <p style={{ color: "red" }}>
                    <i className="mr-10 ti-email"></i> Email not found
                  </p>
                )}
            </div>

            <Button
              variant="text"
              className="flex items-center space-x-2"
              onClick={printReceipt}
            >
              <IoIosPrint className="text-lg" />
              <span>Print Receipt</span>
            </Button>
          </div>
          <div className="flex justify-center">
            <Card className="p-4  w-[90%] ">
              <div className="border border-black">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-b border-r border-black px-4 py-2 h-20 flex items-center">
                    <strong>Receipt No:</strong>{" "}
                    {receipts.m_receipt_no || "N/A"}
                  </div>
                  <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                    <strong>Date:</strong>{" "}
                    {new Date(receipts.m_receipt_date).toLocaleDateString() ||
                      "N/A"}
                  </div>
                </div>

                <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                  <strong>Received with thanks from:</strong>{" "}
                  {donor?.donor_title} {donor?.donor_full_name}
                  {donor?.donor_city}-{donor?.donor_pin_code},{" "}
                  {donor?.donor_state}
                </div>

                <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                  <strong>Occasion of:</strong> {receipts.m_receipt_occasional}
                </div>

                <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                  <strong>Vehicle :</strong> {receipts.m_receipt_vehicle_no}
                </div>
                <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                  <strong>In Account of:</strong>{" "}
                  {recepitsub[0].purchase_sub_item}-
                  {recepitsub[0].purchase_sub_qnty}{" "}
                  {recepitsub[0].purchase_sub_unit}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-b  border-black px-4 py-2 h-20 flex items-center">
                    <strong>Donor Sign:</strong> ({donor?.donor_title}{" "}
                    {donor?.donor_full_name})
                  </div>
                  <div className="border-b border-black px-4 py-2 h-20 flex items-center">
                    <strong>Receiver Sign:</strong> ({company.company_authsign})
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ViewMaterialRecepit;
