import Layout from "../../layout/Layout";
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";
import { LuDownload } from "react-icons/lu";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { BaseUrl } from "../../base/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";

const TABLE_HEAD = [
  "Items Name",
  "Open Balance",
  "Received",
  "Consumption",
  "Close Balance",
];

function ViewStockSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stocksummary, setStockSummary] = useState([]);
  const [loader, setLoader] = useState(true);
  const [from_date, setFromDate] = useState("");
  const [to_date, setToDate] = useState("");

  const downloadReceipt = (e) => {
    e.preventDefault();
    window.location.href = `${BaseUrl}/download-receipts/${id}`;
    toast.success("Receipt Downloaded Successfully");
  };

  const printReceipt = (e) => {
    e.preventDefault();
    window.open(`${BaseUrl}/print-receipt/${id}`, "_blank");
  };

  // DATA FOR THE TABLE
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user_type_id");
    if (!isLoggedIn) {
      window.location = "/signin";
      return;
    }

    const data = {
      receipt_from_date: localStorage.getItem("receipt_from_date"),
      receipt_to_date: localStorage.getItem("receipt_to_date"),
    };

    setFromDate(moment(data.receipt_from_date).format("DD-MM-YYYY"));
    setToDate(moment(data.receipt_to_date).format("DD-MM-YYYY"));

    axios({
      url: `${BaseUrl}/fetch-stock-summary`,
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setStockSummary(res.data.stock);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching stock summary:", error);
        setLoader(false);
      });
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-2 bg-white rounded-lg">
        <div className="flex flex-row justify-start p-2">
          <MdKeyboardBackspace
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
            onClick={() => navigate("/stock-summary")}
          />
          <h1 className="text-xl md:text-2xl text-[#464D69] font-semibold ml-2">
            Stock Summary (In Kgs)
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
            onClick={printReceipt}
          >
            <IoIosPrint className="text-lg" />
            <span>Print Receipt</span>
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Card className="p-4 w-full overflow-x-auto">
          {loader ? (
            <div className="flex justify-center items-center h-64">
              <Spinner className="h-12 w-12" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex justify-center">
                <div className="p-4 text-xl md:text-2xl flex justify-center font-bold">
                  Stock Summary - From : {from_date}To :{to_date}
                </div>
              </div>
              <table className="min-w-full text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stocksummary.length > 0 ? (
                    stocksummary.map((stockItem, index) => {
                      const { item_name, openpurch, purch, sale, closesale } =
                        stockItem;
                      const isLast = index === stocksummary.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      const numberFormatter = new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      });

                      return (
                        <tr key={item_name}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item_name}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {numberFormatter.format(openpurch)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {numberFormatter.format(purch)}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {numberFormatter.format(sale)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {numberFormatter.format(closesale)}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}

export default ViewStockSummary;
