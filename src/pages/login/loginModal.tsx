import React from "react";
import { SuccessRegisterModal } from "../../shared/modal";

export const LoginModal: React.FC <{ text: string }> = ({ text }) => {
   
  return (
    <SuccessRegisterModal data-testid="modal-div">
      <p data-testid="modal-txt">{text}</p>
    </SuccessRegisterModal>
  );
};
