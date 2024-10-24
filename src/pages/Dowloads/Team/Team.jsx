import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import { Button, Input, Card } from "@material-tailwind/react";
import Moment from "moment";
import { useState} from "react";
import { BaseUrl } from "../../../base/BaseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../download/DeliveryDownload";

function Team() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  // Get the first and last date
  const todayback = Moment().format("YYYY-MM-DD");
  const firstdate = Moment().startOf("month").format("YYYY-MM-DD");

  const [receiptsdwn, setTeamDownload] = useState({
    committee_start_date: firstdate,
    committee_end_date: todayback,
  });

  // Input change handler for native inputs
  const onInputChange = (name, value) => {
    setTeamDownload({
      ...receiptsdwn,
      [name]: value,
    });
  };

  // Submit handler for download
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      committee_start_date: receiptsdwn.committee_start_date,
      committee_end_date: receiptsdwn.committee_end_date,
    };

    if (document.getElementById("dowRecp").reportValidity()) {
      setIsButtonDisabled(true);

      axios({
        url: BaseUrl + "/download-team-summary",
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
          link.setAttribute("download", "team_summary.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Report is Downloaded Successfully");
        })
        .catch((err) => {
          toast.error("Report is Not Downloaded");
          console.error("Download error:", err.response);
        })
        .finally(() => {
          setIsButtonDisabled(false);
        });
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <div className="mt-4 mb-6">
        <PageTitle title={"Download Team"} />
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
                name="committee_start_date"
                className="required"
                value={receiptsdwn.committee_start_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                required
                type="date"
                label="To Date"
                className="required"
                name="committee_end_date"
                value={receiptsdwn.committee_end_date}
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
                {isButtonDisabled ? "Downloading..." : "Download"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
}

export default Team;
