export interface ModalPropsBoard {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, color: string) => void;
}

export interface ModalPropsCards {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, custom: any) => void;
  cardTitle: string;
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  cardDescription: string;
  setCardDescription: React.Dispatch<React.SetStateAction<string>>;
  cardCustom: any;
  setCardCustom: React.Dispatch<React.SetStateAction<any>>;
}

export interface ModalPropsLists {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}
