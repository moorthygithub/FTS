import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "../../../components/common/PageTitle";
import { BaseUrl } from "../../../base/BaseUrl";
import { Button, Spinner } from "@material-tailwind/react";
import Layout from "../../../layout/Layout";
import Moment from "moment";
import image1 from "../../../assets/receipt/fts.png";
import image2 from "../../../assets/receipt/top.png";
import image3 from "../../../assets/receipt/ekal.png";
import { FaArrowLeft } from "react-icons/fa6";
import html2pdf from "html2pdf.js";

const DonorSummaryView = (props) => {
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
      const receiptFromDate = localStorage.getItem("receipt_from_date_indv");
      const receiptToDate = localStorage.getItem("receipt_to_date_indv");
      const indicompFullName = localStorage.getItem("indicomp_full_name_indv");

      try {
        const response = await axios.get(
          `${BaseUrl}/fetch-donorsummary-by-id/${indicompFullName}/${receiptFromDate}/${receiptToDate}`,
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
  // const downloadPDF = () => {
  //   const element = componentRef.current;
  //   const opt = {
  //     margin: 0.5,
  //     filename: "DonorSummary.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2, useCORS: true },
  //     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //   };

  //   html2pdf()
  //     .from(element)
  //     .set(opt)
  //     .save()
  //     .catch((error) => console.error("PDF generation error:", error));
  // };

  // const PrintReceipt = () => {
  //   const printContent = componentRef.current;
  //   const printWindow = window.open("", "", "height=1000,width=800");

  //   printWindow.document.write("<html><head><title>Print Receipt</title>");

  //   // Add CSS styles to the print window
  //   const styles = Array.from(document.styleSheets)
  //     .map((styleSheet) => {
  //       try {
  //         return Array.from(styleSheet.cssRules)
  //           .map((rule) => rule.cssText)
  //           .join("");
  //       } catch (e) {
  //         console.log(
  //           "Accessing cross-origin styles is not allowed, skipping."
  //         );
  //         return "";
  //       }
  //     })
  //     .join("");
  //   printWindow.document.write(`<style>${styles}</style>`);
  //   printWindow.document.write("</head><body style='margin: 0; padding: 0;'>");
  //   printWindow.document.write(printContent.innerHTML);
  //   printWindow.document.write("</body></html>");
  //   printWindow.document.close();

  //   // Add a short delay to ensure the content is fully loaded before printing
  //   printWindow.onload = () => {
  //     setTimeout(() => {
  //       printWindow.print();
  //       printWindow.close();
  //     }, 500); // Adjust delay as needed
  //   };
  // };
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
            title="Donor Summary"
            match={props.match}
            icon={FaArrowLeft}
            backLink="/report/donorsummary"
          />
          {/* <ReactToPrint
            trigger={() => (
              <button className="flex items-center border  border-blue-500 hover:border-green-500 hover:animate-pulse p-2 rounded-lg">
                <Print className="mr-2" size={16} />
                Print
              </button>
            )}
            content={() => componentRef.current}
          /> */}
          <Button onClick={downloadPDF}>PDF</Button>
          <Button onClick={PrintReceipt}>print</Button>
          <div className="flex flex-col items-center" ref={componentRef}>
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
                        <b className="text-lg text-gray-600">DONOR SUMMARY</b>
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
                        {" "}
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
                          <>
                            {" "}
                            {individ.title} {individ.indicomp_com_contact_name}
                          </>
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
                            className="border border-black  py-2 text-center text-sm md:text-base"
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
                            {footv.total_no_of_ots}
                          </td>
                        ))}

                        {receiptsummaryfootertotal.map((foota, key) => (
                          <td
                            className="border border-black text-right px-4 text-sm md:text-base font-bold"
                            colSpan={2}
                          >
                            {foota.total_grand_amount}{" "}
                          </td>
                        ))}
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
                      {donorsummary.map((dataSumm) => (
                        <tr key={dataSumm.id}>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
                            {dataSumm.receipt_financial_year}
                          </td>
                          <td className="border border-black px-4 py-2 text-sm md:text-base">
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

export default DonorSummaryView;
