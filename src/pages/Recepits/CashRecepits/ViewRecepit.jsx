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

function ViewCashRecepit() {
  const [receipts, setReceipts] = useState({});
  const [company, setCompany] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: `${BaseUrl}/fetch-receipt-by-id/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setReceipts(res.data.receipt);
        setCompany(res.data.company);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
      });
  }, [id]);

  console.log(receipts.donor, "receipts");
  //DOWLOAD
  const downloadReceipt = (e) => {
    e.preventDefault();
    let check = (window.location.href = BaseUrl + "/download-receipts/" + id);
    if (check) {
      toast.success("Receipt Downloaded Sucessfully");
    } else {
      toast.error("Receipt Not Downloaded");
    }
  };
  //EMAAIL
  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: BaseUrl + "/send-receipt/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Email Sent Sucessfully");
    });
  };

  //PRINT
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
  return (
    <Layout>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-2 bg-white rounded-lg">
        <div className="flex flex-row justify-start items-center p-2">
          <MdKeyboardBackspace
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            onClick={() => {
              navigate("/cashrecepit");
            }}
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
          >
            <LuDownload className="text-lg" />
            <span>Download</span>
          </Button>
          <Button
            variant="text"
            className="flex items-center space-x-2"
            onClick={sendEmail}
          >
            <MdEmail className="text-lg" />
            <span>Email</span>
          </Button>
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

      <div className="flex justify-center mt-4">
        <Card className="p-4 ">
          <div className="border border-black">
            <div className="grid grid-cols-1 md:grid-cols-2  ">
              <div className="border-b border-r border-black px-4 py-2 ">
                <strong>Receipt No:</strong> {receipts.receipt_no || "N/A"}
              </div>
              <div className="border-b border-black px-4 py-2">
                <strong>Date:</strong>{" "}
                {new Date(receipts.receipt_date).toLocaleDateString() || "N/A"}
              </div>
            </div>

            <div className="border-b border-black px-4 py-2">
              <strong>Received with thanks from:</strong>{" "}
              {receipts.donor?.donor_title}{" "}
              {receipts.donor?.donor_full_name || "N/A"}
              {receipts.donor?.donor_city || "N/A"}-
              {receipts.donor?.donor_pin_code || "N/A"},
              {receipts.donor?.donor_state || "N/A"}
            </div>
            <div className="border-b border-black px-4 py-2">
              <strong>Occasion of:</strong>{" "}
              {receipts.receipt_occasional || "N/A"}
            </div>
            <div className="border-b border-black px-4 py-2 ">
              <strong>On Account of:</strong> {receipts.receipt_reason || "N/A"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  ">
              <div className="border-b border-r border-black px-4 py-2">
                <strong>Pay Mode:</strong>{" "}
                {receipts.receipt_tran_pay_mode || "N/A"}
              </div>
              <div className="border-b border-black px-4 py-2  ">
                <strong>PAN:</strong> {receipts.donor?.donor_pan_no || "N/A"}
              </div>
            </div>
            <div className="border-b border-black px-4 py-2">
              <strong>Reference:</strong> {receipts.receipt_ref_no || "N/A"}
            </div>
            <div className="px-4 py-2">
              <strong>Amount:</strong> ${receipts.receipt_total_amount || "N/A"}
            </div>
          </div>{" "}
        </Card>
      </div>
    </Layout>
  );
}

export default ViewCashRecepit;
