import React from "react";
import Popup from "reactjs-popup";
import SignupPage from "../../SignupPage";

const AddUserPopup = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Popup
      modal
      open={open}
      onClose={() => setOpen(false)}
      contentStyle={{
        width: "90%", // Ensures the popup is responsive
        maxWidth: "600px", // Sets a maximum width for larger screens
        padding: "20px", // Optional, improves spacing
        borderRadius: "8px", // Optional, for rounded corners
          zIndex: 50, // Ensures the popup is above other elements
        height: "fit-content", // Ensures the popup is responsive
      }}
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.4)", // Black background with 40% opacity
      }}
    >
      <SignupPage className="bg-white" />
    </Popup>
  );
};

export default AddUserPopup;
