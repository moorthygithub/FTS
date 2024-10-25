import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TaskManagerFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const buttons = [
    {
      label: "Donor Summary ",
      path: "/report/donorsummary",
      color: "from-pink-500 to-orange-400",
    },
    {
      label: "Promoter  Summary ",
      path: "/report/promoter",
      color: "from-teal-500 to-red-400",
    },
    {
      label: "Receipt  Summary ",
      path: "/report/recepit",
      color: "from-orange-500 to-green-400",
    },
    {
      label: "Donation  Summary ",
      path: "/report/donation",
      color: "from-purple-500 to-red-400",
    },
    {
      label: "School  Summary ",
      path: "/report/school",
      color: "from-blue-500 to-yellow-400",
    },
    {
      label: "10BD  Summary ",
      path: "/report/otg",
      color: "from-pink-500 to-purple-400",
    },
    {
      label: "Suspense  Summary ",
      path: "/report/suspense",
      color: "from-green-500 to-red-400",
    },
    {
      label: "Payment  Summary ",
      path: "/report/payment",
      color: "from-teal-500 to-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`w-full py-2 px-4 text-white rounded-lg transition-all ${
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
  );
};

export default TaskManagerFilter;
