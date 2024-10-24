import Layout from "../../../layout/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Dropdown from "../../../components/common/DropDown";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import { useState } from "react";
import { BaseUrl } from "../../../base/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DownloadCommon from "../../download/DeliveryDownload";

function Donor() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const DonorTypes = [
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

  const DonorType = [
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
      label: "PSU",
    },
    {
      value: "Trust",
      label: "Trust",
    },
    {
      value: "Society",
      label: "Society",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];
  const [downloadDonor, setDonorDownload] = useState({
    indicomp_type: "",
    indicomp_donor_type: "",
  });
  //ONCHANGE
  const onInputChange = (name, value) => {
    setDonorDownload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_type: downloadDonor.indicomp_type,
      indicomp_donor_type: downloadDonor.indicomp_donor_type,
    };
    var v = document.getElementById("dowRecp").checkValidity();
    var v = document.getElementById("dowRecp").reportValidity();
    e.preventDefault();
    console.log("Data : ", data);
    if (v) {
      setIsButtonDisabled(true);

      axios({
        url: BaseUrl + "/download-donor",
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
          link.setAttribute("download", "donor_list.csv");
          document.body.appendChild(link);
          link.click();
          toast.success("Donor is Downloaded Successfully");
          setIsButtonDisabled(false);
        })
        .catch((err) => {
          toast.error("Donor is Not Downloaded");
          setIsButtonDisabled(false);
        });
    }
  };

  return (
    <Layout>
      <DownloadCommon />
      <div className="mt-4 mb-6">
        <PageTitle title={"Download Donor"} />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">
          Leave blank if you want all records.
        </h3>

        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Dropdown
                required
                label=" Type"
                className="required"
                options={DonorType}
                value={downloadDonor.indicomp_type}
                onChange={(value) => onInputChange("indicomp_type", value)}
                name="indicomp_type"
              />
            </div>
            <div className="w-full">
              <Dropdown
                label="Donor Type"
                className="required"
                value={downloadDonor.indicomp_donor_type}
                options={DonorTypes}
                name="indicomp_donor_type"
                onChange={(value) =>
                  onInputChange("indicomp_donor_type", value)
                }
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

export default Donor;
