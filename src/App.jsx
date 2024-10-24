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
import DonorSummary from "./pages/Reports/DonorSummary/DonorSummary";
import EnquiryDownload from "./pages/download/EnquiryDownload";
import VendorList from "./pages/Master/Vendors List/VendorList";
import Consumption from "./pages/Stock/Consumption/consumption";
import MaterialRecepits from "./pages/Recepits/MaterialRecepits/MaterialRecepits";
import Donor from "./pages/Dowloads/Donor/Donor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEnquiry from "./pages/Master/ListItem/AddItem";

import EditList from "./pages/Master/ListItem/EditList";

import AddVendors from "./pages/Master/Vendors List/AddVendors";
import EditVendors from "./pages/Master/Vendors List/EditVendors";
import AddPurchase from "./pages/Stock/Purchase/AddPurchase";
import EditPurchase from "./pages/Stock/Purchase/EditPurchase";
import AddConsumption from "./pages/Stock/Consumption/Addconsumption";
import EditConsumption from "./pages/Stock/Consumption/EditConsumption";
import Stock from "./pages/Stock/StockList/StockList";
import EditMaterial from "././pages/Recepits/MaterialRecepits/EditMaterial";
import ViewMaterial from "./pages/Recepits/MaterialRecepits/ViewMaterial";
import ViewStockSummary from "./pages/Reports/DonorSummary/ViewStockSummary";
import DowloadRecpit from "./pages/Dowloads/Receipt/DowloadReceipt";
import DownloadSchool from "./pages/Dowloads/School/DownloadSchool";
import AddDonorList from "./pages/DonorList/AddDonorList";
import EditDonorList from "./pages/DonorList/EditDonorList";
import CreateDonor from "./pages/DonorList/CreateDonorMaterialRecepit";
import CreateDonorRecepit from "./pages/DonorList/CreateDonorCashRecepit";
import ViewDonorDetails from "./pages/DonorList/ViewDonorDetails";
import DonorReceiptsDetails from "./pages/DonorList/DonorReceiptsDetails";
import FamilyList from "./pages/DonorList/FamilyMembers/FamilyList";
import AddFamilyMembers from "./pages/DonorList/FamilyMembers/AddFamilyMembers";
import PromterSummary from "./pages/Reports/PromoterSummary/PromoterSummary";
import DonationSummaryView from "./pages/Reports/PromoterSummary/PromoterSummaryView";
import DuplicateDonorList from "./pages/DonorList/Duplicate/DuplicateDonorList";
import ListOccasion from "./pages/Master/Occasion/Listoccasion";
import AddOccasion from "./pages/Master/Occasion/Addoccasion";
import EditOccasion from "./pages/Master/Occasion/Editoccasion";
import EditDuplicate from "./pages/DonorList/Duplicate/EditDuplicate";
import Downloadots from "./pages/Dowloads/OTS/Downloadots";
import Team from "./pages/Dowloads/Team/Team";
import AllRecepits from "./pages/Dowloads/AllRecepits/AllRecepits";
import RecepitSummary from "./pages/Reports/RecepitSummary/RecepitSummary";
import DonationSummary from "./pages/Reports/DonationSummary.jsx/DonationSummary";
import SchoolSummary from "./pages/Reports/SchoolSummary.jsx/SchoolSummary";
import RecepitDocument from "./pages/Reports/10DBDocument/RecepitDocument";
import PaymentSummary from "./pages/Reports/PayementSummary/PaymentSummary";
import PromoterSummaryView from "./pages/Reports/PromoterSummary/PromoterSummaryView";
import RecepitSummaryView from "./pages/Reports/RecepitSummary/RecepitSummaryView";
import RecepitAllView from "./pages/Reports/10DBDocument/10BDView/RecepitAllView"
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/donor-list" element={<DonorList />} />
        <Route path="/add-donor/:id?" element={<AddDonorList />} />
        <Route path="/edit-donor/:id" element={<EditDonorList />} />
        <Route path="/create-donor/:id" element={<CreateDonor />} />
        <Route path="/create-family/:id" element={<FamilyList />} />
        <Route path="/add-family" element={<AddFamilyMembers />} />
        <Route path="/duplicate" element={<DuplicateDonorList />} />
        <Route path="/edit-duplicate/:id" element={<EditDuplicate />} />
        <Route
          path="/createrecepit-donor/:id?"
          element={<CreateDonorRecepit />}
        />
        <Route path="/viewdonor-list/:id" element={<ViewDonorDetails />} />
        <Route
          path="/recepitdonor-list/:id"
          element={<DonorReceiptsDetails />}
        />
        {/* MASTER  */}
        <Route path="/master-list" element={<OpenListEnquiry />} />
        <Route path="/add-enquiry" element={<AddEnquiry />} />
        <Route path="/edit-enquiry/:id" element={<EditList />} />
        <Route path="/occasion" element={<ListOccasion />} />
        <Route path="/add-occasion" element={<AddOccasion />} />
        <Route path="/edit-occasion/:id" element={<EditOccasion />} />
        {/* //chnage */}
        <Route path="/addVendor" element={<AddVendors />} />
        <Route path="/purchase" element={<PurchaseList />} />
        <Route path="/consumption" element={<Consumption />} />
        <Route path="recepit-material" element={<MaterialRecepits />} />
        {/* Reports  */}
        <Route path="/report/donorsummary" element={<DonorSummary />} />
        <Route path="/report/promoter" element={<PromterSummary />} />
        <Route path="/d-summary-view" element={<PromoterSummaryView />} />
        <Route path="/report/recepit" element={<RecepitSummary />} />
        <Route path="/recepit-summary-view" element={<RecepitSummaryView />} />
        <Route path="/recepit-otg-view" element={<RecepitAllView />} />

        <Route path="/report/donation" element={<DonationSummary />} />
        <Route path="/report/school" element={<SchoolSummary />} />
        <Route path="/report/otg" element={<RecepitDocument />} />
        <Route path="/report/payment" element={<PaymentSummary />} />
        {/* /////// */}
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
        {/* Download  START */}
        <Route
          path="/download/donor"
          element={<ProtectedRoute element={<Donor />} />}
        />
        <Route
          path="/download/receipts"
          element={<ProtectedRoute element={<DowloadRecpit />} />}
        />
        <Route
          path="/download/school"
          element={<ProtectedRoute element={<DownloadSchool />} />}
        />
        <Route
          path="/download/ots"
          element={<ProtectedRoute element={<Downloadots />} />}
        />
        <Route
          path="/download/team"
          element={<ProtectedRoute element={<Team />} />}
        />
        <Route
          path="/download/allreceipts"
          element={<ProtectedRoute element={<AllRecepits />} />}
        />
        {/* //END */}
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
        <Route path="/stock" element={<ProtectedRoute element={<Stock />} />} />
        <Route
          path="/material-add/:id"
          element={<ProtectedRoute element={<EditMaterial />} />}
        />
        <Route
          path="/material-view/:id"
          element={<ProtectedRoute element={<ViewMaterial />} />}
        />
        //DOWLOAD
        <Route path="/webdonation" element={<WebDonation />} />
      </Routes>
    </>
  );
};

export default App;
