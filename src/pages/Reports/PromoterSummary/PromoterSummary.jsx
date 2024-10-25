import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../TaskManagerFilter";
import { useNavigate } from "react-router-dom";
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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onInputChange = (name, value) => {
    const updatedDonor = {
      ...downloadDonor,
      [name]: value,
    };
    setDonorDownload(updatedDonor);
    checkIfButtonShouldBeEnabled(updatedDonor);
  };

  const checkIfButtonShouldBeEnabled = (data) => {
    const { receipt_from_date, receipt_to_date, indicomp_promoter } = data;
    if (receipt_from_date && receipt_to_date && indicomp_promoter) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const onReportView = (e) => {
    e.preventDefault();
    if (document.getElementById("dowRecp").checkValidity()) {
      const { receipt_from_date, receipt_to_date, indicomp_promoter } =
        downloadDonor;
      localStorage.setItem("receipt_from_date_prm", receipt_from_date);
      localStorage.setItem("receipt_to_date_prm", receipt_to_date);
      localStorage.setItem("indicomp_full_name_prm", indicomp_promoter);
      navigate("/d-summary-view");
    }
  };

  useEffect(() => {
    const theLoginToken = localStorage.getItem("token");
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

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_promoter: downloadDonor.indicomp_promoter,
      receipt_from_date: downloadDonor.receipt_from_date,
      receipt_to_date: downloadDonor.receipt_to_date,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      axios({
        url: BaseUrl + "/download-promoter-summary",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "promoter_summary.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Promoter Summary is Downloaded Successfully");
        })
        .catch(() => {
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
              required
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
              onChange={(e) =>
                onInputChange("receipt_from_date", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <Input
              type="date"
              label="To Date"
              required
              className="required"
              value={downloadDonor.receipt_to_date}
              onChange={(e) => onInputChange("receipt_to_date", e.target.value)}
              name="receipt_to_date"
            />
          </div>

          <div className="w-full">
            <Button
              color="blue"
              fullWidth
              onClick={onSubmit}
              disabled={!isButtonEnabled}
            >
              Download
            </Button>
          </div>

          <div className="w-full">
            <Button
              color="blue"
              fullWidth
              onClick={onReportView}
              disabled={!isButtonEnabled}
            >
              View
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default PromterSummary;
