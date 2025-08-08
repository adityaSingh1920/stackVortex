import React from "react";
import IconButton from "./IconButton";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-richblack-800 rounded-lg border border-richblack-600 p-6 w-11/12 max-w-md shadow-lg">
        <p className="text-lg font-semibold text-white mb-2">
          {modalData.text1}
        </p>
        <p className="text-richblack-300 mb-6">{modalData.text2}</p>
        <div className="flex justify-end space-x-4">
          <IconButton
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 rounded-md bg-richblack-700 text-white hover:bg-richblack-600 transition"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
