import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdDelete } from "react-icons/md";
import axios from "axios";
import Layout from "../../../layout/Layout";
import Fields from "../../../components/common/TextField/TextField";
import { toast } from "react-toastify";
// import { Button, IconButton } from "@mui/material";
import { BaseUrl } from "../../../base/BaseUrl";
import moment from "moment/moment";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";

// Unit options for dropdown

const unit = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
];

const EditMaterial = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const { id } = useParams();

  console.log(id);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;
  var d = document.getElementById("datefield");
  if (d) {
    document.getElementById("datefield").setAttribute("max", todayback);
  }

  var todayyear = new Date().getFullYear();
  var twoDigitYear = todayyear.toString().substr(-2);
  var preyear = todayyear;
  var finyear = +twoDigitYear + 1;
  var finalyear = preyear + "-" + finyear;
  const [dayClose, setDayClose] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [check, setCheck] = useState(false);

  const [donor, setDonor] = useState({
    m_receipt_date: "",
    indicomp_fts_id: "",
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_remarks: "",
    m_receipt_reason: "",
    m_receipt_sub_data: "",
    m_receipt_count: "",
    m_receipt_occasional: "",
    m_manual_receipt_no: "",
    m_receipt_vehicle_no: "",
    donor: {
      donor_full_name: "",
      donor_pan_no: "",
      donor_fts_id: "",
    },
  });

  const useTemplate = {
    id: "",
    purchase_sub_item: "",
    purchase_sub_qnty: "",
    purchase_sub_unit: "",
    purchase_sub_amount: "",
  };

  const [users, setUsers] = useState([useTemplate]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //FETCH OCCASION
  const [occasion, setOccasion] = useState([]);
  useEffect(() => {
    var theLoginToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BaseUrl + "/fetch-occasion", requestOptions)
      .then((response) => response.json())
      .then((data) => setOccasion(data.occasion));
  }, []);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onInputChange = (e) => {
    if (e.target.name == "m_receipt_total_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDonor({
        ...donor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  //ONCHNAGE FOR USER
  const onChange = (e, index) => {
    if (e.target.name == "purchase_sub_qnty") {
      if (validateOnlyNumber(e.target.value)) {
        const updatedUsers = users.map((user, i) =>
          index == i
            ? Object.assign(user, { [e.target.name]: e.target.value })
            : user
        );
        setUsers(updatedUsers);
      }
    } else {
      const updatedUsers = users.map((user, i) =>
        index == i
          ? Object.assign(user, { [e.target.name]: e.target.value })
          : user
      );
      setUsers(updatedUsers);
    }
  };
  const pan = donors.donor_pan_no == "" ? "NA" : donors.donor_pan_no;

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      m_receipt_date: donor.m_receipt_date,
      indicomp_fts_id: donors.donor_fts_id,
      m_receipt_total_amount: donor.m_receipt_total_amount,
      m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
      m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
      m_receipt_remarks: donor.m_receipt_remarks,
      m_receipt_reason: donor.m_receipt_reason,
      m_receipt_count: donor.m_receipt_count,
      m_manual_receipt_no: donor.m_manual_receipt_no,
      m_receipt_sub_data: users,
      m_receipt_occasional: donor.m_receipt_occasional,
      m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
    };

    const isValid = document.getElementById("addIndiv").checkValidity();

    if (isValid) {
      setIsButtonDisabled(true);

      axios
        .put(`${BaseUrl}/update-m-receipt/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data.code == "200") {
            toast.success(res.data.msg || "Donor Created Successfully");
            setTimeout(() => {
              navigate("/recepit-material");
            }, [2000]);
          } else {
            toast.error(res.data.message || "Error occurred");
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(
              `Error: ${
                err.response.data.message || "An error occurred on the server"
              }`
            );
            console.error("Server Error:", err.response);
          } else if (err.request) {
            toast.error("No response from the server.");
            console.error("No Response:", err.request);
          } else {
            toast.error(`Error: ${err.message}`);
            console.error("Error Message:", err.message);
          }
        })
        .finally(() => {
          setIsButtonDisabled(false);
        });
    }
  };

  const handleBackButton = () => {
    navigate("/recepit-material");
  };

  useEffect(() => {
    axios({
      url: BaseUrl + "/fetch-m-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUsers(res.data.receiptSub || []);
      setDonors(res.data.donor);
      setDonor(res.data.receipts);
      console.log("datatable", res.data.donor);
    });
  }, [id]);
  //DAY CLOSE
  console.log(users, "sers");
  //DAY close

  // const onDayClose = (e) => {
  //   e.preventDefault();
  //   setCheck(true);

  //   const receivedDate = new Date(dayClose);

  //   if (isNaN(receivedDate)) {
  //     console.error("Invalid dayClose date:", dayClose);
  //     return;
  //   }

  //   receivedDate.setDate(receivedDate.getDate() + 1);

  //   const year = receivedDate.getFullYear();
  //   const month = String(receivedDate.getMonth() + 1).padStart(2, "0"); // Get month from 0-11, add 1 and pad with zero
  //   const day = String(receivedDate.getDate()).padStart(2, "0"); // Get day and pad with zero

  //   const formattedDate = `${year}-${month}-${day}`;
  //   console.log(formattedDate, "formattedDate");
  //   let data = {
  //     c_receipt_date: formattedDate,
  //   };

  //   // Making the API call
  //   axios({
  //     url: BaseUrl + "/update-c-receipt-date/1",
  //     method: "PUT",
  //     data,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data, "dayclose");
  //       setDayClose(res.data.latestdate.c_receipt_date);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating receipt date:", error);
  //     });
  // };

  // const onDayOpen = (e) => {
  //   e.preventDefault();
  //   setCheck(true);
  //   const receivedDate = new Date(dayClose);
  //   receivedDate.setDate(receivedDate.getDate() - 1);

  //   const year = receivedDate.getFullYear();
  //   const month = String(receivedDate.getMonth() + 1).padStart(2, "0");
  //   const day = String(receivedDate.getDate()).padStart(2, "0");
  //   const formattedDate = `${year}-${month}-${day}`;
  //   let data = {
  //     c_receipt_date: formattedDate,
  //   };
  //   axios({
  //     url: BaseUrl + "/update-c-receipt-date-open/1",
  //     method: "PUT",
  //     data,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   }).then((res) => {
  //     if (res.data.code == 401) {
  //       toast.error("In that Date there is already Receipt is Created");
  //     } else {
  //       setDayClose(res.data.latestdate.c_receipt_date);
  //     }
  //   });
  // };
  const [item, setItem] = useState([]);
  useEffect(() => {
    var theLoginToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BaseUrl + "/fetch-item", requestOptions)
      .then((response) => response.json())
      .then((data) => setItem(data.item));
  }, []);

  return (
    <Layout>
      <div>
        <div className="flex mb-4 mt-6">
          <MdKeyboardBackspace
            onClick={handleBackButton}
            className="text-white bg-[#464D69] p-1 w-10 h-8 cursor-pointer rounded-2xl"
          />
          <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
            Donation Receipt in receipt
          </h1>
        </div>
        <Card className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-4 mb-4">
              <div className="text-gray-700">
                <strong>Name:</strong>
                {donors.donor_full_name}
              </div>
              <div className="text-gray-700">
                <strong>PDS ID:</strong>
                {donors.donor_fts_id}
              </div>
              <div className="text-gray-700">
                <strong>Pan No:</strong>
                {pan}
              </div>
              <div className="text-gray-700">
                <strong>Receipt Date:</strong>{" "}
                {moment(donor.m_receipt_date).format("DD-MM-YYYY")}{" "}
              </div>
              <div className="text-gray-700">
                <strong>Year:</strong>
                {donor.m_receipt_financial_year}{" "}
              </div>

              <div className="text-gray-700">
                <strong>Receipt Ref :</strong>
                {donor.m_receipt_ref_no}{" "}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 ">
                <Fields
                  required
                  label="Approx Value"
                  type="textField"
                  value={donor.m_receipt_total_amount}
                  onChange={(e) => onInputChange(e)}
                  name="m_receipt_total_amount"
                />
              </div>
              <div className="mb-4">
                <Fields
                  required
                  label="Vehicle No"
                  type="textField"
                  value={donor.m_receipt_vehicle_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>{" "}
              <div className="mb-4">
                <Fields
                  select
                  title="On Occasion"
                  type="occasionDropdown"
                  name="m_receipt_occasional"
                  value={donor.m_receipt_occasional}
                  onChange={(e) => onInputChange(e)}
                  options={occasion}
                />
              </div>
              <div>
                <Fields
                  required
                  label="Manual Receipt No"
                  type="textField"
                  value={donor.m_manual_receipt_no}
                  onChange={(e) => onInputChange(e)}
                  name="m_manual_receipt_no"
                />
              </div>
              <div className="mb-4">
                <Fields
                  required
                  label="Remarks"
                  type="textField"
                  value={donor.m_receipt_remarks}
                  onChange={onInputChange}
                  name="m_receipt_remarks"
                />
              </div>
              <div className="mb-4">
                <Fields
                  required
                  label="Reason"
                  type="textField"
                  value={donor.m_receipt_reason}
                  onChange={onInputChange}
                  name="m_receipt_reason"
                />
              </div>
            </div>

            {/* Mapping all items */}
            {users.map((user, index) => (
              <div key={index}>
                <div className="mb-4">
                  <Fields
                    required
                    title="Item "
                    type="itemdropdown"
                    select
                    options={item}
                    value={user.purchase_sub_item}
                    onChange={(e) => onChange(e, index)}
                    name="purchase_sub_item"
                  />
                </div>
                <div className="mb-4">
                  <Fields
                    required
                    label="Quantity"
                    type="textField"
                    value={user.purchase_sub_qnty}
                    onChange={(e) => onChange(e, index)}
                    name="purchase_sub_qnty"
                  />
                </div>
                <div className="mb-4">
                  <Fields
                    required
                    select
                    title="Unit"
                    type="whatsappDropdown"
                    name="purchase_sub_unit"
                    value={user.purchase_sub_unit}
                    onChange={(e) => onChange(e, index)}
                    options={unit}
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4 space-x-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="mt-4"
                onClick={handleBackButton}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditMaterial;
