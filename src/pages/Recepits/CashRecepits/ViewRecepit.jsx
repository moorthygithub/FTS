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

function ViewCashRecepit() {
  const [receipts, setReceipts] = useState(null); // Set initial state to null
  const [company, setCompany] = useState({});
  const [donor, setDonor] = useState(null);
  const [recepitsub, setRecepitsub] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Use state to control the Dialog visibility
  const [email, setEmail] = useState(""); // For the input email

  useEffect(() => {
    axios({
      // url: `${BaseUrl}/fetch-receipt-by-id/${id}`,
      url: `${BaseUrl}/fetch-c-receipt-by-id/${id}`,

      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setReceipts(res.data.receipts || {}); // Default to empty object
        setCompany(res.data.company || {}); // Default to empty object
        setDonor(res.data.donor);
        setRecepitsub(res.data.receiptSub);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
      });
  }, [id]);
  const downloadReceipt = (e) => {
    e.preventDefault();
    let check = (window.location.href = BaseUrl + "/download-receipts/" + id);
    if (check) {
      toast.success("Receipt Downloaded Sucessfully");
    } else {
      toast.error("Receipt Not Downloaded");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: BaseUrl + "/send-receipt/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        toast.success("Email Sent Sucessfully");
      })
      .catch((error) => {
        toast.error("Error sending email");
        console.error("Email error:", error);
      });
  };

  const printReceipt = (e) => {
    e.preventDefault();
    axios({
      url: BaseUrl + "/print-receipt/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      window.open(BaseUrl + "/print-receipt/" + id, "_blank");
    });
  };

  const openModal = () => {
    setShowModal(true);
    localStorage.setItem("ftsid", receipts?.donor?.donor_fts_id + "");
  };
  const closeModal = () => setShowModal(false);

  const handleAddEmail = () => {
    toast.success("Email added successfully!");
    closeModal();
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
            Cash Receipt
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
          <Button
            variant="text"
            className="flex items-center space-x-2"
            onClick={downloadReceipt}
            style={{
              display: localStorage.getItem("user_type_id") == 4 ? "none" : "",
            }}
          >
            <LuDownload className="text-lg" />
            <span>Download</span>
          </Button>

          {receipts?.donor?.donor_email ? (
            <a onClick={sendEmail}>
              <i className="mr-10 ti-email"></i> Email
              <br />
              {receipts?.receipt_email_count == null ? (
                <small style={{ fontSize: "10px" }}>Email Sent 0 Times</small>
              ) : (
                <small style={{ fontSize: "10px" }}>
                  Email Sent {receipts.receipt_email_count} Times
                </small>
              )}
            </a>
          ) : (
            <>
              <p style={{ color: "red" }}>
                <i className="mr-10 ti-email"></i> Email not found
              </p>
              <Button onClick={openModal} className="mr-10 mb-10" color="green">
                Add Email
              </Button>
            </>
          )}

          <Dialog open={showModal} handler={closeModal}>
            <DialogHeader>Add Donor Email</DialogHeader>
            <DialogBody>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter donor email"
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </DialogBody>
            <DialogFooter>
              <Button color="blue" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="green" onClick={handleAddEmail}>
                Add Email
              </Button>
            </DialogFooter>
          </Dialog>

          <Button
            variant="text"
            className="flex items-center space-x-2"
            onClick={printReceipt}
          >
            <IoIosPrint className="text-lg" />
            <span>Print Receipt</span>
          </Button>
        </div>
      </div>

      {receipts && (
        <div className="flex justify-center mt-4">
          <Card className="p-4 ">
            <div className="border border-black">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-b border-r border-black px-4 py-2">
                  <strong>Receipt No:</strong> {receipts.c_receipt_no || "N/A"}
                </div>
                <div className="border-b border-black px-4 py-2">
                  <strong>Date:</strong>{" "}
                  {new Date(receipts.c_receipt_date).toLocaleDateString() ||
                    "N/A"}
                </div>
              </div>

              <div className="border-b border-black px-4 py-2">
                <strong>Received with thanks from:</strong> {donor?.donor_title}
                {donor?.donor_full_name}
                {donor?.donor_city}-{donor?.donor_pin_code},{" "}
                {donor?.donor_state}
              </div>

              <div className="border-b border-black px-4 py-2">
                <strong>Occasion of:</strong>{" "}
                {receipts.c_receipt_occasional || "N/A"}
              </div>
              <div className="border-b border-black px-4 py-2">
                <strong>On Account of:</strong>{" "}
                {/* {recepitsub.c_receipt_sub_donation_type || "N/A"} */}
                {"name account not came "}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-b border-r border-black px-4 py-2">
                  <strong>Pay Mode:</strong>{" "}
                  {receipts.c_receipt_tran_pay_mode || "N/A"}
                </div>
                <div className="border-b border-black px-4 py-2">
                  <strong>PAN:</strong> {company.company_pan_no || "N/A"}
                </div>
              </div>

              <div className="border-b border-black px-4 py-2">
                <strong>Reference:</strong> {receipts.c_receipt_ref_no || "N/A"}
              </div>
              <div className="px-4 py-2">
                <strong>Amount:</strong> {receipts.c_receipt_total_amount}
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}

export default ViewCashRecepit;
