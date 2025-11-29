import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const BaseModal = ({
  open,
  setOpen,
  title = "Modal title",
  footer = () => {},
  toggle = () => {},
  children,
  size = "xl",
}) => {
  return (
    <Modal isOpen={open} toggle={setOpen} size={size} zIndex={1000}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer()}</ModalFooter>
    </Modal>
  );
};

export default BaseModal;
