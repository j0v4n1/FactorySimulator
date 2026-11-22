import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import {
  changeStatusIsLoading,
  closeModal,
} from "../../store/slices/ui-slice.ts";
import type { ReactNode } from "react";

interface AppModalProps {
  children: ReactNode;
  confirmAction?: () => void;
}
export default function AppModal({ children, confirmAction }: AppModalProps) {
  const { title, show, size, isLoading } = useAppSelector(
    (state) => state.uiSlice.modal,
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      onExited={() => dispatch(changeStatusIsLoading(false))}
      show={show}
      onHide={handleClose}
      size={size}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        {confirmAction && (
          <Button
            disabled={isLoading}
            variant="secondary"
            onClick={confirmAction}
          >
            Подтвердить
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
