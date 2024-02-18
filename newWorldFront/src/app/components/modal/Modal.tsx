import styles from "./Modal.module.scss";
import { ModalProps } from "@/app/types/Modal";

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{content}</p>
        <div className={styles.buttons}>
          <button className={styles.confirm_button} onClick={onConfirm}>
            {confirmText}
          </button>
          <button className={styles.cancel_button} onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
