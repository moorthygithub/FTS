import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import WebDonation from "./pages/WebDonation/WebDonation";
import DonorList from "./pages/DonorList/DonorList";
import OpenListEnquiry from "./pages/Master/ListItem/List Item";
import PurchaseList from "./pages/Stock/Purchase/PurchaseList";
import RecepitCashRecepit from "./pages/Recepits/CashRecepits/CashRecepit";
import PendingListTask from "./pages/Reports/StockReport";
import EnquiryDownload from "./pages/download/enquiry/EnquiryDownload";
import VendorList from "./pages/Master/Vendors List/VendorList";
import CloseListEnquiry from "./pages/enquiry/closeList/CloseListEnquiry";
import Consumption from "./pages/Stock/Consumption/consumption";
import MaterialRecepits from "./pages/Recepits/MaterialRecepits/MaterialRecepits";
import CompletedListRequest from "./pages/request/completedList/CompletedListRequest";
import InspectionListTask from "./pages/taskManager/inspectionList/InspectionListTask";
import CompletedListTask from "./pages/taskManager/completedList/CompletedListTask";
import Donor from "./pages/Dowloads/Donor/Donor";
import Students from "./pages/Dowloads/Purchase/CashPurchase";
import Cash from "./pages/Dowloads/Delivery/Cash";
import Exam from "./pages/Dowloads/MaterialReceipts/MaterialReceipts";
import EnquiryReport from "./pages/Dowloads/Donor/EnquiryReport";
import StudentReport from "./pages/Dowloads/Purchase/StudentsReport";
import DeliveryReport from "./pages/Dowloads/Delivery/DeliveryReport";
import ExamReport from "./pages/Dowloads/MaterialReceipts/ExamReport";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEnquiry from "./pages/Master/ListItem/AddItem";
import AddDelivery from "./pages/delivery/AddDelivery";
import EditDelivery from "./pages/delivery/EditDelivery";
import EditList from "./pages/Master/ListItem/EditList";
import AddRequest from "./pages/request/AddRequest";
import EditPersonalDetails from "./pages/enquiry/EditPersonalDetails";
import ViewEnquiry from "./pages/enquiry/ViewEnquiry";

import View from "./pages/delivery/View";

import EnquiryNow from "./pages/enquiryNow/EnquiryNow";
import AddVendors from "./pages/Master/Vendors List/AddVendors";
import EditVendors from "./pages/Master/Vendors List/EditVendors";
import AddPurchase from "./pages/Stock/Purchase/AddPurchase";
import EditPurchase from "./pages/Stock/Purchase/EditPurchase";
import AddConsumption from "./pages/Stock/Consumption/Addconsumption";
import EditConsumption from "./pages/Stock/Consumption/EditConsumption";
import Stock from "./pages/Stock/StockList/StockList";
import EditRecepit from "./pages/Recepits/CashRecepits/EditRecepits";
import ViewCashRecepit from "./pages/Recepits/CashRecepits/ViewRecepit";
import EditMaterial from "././pages/Recepits/MaterialRecepits/EditMaterial";
import ViewMaterial from "./pages/Recepits/MaterialRecepits/ViewMaterial";
import ViewStockSummary from "./pages/Reports/ViewStockSummary";
import DowloadConsumption from "./pages/Dowloads/Consumption/DowloadConsumption";
import DownloadWebDonation from "./pages/Dowloads/WebDonation/DownloadWebDonation";
import AddDonorList from "./pages/DonorList/AddDonorList";
import EditDonorList from "./pages/DonorList/EditDonorList";
import CreateDonor from "./pages/DonorList/CreateDonor";
import CreateDonorRecepit from "./pages/DonorList/CreateDonorRecepit";
import ViewDonorDetails from "./pages/DonorList/ViewDonorDetails";
import DonorReceiptsDetails from "./pages/DonorList/DonorReceiptsDetails";
import FamilyList from "./pages/DonorList/FamilyMembers/FamilyList";
import AddFamilyMembers from "./pages/DonorList/FamilyMembers/AddFamilyMembers";
import DonationSummary from "./pages/Reports/DonationSummary/DonationSummary";
import DonationSummaryView from "./pages/Reports/DonationSummary/DonationSummaryView";
import DuplicateDonorList from "./pages/DonorList/Duplicate/DuplicateDonorList";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/enquiry-now" element={<EnquiryNow />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/add-donor/:id?" element={<AddDonorList />} />
        <Route path="/edit-donor/:id" element={<EditDonorList />} />
        <Route path="/create-donor/:id" element={<CreateDonor />} />
        <Route path="/create-family/:id" element={<FamilyList />} />
        <Route path="/add-family" element={<AddFamilyMembers />} />
        <Route path="/duplicate" element={<DuplicateDonorList />} />
        <Route
          path="/createrecepit-donor/:id?"
          element={<CreateDonorRecepit />}
        />
        <Route path="/viewdonor-list/:id" element={<ViewDonorDetails />} />
        <Route
          path="/recepitdonor-list/:id"
          element={<DonorReceiptsDetails />}
        />
        {/* enquiry  */}
        <Route path="/master-list" element={<OpenListEnquiry />} />
        <Route path="/add-enquiry" element={<AddEnquiry />} />
        <Route path="/edit-enquiry/:id" element={<EditList />} />
        <Route path="/edit-personal/:id" element={<EditPersonalDetails />} />
        <Route path="/view-enquiry/:id" element={<ViewEnquiry />} />
        {/* //chnage */}
        <Route path="/closeList-enquiry" element={<CloseListEnquiry />} />
        <Route path="/addVendor" element={<AddVendors />} />
        {/* student  */}
        {/* <Route path="/student" element={<StudentList />} /> */}
        {/* <Route path="/view-student/:id" element={<ViewStudent />} /> */}
        {/* <Route path="/add-student-course/:id" element={<StudentAddCourse />} /> */}
        {/* <Route
          path="/add-student-delivery/:id"
          element={<StudentAddDelivery />}
        />
        <Route path="/add-exam/:id" element={<AddExam />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />
        <Route path="/view-exam/:id" element={<ViewExam />} />
        <Route path="/exam-pending-list" element={<ExamPendingList />} />
        <Route path="/edit-result/:id" element={<EditResult />} />
        <Route path="/view-result/:id" element={<ViewResult />} />
        <Route path="/edit-student/:id" element={<EditStudent />} /> */}
        {/* <Route
          path="/view-student-enquiry/:id"
          element={<ViewStudentEquiry />}
        />
        <Route
          path="/edit-student-course/:id"
          element={<EditStudentCourse />}
        />
        <Route path="/view-course/:id" element={<ViewCourse />} />
        <Route */}
        {/* //   path="/edit-student-delivery/:id"
        //   element={<EditStudentDelivery />}
        // /> */}
        {/* // <Route path="/view-delivery/:id" element={<ViewDelivery />} /> */}
        {/* // <Route path="/pending-onboard" element={<PendingOnboarding />} />
        // <Route path="/pending-offboard" element={<PendingOffboarding />} />
        // <Route path="/pending-interview" element={<PendingInterview />} />
        // <Route path="/course-due" element={<StudentCourseDue />} />
        // <Route path="/over-due-task-list" element={<OverDueTaskList />} /> */}
        {/* delivery  */}
        <Route path="/purchase" element={<PurchaseList />} />
        <Route path="/add-delivery" element={<AddDelivery />} />
        <Route path="/edit-delivery/:id" element={<EditDelivery />} />
        <Route path="/consumption" element={<Consumption />} />
        <Route path="/view-student-delivery/:id" element={<View />} />
        {/* class  */}
        {/* request  */}
        <Route path="/cashrecepit" element={<RecepitCashRecepit />} />
        <Route path="/add-request" element={<AddRequest />} />
        <Route path="recepit-material" element={<MaterialRecepits />} />
        <Route path="/request-completed" element={<CompletedListRequest />} />
        {/* Reports  */}
        <Route path="/stock-summary" element={<PendingListTask />} />
        <Route path="/donation-summary" element={<DonationSummary />} />
        <Route
          path="/donation-summary-view"
          element={<DonationSummaryView />}
        />
        <Route path="/task-inspection" element={<InspectionListTask />} />
        <Route path="/task-completed" element={<CompletedListTask />} />
        <Route path="/view-stock" element={<ViewStockSummary />} />
        <Route path="/download-enquiry" element={<EnquiryDownload />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />
        {/* Download  */}
        <Route path="/donor" element={<ProtectedRoute element={<Donor />} />} />
        <Route
          path="/cashpurchase"
          element={<ProtectedRoute element={<Students />} />}
        />
        <Route path="/cash" element={<ProtectedRoute element={<Cash />} />} />
        <Route path="/exam" element={<ProtectedRoute element={<Exam />} />} />
        <Route
          path="/attendance"
          element={<ProtectedRoute element={<DowloadConsumption />} />}
        />
        <Route
          path="/enquiryreport"
          element={<ProtectedRoute element={<EnquiryReport />} />}
        />
        <Route
          path="/studentreport"
          element={<ProtectedRoute element={<StudentReport />} />}
        />
        <Route
          path="/deliveryreport"
          element={<ProtectedRoute element={<DeliveryReport />} />}
        />
        <Route
          path="/examreport"
          element={<ProtectedRoute element={<ExamReport />} />}
        />
        {/* ///NEW  */}
        <Route
          path="/VendorList"
          element={<ProtectedRoute element={<VendorList />} />}
        />
        <Route
          path="/EditVendors/:id"
          element={<ProtectedRoute element={<EditVendors />} />}
        />
        <Route
          path="/add-purchase"
          element={<ProtectedRoute element={<AddPurchase />} />}
        />
        <Route
          path="/edit-purchase/:id"
          element={<ProtectedRoute element={<EditPurchase />} />}
        />
        <Route
          path="/add-consumption"
          element={<ProtectedRoute element={<AddConsumption />} />}
        />
        <Route
          path="/edit-consumption/:id"
          element={<ProtectedRoute element={<EditConsumption />} />}
        />
        {/* //STOCK */}
        <Route path="/stock" element={<ProtectedRoute element={<Stock />} />} />
        <Route
          path="/recepit-add/:id"
          element={<ProtectedRoute element={<EditRecepit />} />}
        />
        <Route
          path="/recepit-view/:id"
          element={<ProtectedRoute element={<ViewCashRecepit />} />}
        />
        {/* //MATERIAL Recepits */}
        <Route
          path="/material-add/:id"
          element={<ProtectedRoute element={<EditMaterial />} />}
        />
        <Route
          path="/material-view/:id"
          element={<ProtectedRoute element={<ViewMaterial />} />}
        />
        //DOWLOAD
        <Route
          path="/web-donation"
          element={<ProtectedRoute element={<DownloadWebDonation />} />}
        />
        <Route path="/webdonation" element={<WebDonation />} />
      </Routes>
    </>
  );
};

export default App;
