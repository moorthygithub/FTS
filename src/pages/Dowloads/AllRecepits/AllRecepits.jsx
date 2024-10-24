import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import Moment from "moment";
import { useState, useEffect } from "react";
import { BaseUrl } from "../../../base/BaseUrl";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../download/DeliveryDownload";

function AllRecepits() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    navigate("-1");
  };
  const donation_type = [
    {
      value: "One Teacher School",
      label: "One Teacher School",
    },
    {
      value: "General",
      label: "General",
    },
    {
      value: "Membership",
      label: "Membership",
    },
  ];
  const exemption = [
    {
      value: "80G",
      label: "80G",
    },
    {
      value: "Non 80G",
      label: "Non 80G",
    },
    {
      value: "FCRA",
      label: "FCRA",
    },
  ];
  const ots_range_from = [
    {
      value: "0",
      label: "All",
    },
    {
      value: "1",
      label: "1",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "12",
      label: "12",
    },
    {
      value: "22",
      label: "22",
    },
    {
      value: "32",
      label: "32",
    },
    {
      value: "42",
      label: "42",
    },
    {
      value: "52",
      label: "52",
    },
    {
      value: "62",
      label: "62",
    },
    {
      value: "72",
      label: "72",
    },
    {
      value: "82",
      label: "82",
    },
  ];

  const ots_range_to = [
    {
      value: "5000",
      label: "All",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "11",
      label: "11",
    },
    {
      value: "21",
      label: "21",
    },
    {
      value: "31",
      label: "31",
    },
    {
      value: "41",
      label: "41",
    },
    {
      value: "51",
      label: "51",
    },
    {
      value: "61",
      label: "61",
    },
    {
      value: "71",
      label: "71",
    },
    {
      value: "81",
      label: "81",
    },
    {
      value: "50001",
      label: "50001",
    },
  ];

  const amount_range = [
    {
      value: "0-100000000",
      label: "All",
    },
    {
      value: "1-10000",
      label: "1-10000",
    },
    {
      value: "10001-20000",
      label: "10000-20000",
    },
    {
      value: "20001-30000",
      label: "20001-30000",
    },
    {
      value: "30001-50000",
      label: "30001-50000",
    },
    {
      value: "50001-100000",
      label: "50001-100000",
    },
    {
      value: "100001-100000000",
      label: "100001-Above",
    },
  ];

  const donor_type = [
    {
      value: "Member",
      label: "Member",
    },
    {
      value: "Donor",
      label: "Donor",
    },
    {
      value: "Member+Donor",
      label: "Member+Donor",
    },
    {
      value: "None",
      label: "None",
    },
  ];
  //FROM AND TO DATE
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [receiptsdwn, setAllReceiptDownload] = useState({
    receipt_from_date: firstdate,
    receipt_to_date: todayback,
    receipt_donation_type: "",
    receipt_exemption_type: "",
    receipt_amount_range: "0-100000000",
    receipt_ots_range_from: "0",
    receipt_ots_range_to: "5000",
    indicomp_donor_type: "",
    indicomp_promoter: "",
    chapter_id: "",
    indicomp_source: "",
  });

  const onInputChange = (e) => {
    setAllReceiptDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      receipt_from_date: receiptsdwn.receipt_from_date,
      receipt_to_date: receiptsdwn.receipt_to_date,
      receipt_donation_type: receiptsdwn.receipt_donation_type,
      receipt_exemption_type: receiptsdwn.receipt_exemption_type,
      receipt_amount_range: receiptsdwn.receipt_amount_range,
      receipt_ots_range_from: receiptsdwn.receipt_ots_range_from,
      receipt_ots_range_to: receiptsdwn.receipt_ots_range_to,
      indicomp_donor_type: receiptsdwn.indicomp_donor_type,
      indicomp_promoter: receiptsdwn.indicomp_promoter,
      chapter_id: receiptsdwn.chapter_id,
      indicomp_source: receiptsdwn.indicomp_source,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BaseUrl + "/download-receipt-all",
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
          link.setAttribute("download", "all_receipt_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Receipt is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("Receipt is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };
  //GET DATASOURCE
  const [datasource, setDatasource] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(BaseUrl + "/fetch-datasource", requestOptions)
      .then((response) => response.json())
      .then((data) => setDatasource(data.datasource));
  }, []);
  //GET CHAPTERS
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(BaseUrl + "/fetch-chapters", requestOptions)
      .then((response) => response.json())
      .then((data) => setChapters(data.chapters));
  }, []);
  //PROMOTERS
  const [promoter, setPromoters] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(BaseUrl + "/fetch-promoter", requestOptions)
      .then((response) => response.json())
      .then((data) => setPromoters(data.promoter));
  }, []);
  return (
    <Layout>
      <DownloadCommon />
      <div className="mt-4 mb-6">
        <PageTitle title={"Download Donation Receipts"} />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Leave blank if you want all records.
        </h3>

        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div className="w-full">
              <Input
                required
                type="date"
                label="From Date"
                className="required"
                value={receiptsdwn.receipt_from_date}
                onChange={(e) => onInputChange(e)}
                name="receipt_from_date"
              />
            </div>
            <div className="w-full">
              <Input
                required
                type="date"
                label="To Date"
                className="required"
                value={receiptsdwn.receipt_to_date}
                onChange={(e) => onInputChange(e)}
                name="receipt_to_date"
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Purpose"
                className="required"
                options={donation_type.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    receipt_donation_type: value,
                  }));
                }}
                name="receipt_donation_type"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Categorys"
                className="required"
                options={exemption.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    receipt_exemption_type: value,
                  }));
                }}
                name="receipt_exemption_type"
              />
            </div>

            <div className="w-full">
              <Dropdown
                label="Donor Type"
                className="required"
                options={donor_type.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    indicomp_donor_type: value,
                  }));
                }}
                name="indicomp_donor_type"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Promoter"
                className="required"
                options={promoter.map((option, index) => ({
                  value: option.indicomp_promoter,
                  label: option.indicomp_promoter,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    indicomp_promoter: value,
                  }));
                }}
                name="indicomp_promoter"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="OTS Range From"
                className="required"
                options={ots_range_from.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    receipt_ots_range_from: value,
                  }));
                }}
                name="receipt_ots_range_from"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="OTS Range To"
                className="required"
                options={ots_range_to.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    receipt_ots_range_to: value,
                  }));
                }}
                name="receipt_ots_range_to"
              />
            </div>
            {/* //// */}
            <div className="w-full">
              <Dropdown
                label="Amount Range"
                className="required"
                options={amount_range.map((option, index) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    receipt_amount_range: value,
                  }));
                }}
                name="receipt_amount_range"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Source"
                className="required"
                options={datasource.map((option, index) => ({
                  value: option.data_source_type,
                  label: option.data_source_type,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    indicomp_source: value,
                  }));
                }}
                name="indicomp_source"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Chapter"
                className="required"
                options={chapters.map((option, index) => ({
                  value: option.id,
                  label: option.chapter_name,
                }))}
                onChange={(value) => {
                  setAllReceiptDownload((prev) => ({
                    ...prev,
                    chapter_id: value,
                  }));
                }}
                name="chapter_id"
              />
            </div>
            <div className="w-77">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Downloading..." : "Download"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default AllRecepits;
