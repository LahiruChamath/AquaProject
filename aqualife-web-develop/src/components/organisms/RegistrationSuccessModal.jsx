import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "../constants";

const RegistrationSuccessModal = ({ open, handleOpen }) => {
  const navigate = useNavigate();

  const handleOkay = () => {
    navigate(LOGIN_PATH);
  };
  return (
    <>
      <Dialog
        open={open}
        handler={handleOkay}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Registration Successful</DialogHeader>
        <DialogBody>Use the registered details to login</DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOkay}>
            <span>Okay</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default RegistrationSuccessModal;
