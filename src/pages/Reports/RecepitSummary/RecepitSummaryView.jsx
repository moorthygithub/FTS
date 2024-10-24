import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "../../../components/common/PageTitle";
import { BaseUrl } from "../../../base/BaseUrl";
import { Spinner } from "@material-tailwind/react";
import Layout from "../../../layout/Layout";
import Moment from "moment";
import image1 from "../../../assets/receipt/fts.png";
import image2 from "../../../assets/receipt/top.png";
import image3 from "../../../assets/receipt/ekal.png";
import { NumericFormat } from "react-number-format";

const RecepitSummaryView = (props) => {
  const componentRef = useRef();
  const [donorsummary, setSummary] = useState([]);
  const [receiptsummary, setReceiptSummary] = useState({});
  const [grandtotal, setGrandtotal] = useState({});

  const [grandots, setGrandots] = useState([]);
  const [receiptTotalOTS, setReceiptTotalOTS] = useState([]);

  const [totalsummarygeneral, setTotalGeneral] = useState({});

  const [receiptTotalMembership, setReceiptTotalMembership] = useState([]);
  const [receiptsummaryfootertotal, setReceiptSummaryFooterTotal] = useState(
    []
  );
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const from_date = url.searchParams.get("from");
    const to_date = url.searchParams.get("to");

    console.log(from_date, to_date);

    const fetchData = async () => {
      if (!from_date || !to_date) {
        console.error("Promoter or date parameters are missing.");
        return;
      }

      try {
        const response = await axios.get(
          `${BaseUrl}/fetch-receiptsummary-by-id/${from_date}/${to_date}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(response.data.receipt);
        setReceiptSummary(response.data.receiptTotal);
        setGrandots(response.data.receipt_grand_total_ots);
        setTotalGeneral(response.data.recveiptTotalGeneral);
        setReceiptSummaryFooterTotal(response.data.receipt_grand_total_amount);
        setReceiptTotalOTS(response.data.receiptTotalOTS);
        setReceiptTotalMembership(response.data.receiptTotalMembership);
        setGrandtotal(response.data.receipt_grand_total_count);
        console.log(response.data.receipt_grand_total_count);
      } catch (error) {
        setError("Error fetching promoter summary. Please try again.");
        console.error("Error fetching promoter summary:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

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
          <PageTitleBar title="Promoter Summary" match={props.match} />
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
                        <b className="text-lg text-gray-600">RECPIT SUMMARY</b>
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

                <div ref={componentRef} className="my-5">
                  <table className="min-w-full border-collapse border border-black">
                    <thead>
                      <tr className="bg-gray-200">
                        {[
                          "Month",
                          "Recepit Type",
                          "NO of Recpits",
                          "No of OTS",
                          "Amount",
                        ].map((header) => (
                          <th
                            key={header}
                            className="border border-black px-4 py-2 text-center text-sm md:text-base"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {donorsummary.map((dataSumm) => (
                        <tr key={dataSumm.id}>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.month_year}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.receipt_donation_type}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.total_count}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.total_ots}
                          </td>

                          <td className="border border-black text-right px-4 text-sm md:text-base ">
                            <NumericFormat
                              value={dataSumm.total_amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              decimalScale={0}
                              fixedDecimalScale={true}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={2}
                          className="border border-black text-center font-bold text-sm md:text-base"
                        >
                          Total
                        </td>
                        {grandtotal.map((grandcount, key) => (
                          <td className="border border-black text-center text-sm md:text-base font-bold">
                            {grandcount.total_grand_count}
                          </td>
                        ))}
                        {grandots.map((footv, key) => (
                          <td className="border border-black text-center text-sm md:text-base font-bold">
                            {footv.total_no_of_ots}
                          </td>
                        ))}

                        {receiptsummaryfootertotal.map((foota, key) => (
                          <td className="border border-black text-right px-4 text-sm md:text-base font-bold">
                            <NumericFormat
                              value={foota.total_grand_amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              decimalScale={0}
                              fixedDecimalScale={true}
                            />
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="grid grid-cols-4 mt-6">
                  <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                    <b className="items-center text-center">
                      One Teacher School
                    </b>
                    {receiptTotalOTS.map((grandcount, key) => (
                      <NumericFormat
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        displayType={"text"}
                        prefix={"₹ "}
                        value={grandcount.total_ots_donation}
                        className="mt-2"
                      />
                    ))}
                  </div>

                  <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                    <b className="items-center text-center">Membership Fees</b>
                    {receiptTotalMembership.map((grandcount, key) => (
                      <NumericFormat
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        displayType={"text"}
                        prefix={"₹ "}
                        value={grandcount.total_membership_donation}
                        className="mt-2"
                      />
                    ))}
                  </div>

                  <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                    <b className="items-center text-center">Gn. Donation</b>
                    {totalsummarygeneral.map((grandcount, key) => (
                      <NumericFormat
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        displayType={"text"}
                        prefix={"₹ "}
                        value={grandcount.total_general_donation}
                        className="mt-2"
                      />
                    ))}
                  </div>

                  <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                    <b className="items-center text-center">Total</b>
                    {receiptsummary.map((grandcount, key) => (
                      <NumericFormat
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        displayType={"text"}
                        prefix={"₹ "}
                        value={grandcount.total_donation}
                        className="mt-2"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RecepitSummaryView;
