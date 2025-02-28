export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, color: string) => void;
}
