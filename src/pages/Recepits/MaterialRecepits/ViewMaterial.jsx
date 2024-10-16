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

function ViewMaterial() {
  const [receipts, setReceipts] = useState({});
  const [company, setCompany] = useState({});
  const [donor, setDonor] = useState({});
  const [receiptsSub, setReceiptsSub] = useState({});
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: `${BaseUrl}/fetch-m-receipt-by-id/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setReceipts(res.data.receipts);
        setCompany(res.data.company);
        setDonor(res.data.donor);
        setReceiptsSub(res.data.receiptSub);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
      });
  }, [id]);

  console.log(receipts.donor, "receipts");
  //DOWLOAD
  const downloadReceipt = (e) => {
    e.preventDefault();
    let check = (window.location.href = BaseUrl + "/download-receiptsm/" + id);
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
      url: BaseUrl + "/send-receipm/" + id,
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
      url: BaseUrl + "/print-receiptm/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      window.open(BaseUrl + "/print-receiptm/" + id, "_blank");
    });
  };

  console.log(
    donor.donor_full_name,
    donor.donor_address,
    donor.donor_city,
    donor.donor_pin_code,
    donor.donor_state,
    "console"
  );
  return (
    <Layout>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-2 bg-white rounded-lg">
        <div className="flex flex-row justify-start items-center p-2">
          <MdKeyboardBackspace
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            onClick={() => {
              navigate("/recepit-material");
            }}
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
            Material Receipt View
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
                <strong>Receipt No:</strong> {receipts.m_receipt_no || "N/A"}
              </div>
              <div className="border-b border-black px-4 py-2">
                <strong>Date:</strong>{" "}
                {new Date(receipts.m_receipt_date).toLocaleDateString() ||
                  "N/A"}
              </div>
            </div>

            <div className="border-b border-black px-4 py-4 h-20">
              <strong>Received with thanks from:</strong>
              {donor.donor_full_name}
              {donor.donor_address}
              {donor.donor_city}-{donor.donor_pin_code}
              {donor.donor_state}
            </div>
            <div className="border-b border-black px-4 py-2">
              <strong>Occasion of:</strong> {receipts.m_receipt_occasional}
            </div>
            <div className="border-b border-black px-4 py-2 ">
              <strong>Vehicle:</strong> {receipts.m_receipt_vehicle_no}
            </div>
            <div className="px-4 py-2">
              <strong>In account of:</strong> {receiptsSub.purchase_sub_item}
            </div>
          </div>{" "}
        </Card>
      </div>
    </Layout>
  );
}

export default ViewMaterial;
