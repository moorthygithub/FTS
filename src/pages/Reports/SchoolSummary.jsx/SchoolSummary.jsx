import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../TaskManagerFilter"
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/common/PageTitle";
import { Input, Button } from "@material-tailwind/react";
import Dropdown from "../../../components/common/DropDown";
import moment from "moment";
import { BaseUrl } from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import axios from "axios";

const SchoolSummary = () => {
  const navigate = useNavigate();
  const [individual, setIndividuals] = useState([]);
  const [downloadDonor, setDonorDownload] = useState({
    indicomp_full_name: "",
  });
  const onInputChange = (name, value) => {
    setDonorDownload({
      ...downloadDonor,
      [name]: value,
    });
  };
  //VIEW
  const onReportView = (e) => {
    e.preventDefault();
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      localStorage.setItem(
        "receipt_from_date",
        downloadDonor.receipt_from_date
      );
      localStorage.setItem("receipt_to_date", downloadDonor.receipt_to_date);
      navigate("/d-summary-view");
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

    fetch(BaseUrl + "/fetch-school-allot-year-donor'", requestOptions)
      .then((response) => response.json())
      .then((data) => setIndividuals(data.schoolallot));
  }, []);
  //DOWNLOAD
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        indicomp_full_name: downloadDonor.indicomp_full_name,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();

    if (v) {
      axios({
        url: BaseUrl + "/download-school-summary",
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
          link.setAttribute("download", "school_summary.csv"); //or any other extension
          document.body.appendChild(link);
          link.click();
          toast.success("School Summary is Downloaded Successfully");
        })
        .catch((err) => {
          toast.error("School Summary is Not Downloaded");
        });
    }
  };

  return (
    <Layout>
      <TaskManagerFilter />
      <div className="mt-4 mb-6">
        <PageTitle title={"School Summary"} />
      </div>

      <form id="dowRecp" autoComplete="off">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="w-full">
            <Dropdown
              label="Donor "
              className="required"
              value={downloadDonor.indicomp_full_name}
              options={individual.map((item) => ({
                value: item.indicomp_promoter,
                label: item.indicomp_promoter,
              }))}
              name="indicomp_full_name"
              onChange={(value) => onInputChange("indicomp_full_name", value)}
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

export default SchoolSummary;
