import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PageTitleBar from "../../../components/common/PageTitle";
import { BaseUrl } from "../../../base/BaseUrl";
import { Spinner } from "@material-tailwind/react";
import Layout from "../../../layout/Layout";
import image1 from "../../../assets/receipt/fts.png";
import image2 from "../../../assets/receipt/top.png";
import image3 from "../../../assets/receipt/ekal.png";
import { FaArrowLeft } from "react-icons/fa6";
import CustomPivotTable from "./CustomPivotTable";

const DonationSummaryView = (props) => {
  const [donorsummary, setSummary] = useState([]);
  const [receiptsummary, setReceiptSummary] = useState({});

  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const from_date = localStorage.getItem("receipt_from_date");
    const to_date = localStorage.getItem("receipt_to_date");

    console.log(from_date, to_date);

    const fetchData = async () => {
      if (!from_date || !to_date) {
        console.error("Promoter or date parameters are missing.");
        return;
      }

      try {
        const response = await axios.get(
          `${BaseUrl}/fetch-donationsummary-by-id/${from_date}/${to_date}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(response.data.receipt);
      } catch (error) {
        setError("Error fetching promoter summary. Please try again.");
        console.error("Error fetching promoter summary:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);
  const dataSourceSettings = {
    columns: [{ name: "receipt_donation_type", caption: "Donation Type" }],
    dataSource: receiptsummary,
    expandAll: true,
    filters: [],
    rows: [{ name: "receipt_financial_year" }],
    values: [{ name: "total_amount", caption: "Amount" }],
    showCaption: false,
  };

  return (
    <Layout>
      {loader && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {!loader && error && (
        <div className="text-red-600 text-center">{error}</div>
      )}
      {!loader && !error && (
        <div className="invoice-wrapper">
          <PageTitleBar
            title="Donation Summary"
            match={props.match}
            icon={FaArrowLeft}
            backLink="/report/donation"
          />
          <div className="flex flex-col items-center">
            <div className="w-full mx-auto ">
              <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto  grid sm:grid-cols-1 1fr">
                <div className="flex justify-between items-center mb-4 ">
                  <div className="invoice-logo">
                    <img
                      src={image1}
                      alt="session-logo"
                      width="80"
                      height="80"
                    />
                  </div>
                  <div className="address text-center">
                    <img src={image2} alt="session-logo" width="320px" />
                    <h2 className="pt-3">
                      <strong>
                        <b className="text-lg text-gray-600">
                          DONATION SUMMARY
                        </b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    <img
                      src={image3}
                      alt="session-logo"
                      width="80"
                      height="80"
                    />
                  </div>
                </div>

                <div>
                  <CustomPivotTable data={donorsummary} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DonationSummaryView;
