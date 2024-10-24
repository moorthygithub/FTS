import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";
import { Input, Button } from "@material-tailwind/react";
import Dropdown from "../../../components/common/DropDown";
import moment from "moment";
import { BaseUrl } from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import axios from "axios";

const PromterSummary = () => {
  const navigate = useNavigate();
  const [promoter, setPromoters] = useState([]);
  const todayback = moment().format("YYYY-MM-DD");
  const firstdate = moment().startOf("month").format("YYYY-MM-DD");
  const [downloadDonor, setDonorDownload] = useState({
    receipt_from_date: firstdate,
    receipt_to_date: todayback,
    indicomp_promoter: "",
  });
  const onInputChange = (name, value) => {
    setDonorDownload({
      ...downloadDonor,
      [name]: value,
    });
  };
  //VIEW
  // const onReportView = (e) => {
  //   e.preventDefault();
  //   if (document.getElementById("dowRecp").checkValidity()) {
  //     const { receipt_from_date, receipt_to_date, indicomp_promoter } =
  //       downloadDonor;
  //     navigate(
  //       `/d-summary-view?from=${receipt_from_date}&to=${receipt_to_date}&promoter=${indicomp_promoter}`
  //     );

  //   }
  // };

  const onReportView = (e) => {
    e.preventDefault();
    if (document.getElementById("dowRecp").checkValidity()) {
      const { receipt_from_date, receipt_to_date, indicomp_promoter } =
        downloadDonor;
      navigate(
        `/d-summary-view?from=${receipt_from_date}&to=${receipt_to_date}&promoter=${indicomp_promoter}`
      );
      console.log(
        `/d-summary-view?from=${receipt_from_date}&to=${receipt_to_date}&promoter=${indicomp_promoter}`,
        "console"
      );
    }
  };

  useEffect(() => {
    var theLoginToken = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BaseUrl + "/fetch-promoter", requestOptions)
      .then((response) => response.json())
      .then((data) => setPromoters(data.promoter));
  }, []);
  //DOWNLOAD
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_promoter: downloadDonor.indicomp_promoter,
      receipt_from_date: downloadDonor.receipt_from_date,
      receipt_to_date: downloadDonor.receipt_to_date,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();

    if (v) {
      axios({
        url: BaseUrl + "/download-promoter-summary",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          console.log("data : ", res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "promoter_summary.csv"); //or any other extension
          document.body.appendChild(link);
          link.click();
          toast.success("Promoter Summary is Downloaded Successfully");
        })
        .catch((err) => {
          toast.error("Promoter Summary is Not Downloaded");
        });
    }
  };

  return (
    <Layout>
      <TaskManagerFilter />
      <div className="mt-4 mb-6">
        <PageTitle title={"Prompter Summary"} />
      </div>

      <form id="dowRecp" autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="w-full">
            <Dropdown
              label="Donor Type"
              className="required"
              value={downloadDonor.indicomp_promoter}
              options={promoter.map((item) => ({
                value: item.indicomp_promoter,
                label: item.indicomp_promoter,
              }))}
              name="indicomp_promoter"
              onChange={(value) => onInputChange("indicomp_promoter", value)}
            />
          </div>

          <div className="w-full">
            <Input
              type="date"
              label="From Date "
              className="required"
              required
              name="receipt_from_date"
              value={downloadDonor.receipt_from_date}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="w-full">
            <Input
              type="date"
              label="To Date"
              required
              className="required"
              value={downloadDonor.receipt_to_date}
              onChange={(e) => onInputChange(e)}
              name="receipt_to_date"
            />
          </div>
          <div className="w-full">
            <Button color="blue" fullWidth onClick={onSubmit}>
              Download
            </Button>
          </div>
          <div className="w-full">
            <Button color="blue" fullWidth onClick={onReportView}>
              View
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default PromterSummary;
