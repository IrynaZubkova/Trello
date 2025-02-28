export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}
