import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
const DownloadCommon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleButtonClick = (path) => {
    navigate(path);
  };
  const buttons = [
    {
      label: "Donor",
      path: "/download/donor",
      color: "from-pink-500 to-orange-400",
    },
    {
      label: "Receipts",
      path: "/download/receipts",
      color: "from-blue-500 to-cyan-400",
    },

    {
      label: "School",
      path: "/download/school",
      color: "from-green-500 to-teal-400",
    },
    {
      label: "OTS",
      path: "/download/ots",
      color: "from-cyan-500 to-pink-400",
    },
    {
      label: "Team",
      path: "/download/team",
      color: "from-orange-500 to-cyan-400",
    },
    {
      label: "All Recepits",
      path: "/download/allreceipts",
      color: "from-red-500 to-yellow-400",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`w-full md:w-auto flex-1 py-2 px-4 text-white rounded-lg transition-all ${
              location.pathname === button.path
                ? `bg-gradient-to-r ${button.color} shadow-lg transform -translate-y-1`
                : "bg-blue-200"
            }`}
            onClick={() => handleButtonClick(button.path)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default DownloadCommon;
