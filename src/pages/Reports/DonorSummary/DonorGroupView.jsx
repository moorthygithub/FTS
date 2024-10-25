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
import { FaArrowLeft } from "react-icons/fa6";
import moment from "moment";

const DonorGroupView = (props) => {
  const componentRef = useRef();
  const [donorsummary, setSummary] = useState([]);
  const [receiptsummary, setReceiptSummary] = useState({});
  const [individual, setIndividual] = useState([]);
  const [receiptsummaryfooterOTS, setReceiptSummaryFooterOTS] = useState([]);
  const [receiptsummaryfootertotal, setReceiptSummaryFooterTotal] = useState(
    []
  );
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const receiptFromDate = localStorage.getItem("receipt_from_date_grp");
      const receiptToDate = localStorage.getItem("receipt_to_date_grp");
      const indicompFullName = localStorage.getItem("indicomp_full_name_grp");

      try {
        const response = await axios.get(
          `${BaseUrl}/fetch-donorgroupsummary-by-id/${indicompFullName}/${receiptFromDate}/${receiptToDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(response.data.receipt);
        setReceiptSummary(response.data.receipt_total);
        setIndividual(response.data.individual_Company);
        setReceiptSummaryFooterOTS(response.data.receipt_grand_total_ots);
        setReceiptSummaryFooterTotal(response.data.receipt_grand_total_amount);
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
          <PageTitleBar
            title="Donor Group Summary"
            match={props.match}
            icon={FaArrowLeft}
            backLink="/report/donorsummary"
          />
          <div className="flex flex-col items-center ">
            <div className="w-full mx-auto ">
              <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto  grid md:grid-cols-1 1fr">
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
                          DONOR GROUP SUMMARY
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

                {individual.map((individ, key) => (
                  <div className="grid grid-cols-5 mt-6" key={key}>
                    <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                      <b className="items-center text-center">Full Name :</b>
                      <span>
                        {individ.indicomp_type == "Individual" && (
                          <>
                            {individ.title} {individ.indicomp_full_name}
                          </>
                        )}
                        {individ.indicomp_type != "Individual" && (
                          <> M/s {individ.indicomp_full_name}</>
                        )}
                      </span>
                    </div>

                    <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                      <b className="items-center text-center">
                        Contact Person/Spouse :
                      </b>
                      <span>
                        {individ.indicomp_type == "Individual" && (
                          <> {individ.indicomp_spouse_name}</>
                        )}
                        {individ.indicomp_type != "Individual" && (
                          <> {individ.indicomp_com_contact_name}</>
                        )}
                      </span>
                    </div>

                    <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                      <b className="items-center text-center">Mobile :</b>
                      <span>{individ.indicomp_mobile_phone}</span>
                    </div>

                    <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                      <b className="items-center text-center">PAN Number :</b>
                      <span>{individ.indicomp_pan_no}</span>
                    </div>

                    <div className="col-xl-3 flex items-center flex-col mb-4 md:mb-0">
                      <b className="items-center text-center">Promoter :</b>
                      <span>{individ.indicomp_promoter}</span>
                    </div>
                  </div>
                ))}

                <div ref={componentRef} className="my-5">
                  <table className="min-w-full border-collapse border border-black">
                    <thead>
                      <tr className="bg-gray-200">
                        {[
                          "Receipt Date",
                          "Receipt No",
                          "Donor",
                          "Promoter",
                          "Year",
                          "Amount",
                          "Exemption Type",
                          "Donation Type",
                          "No of OTS",
                          "Pay Mode",
                          "Pay Details",
                          "Realization Date",
                          "Reason",
                          "Remarks",
                        ].map((header) => (
                          <th
                            key={header}
                            className="border border-black px-2 py-2 text-center text-sm md:text-base"
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
                            {Moment(dataSumm.receipt_date).format("DD-MM-YYYY")}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.receipt_no}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.indicomp_full_name}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.indicomp_promoter}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.receipt_financial_year}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.receipt_total_amount}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_exemption_type}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_donation_type}{" "}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_no_of_ots}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_tran_pay_mode}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_tran_pay_details}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_realization_date != null && (
                              <>
                                {Moment(
                                  dataSumm.receipt_realization_date
                                ).format("DD-MM-YYYY")}
                              </>
                            )}
                            {dataSumm.receipt_realization_date == null && (
                              <>{dataSumm.receipt_realization_date}</>
                            )}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_reason}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-black text-center font-bold text-sm md:text-base"
                        >
                          Total
                        </td>
                        {receiptsummaryfooterOTS.map((footv, key) => (
                          <td className="border border-black text-center text-sm md:text-base font-bold">
                            {footv.total_grand_amount}
                          </td>
                        ))}

                        <td
                          className="border border-black text-right px-4 text-sm md:text-base font-bold"
                          colSpan={2}
                        ></td>
                        <td
                          className="border border-black text-right px-4 text-sm md:text-base font-bold"
                          colSpan={2}
                        ></td>
                        {receiptsummaryfooterOTS.map((footv, key) => (
                          <td className="border border-black text-center text-sm md:text-base font-bold">
                            {footv.total_no_of_ots}
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* //TABLE BELOW */}
                <div className="flex justify-center items-center  ">
                  <b className="text-lg text-gray-600">TOTAL</b>
                </div>

                <div ref={componentRef} className="my-5 ">
                  <table className="min-w-full border-collapse border border-black">
                    <thead>
                      <tr className="bg-gray-200">
                        {["Year", "Total  Amount"].map((header) => (
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
                      {receiptsummary.map((dataSumm) => (
                        <tr key={dataSumm.id}>
                          <td className="border border-black px-4 py-2 text-sm md:text-base text-center">
                            {dataSumm.receipt_financial_year}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base text-center">
                            {dataSumm.receipt_total_amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DonorGroupView;
