import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import TaskManagerFilter from "../../../components/TaskManagerFilter";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import PageTitle from "../../../components/common/PageTitle";
import AddToGroup from "./AddToGroup";
import moment from "moment/moment";

const DonorSummary = () => {
  const navigate = useNavigate();
  const todayback = moment().format("YYYY-MM-DD");
  const firstdate = moment().startOf("month").format("YYYY-MM-DD");
  const [donorSummary, setDonorSummary] = useState({
    indicomp_full_name: "",
    receipt_from_date: firstdate,
    receipt_to_date: todayback,
  });
  const [openDialog, setOpenDialog] = useState(false);

  // Handle input change
  const onInputChange = (e) => {
    setDonorSummary({
      ...donorSummary,
      [e.target.name]: e.target.value,
    });
  };

  // Handle opening/closing the modal
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  // Populate the donor name from the modal selection
  const populateDonorName = (fts_id) => {
    setDonorSummary({
      ...donorSummary,
      indicomp_full_name: fts_id,
    });
    setOpenDialog(false); // Close dialog after selection
  };

  const onReportView = (e) => {
    e.preventDefault();
    const form = document.getElementById("dowRecp");
    if (form.checkValidity()) {
      localStorage.setItem("receipt_from_date", donorSummary.receipt_from_date);
      localStorage.setItem("receipt_to_date", donorSummary.receipt_to_date);
      navigate("/view-stock");
    }
  };

  return (
    <Layout>
      <TaskManagerFilter />
      <div className="mt-4 mb-6">
        <PageTitle title={"Donor Summary"} />
      </div>
      <Card className="p-4">
        <h3 className="text-red-500 mb-5">Please fill all for View report.</h3>
        <form id="dowRecp" autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Input
                type="text"
                label="Donor Name"
                className="required"
                required
                name="indicomp_full_name"
                value={donorSummary.indicomp_full_name}
                onClick={handleOpenDialog} // Open the dialog when clicked
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="From Date"
                className="required"
                required
                name="receipt_from_date"
                value={donorSummary.receipt_from_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="To Date"
                required
                className="required"
                name="receipt_to_date"
                value={donorSummary.receipt_to_date}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView}>
                Individual View
              </Button>
            </div>
            <div className="w-full">
              <Button color="blue" fullWidth onClick={onReportView}>
                Group View
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Dialog open={openDialog} handler={handleOpenDialog}>
        <DialogHeader>
          Choose Donor
          <Button
            onClick={handleOpenDialog}
            className="ml-auto text-white bg-red-500"
          >
            Close
          </Button>
        </DialogHeader>
        <DialogBody divider>
          <AddToGroup
            populateDonorName={populateDonorName}
            handleClose={handleOpenDialog}
          />
        </DialogBody>
      </Dialog>
    </Layout>
  );
};

export default DonorSummary;
