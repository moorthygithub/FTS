import React, { useState, useEffect } from "react";
import CountUp from "react-countup"; // Import CountUp
import { Helmet } from "react-helmet-async";
import { Doughnut } from "react-chartjs-2";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL, { BaseUrl } from "../../base/BaseUrl";
import { Chart, ArcElement } from "chart.js";
import Layout from "../../layout/Layout";
import { Bar } from "react-chartjs-2";
import DonationBarChart from "./TotalOrderStats";

const NewsDashboard = () => {
  const [results, setResults] = useState([]);
  const [graph1, setGraph1] = useState([]);
  const [graph2, setGraph2] = useState([]);
  const [graph3, setGraph3] = useState([]);
  const [graph4, setGraph4] = useState([]);
  const [stock, setStock] = useState([]);

  const navigate = useNavigate();
  const dateyear = "2024-2025";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: `${BaseUrl}/fetch-dashboard-data-by/${dateyear}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setResults(response.data);
        setStock(response.data.stock);

        const test1 = [];
        const test2 = [];
        const test3 = [];
        const test4 = [];

        if (response.data.graphbar && Array.isArray(response.data.graphbar)) {
          response.data.graphbar.forEach((item) => {
            test1.push(item.c_receipt_sub_donation_type);
            test2.push(parseInt(item.total_amount));
          });
        }

        if (response.data.graphpie && Array.isArray(response.data.graphpie)) {
          response.data.graphpie.forEach((item) => {
            test3.push(item.c_receipt_tran_pay_mode);
            test4.push(parseInt(item.total_amount));
          });
        }

        setGraph1(test1);
        setGraph2(test2);
        setGraph3(test3);
        setGraph4(test4);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Layout>
      <div className="news-dashboard-wrapper mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Donor Count */}
          {results.length !== 0 && (
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 shadow rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Donor Count</h3>
              <p className="text-5xl font-bold">
                <CountUp
                  start={0}
                  end={results.total_donor_count}
                  duration={2.75}
                />
              </p>
            </div>
          )}
          {/* Total Website Donation */}
          {results.length !== 0 && (
            <div className="bg-gradient-to-r from-blue-400 to-orange-600 p-4 shadow rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Website Donation</h3>
              <p className="text-5xl font-bold">
                <CountUp
                  start={0}
                  end={results.total_website_donation}
                  duration={2.75}
                />
              </p>
            </div>
          )}
          {/* Total Material Donation */}
          {results.length !== 0 && (
            <div className="bg-gradient-to-r from-green-400 to-grey-600 p-4 shadow rounded-md text-center min-h-[150px] flex flex-col items-center justify-center ">
              <h3 className="text-xl font-bold">Total Material Donation</h3>
              <p className="text-5xl font-bold">
                <CountUp
                  start={0}
                  end={results.total_material_donation}
                  duration={2.75}
                />
              </p>
            </div>
          )}
          {/* Total Donation */}
          {results.length !== 0 && (
            <div className="bg-gradient-to-r from-yellow-400 to-pink-600 p-4 shadow rounded-md text-center min-h-[150px] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">Total Donation</h3>
              <p className="text-5xl font-bold">
                <CountUp
                  start={0}
                  end={results.total_donation}
                  duration={2.75}
                />
              </p>
            </div>
          )}
        </div>

        {/* Current Month Stocks */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold">Current Month Stocks (in Kgs)</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
            {stock.map((value, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow rounded-md text-center"
              >
                <span className="block font-bold text-lg">
                  <NumericFormat
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    displayType={"text"}
                    value={
                      value.openpurch -
                      value.closesale +
                      (value.purch - value.sale)
                    }
                  />
                </span>
                <span className="block text-sm">{value.item_name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Receipts Graphs */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-2 bg-white p-4 shadow rounded-md">
            <h3 className="text-xl font-bold mb-4">
              Donation Receipts (Bar Chart)
            </h3>
            <div>
              <DonationBarChart chartData={chartData} />
            </div>
          </div>

          <div className="col-span-1 bg-white p-4 shadow rounded-md">
            <h3 className="text-xl font-bold mb-4">
              Donation Receipts (Doughnut Chart)
            </h3>
            <Doughnut
              data={{
                labels: graph3,
                datasets: [
                  {
                    data: graph4,
                    backgroundColor: ["purple", "green", "blue", "orange"],
                  },
                ],
              }}
            />
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default NewsDashboard;
