import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import DonorSummary from "./pages/Reports/DonorSummary/DonorSummary";
import EnquiryDownload from "./pages/download/EnquiryDownload";
import Donor from "./pages/Dowloads/Donor/Donor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromterSummary from "./pages/Reports/PromoterSummary/PromoterSummary";
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
import RecepitAllView from "./pages/Reports/10DBDocument/10BDView/RecepitAllView";
import NopanView from "./pages/Reports/10DBDocument/10BDView/NopanView";
import GroupView from "./pages/Reports/10DBDocument/10BDView/GroupView";
import SuspenseSummary from "./pages/Reports/SuspenseSummary/SuspenseSummary";
import PaymentView from "./pages/Reports/PayementSummary/PaymentView";
import DonorGroupView from "./pages/Reports/DonorSummary/DonorGroupView";
import DonationSummarys from "./pages/Reports/DonationSummary.jsx/DonationSummaryView";
import DonorView from "./pages/Reports/DonorSummary/DonorView";
import DowloadRecpit from "./pages/Dowloads/Receipt/DowloadReceipt";
import DownloadSchool from "./pages/Dowloads/School/DownloadSchool";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/maintenance" element={<Maintenance />} />

        {/* MASTER  */}

        {/* Reports  */}
        <Route path="/report/donorsummary" element={<DonorSummary />} />
        <Route path="/report/promoter" element={<PromterSummary />} />
        <Route path="/report/suspense" element={<SuspenseSummary />} />
        <Route path="/report/payment-view" element={<PaymentView />} />
        <Route path="/d-summary-view" element={<PromoterSummaryView />} />
        <Route path="/report/recepit" element={<RecepitSummary />} />
        <Route path="/recepit-summary-view" element={<RecepitSummaryView />} />
        <Route path="/recepit-otg-view" element={<RecepitAllView />} />
        <Route path="/recepit-nopan-view" element={<NopanView />} />
        <Route path="/recepit-group-view" element={<GroupView />} />
        <Route path="/recepit-donation-view" element={<DonationSummarys />} />
        <Route path="/report/donor-view" element={<DonorView />} />
        <Route path="/report/donorgroup-view" element={<DonorGroupView />} />
        <Route path="/report/donation" element={<DonationSummary />} />
        <Route path="/report/school" element={<SchoolSummary />} />
        <Route path="/report/otg" element={<RecepitDocument />} />
        <Route path="/report/payment" element={<PaymentSummary />} />
        {/* /////// */}
        <Route path="/download-enquiry" element={<EnquiryDownload />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
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
      </Routes>
    </>
  );
};

export default App;
