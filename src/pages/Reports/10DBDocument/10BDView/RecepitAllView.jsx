import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import Moment from "moment";
import PageTitleBar from "../../../../components/common/PageTitle";
import image1 from "../../../../assets/receipt/fts.png";
import image2 from "../../../../assets/receipt/top.png";
import image3 from "../../../../assets/receipt/ekal.png";
import Layout from "../../../../layout/Layout";
import { BaseUrl } from "../../../../base/BaseUrl";

const ReceiptAllView = (props) => {
  const componentRef = useRef();
  const [donorSummary, setDonorSummary] = useState([]);
  const [receiptSummaryFooterOTS, setReceiptSummaryFooterOTS] = useState([]);
  const [receiptSummaryFooterTotal, setReceiptSummaryFooterTotal] = useState(
    []
  );
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = {
  //       receipt_from_date: localStorage.getItem("receipt_from_date"),
  //       receipt_to_date: localStorage.getItem("receipt_to_date"),
  //       receiptyear: localStorage.getItem("receiptyear"),
  //     };

  //     try {
  //       const response = await axios.post(
  //         `${BaseUrl}/fetch-donor-receipt-by-year`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           data,
  //         }
  //       );
  //       setDonorSummary(response.data.receipt);
  //       setReceiptSummaryFooterOTS(response.data.footerOTS); // Assuming this is the key for OTS footer data
  //       setReceiptSummaryFooterTotal(response.data.footerTotal); // Assuming this is the key for Total footer data
  //     } catch (error) {
  //       setError("Error fetching promoter summary. Please try again.");
  //       console.error("Error fetching promoter summary:", error);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    let data = {
      receipt_from_date: localStorage.getItem("receipt_from_date"),
      receipt_to_date: localStorage.getItem("receipt_to_date"),
      receiptyear: localStorage.getItem("receiptyear"),
    };

    axios({
      url: BaseUrl + "/fetch-donor-receipt-by-year",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setDonorSummary(res.data.receipt);
      setLoader(false);
    });
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
            <div className="w-full mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="invoice-logo">
                    <img src={image1} alt="logo" width="80" height="80" />
                  </div>
                  <div className="text-center">
                    <img src={image2} alt="header-logo" width="320px" />
                    <h2 className="pt-3 font-bold text-lg text-gray-600">
                      FORM No. 10BD
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    <img src={image3} alt="logo" width="80" height="80" />
                  </div>
                </div>

                {/* Table */}
                <div ref={componentRef} className="my-5">
                  <table className="min-w-full border-collapse border border-black">
                    <thead>
                      <tr className="bg-gray-200">
                        {[
                          "Unique Identification Number of the donor	",
                          "ID code",
                          "Section code",
                          "Name of donor",
                          "Address of donor",
                          "Donation Type",
                          "Mode of receipt",
                          "Amount of donation (Indian rupees)",
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
                      {donorSummary.map((dataSumm) => (
                        <tr key={dataSumm.id}>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.indicomp_pan_no}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            1
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            Section 80G
                          </td>
                          {dataSumm.indicomp_type != "Individual" && (
                            <td className="border border-black px-4 py-2 text-sm md:text-base">
                              M/s {dataSumm.indicomp_full_name}
                            </td>
                          )}
                          {
                            (dataSumm.indicomp_type = "Individual" && (
                              <td className="border border-black px-4 py-2 text-sm md:text-base">
                                {dataSumm.title}
                                {dataSumm.indicomp_full_name}
                              </td>
                            ))
                          }

                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.indicomp_res_reg_address}
                            {" ,"}
                            {dataSumm.indicomp_res_reg_area}
                            {" ,"}
                            {dataSumm.indicomp_res_reg_ladmark}
                            {" ,"}
                            {dataSumm.indicomp_res_reg_city}
                            {" - "}
                            {dataSumm.indicomp_res_reg_pin_code}
                            {" ,"}
                            {dataSumm.indicomp_res_reg_state}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.indicomp_corr_preffer == "Registered" && (
                              <>
                                {dataSumm.indicomp_res_reg_address}
                                {" ,"}
                                {dataSumm.indicomp_res_reg_area}
                                {" ,"}
                                {dataSumm.indicomp_res_reg_ladmark}
                                {" ,"}
                                {dataSumm.indicomp_res_reg_city}
                                {" - "}
                                {dataSumm.indicomp_res_reg_pin_code}
                                {" ,"}
                                {dataSumm.indicomp_res_reg_state}
                              </>
                            )}{" "}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_financial_year}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_donation_type}
                          </td>
                          <td className="border border-black text-center text-sm md:text-base">
                            {dataSumm.receipt_no_of_ots}
                          </td>
                          <td className="border border-black text-right px-4 text-sm md:text-base">
                            {dataSumm.receipt_total_amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={8}
                          className="border border-black text-center font-bold text-sm md:text-base"
                        >
                          Total
                        </td>
                        <td className="border border-black text-center text-sm md:text-base font-bold">
                          {receiptSummaryFooterOTS.map((footv) => (
                            <span key={footv.id}>{footv.total_no_of_ots}</span>
                          ))}
                        </td>
                        <td className="border border-black text-right px-4 text-sm md:text-base font-bold">
                          {receiptSummaryFooterTotal.map((foota) => (
                            <span key={foota.id}>
                              {foota.total_grand_amount}
                            </span>
                          ))}
                        </td>
                      </tr>
                    </tfoot>
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

export default ReceiptAllView;
