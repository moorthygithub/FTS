import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import { Button, Input, Card } from "@material-tailwind/react";
import Moment from "moment";
import { useState, useEffect } from "react";
import { BaseUrl } from "../../../base/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../download/DeliveryDownload";

function DownloadSchool() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);

  // Get the first and last date
  const todayback = Moment().format("YYYY-MM-DD");
  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [receiptsdwn, setWebsiteDonationDownload] = useState({
    schoolalot_from_date: firstdate,
    schoolalot_to_date: todayback,
  });

  // Input change handler for native inputs
  const onInputChange = (name, value) => {
    setWebsiteDonationDownload({
      ...receiptsdwn,
      [name]: value,
    });
  };

  // Submit handler for download
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      schoolalot_from_date: receiptsdwn.schoolalot_from_date,
      schoolalot_to_date: receiptsdwn.schoolalot_to_date,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisabled(true);

      axios({
        url: BaseUrl + "/download-school-alloted",
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
          link.setAttribute("download", "school_alloted_summary.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("School Allotted is Downloaded Successfully");
        })
        .catch((err) => {
          toast.error("School Allotted is Not Downloaded");
          console.error("Download error:", err.response);
        })
        .finally(() => {
          setIsButtonDisabled(false);
        });
    }
  };
  //Submit nor allowed
  const onSubmita = (e) => {
    e.preventDefault();
    let data = {
      schoolalot_from_date: receiptsdwn.schoolalot_from_date,
      schoolalot_to_date: receiptsdwn.schoolalot_to_date,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisableds(true);

      axios({
        url: BaseUrl + "/download-school-unalloted",
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
          link.setAttribute("download", "school_unalloted_summary.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("School UnAllotted is Downloaded Successfully");
        })
        .catch((err) => {
          toast.error("School UnAllotted is Not Downloaded");
          console.error("Download error:", err.response);
        })
        .finally(() => {
          setIsButtonDisableds(false);
        });
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <div className="mt-4 mb-6">
        <PageTitle title={"Download School"} />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Leave blank if you want all records.
        </h3>

        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                required
                type="date"
                label="From Date"
                name="schoolalot_from_date"
                className="required"
                value={receiptsdwn.schoolalot_from_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                required
                type="date"
                label="To Date"
                className="required"
                name="schoolalot_to_date"
                value={receiptsdwn.schoolalot_to_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="w-77">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmit}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled
                  ? "Downloading School Allotted..."
                  : "Download School Allotted"}
              </Button>
            </div>
            <div className="w-77">
              <Button
                color="blue"
                fullWidth
                onClick={onSubmita}
                disabled={isButtonDisableds}
              >
                {isButtonDisableds
                  ? "Downloading School UnAllotted..."
                  : "Download School UnAllotted"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default DownloadSchool;
