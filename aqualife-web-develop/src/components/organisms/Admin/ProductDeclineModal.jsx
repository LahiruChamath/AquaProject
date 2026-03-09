import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const ProductDeclineModal = ({ open, handleOpen, handleStatus }) => {
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Decline Product</DialogHeader>
        <DialogBody>Are you sure you want to decline this product?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleStatus();
              handleOpen();
            }}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProductDeclineModal;
