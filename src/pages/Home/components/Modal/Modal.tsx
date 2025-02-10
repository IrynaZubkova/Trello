import React from 'react';
import './Modal.scss'; 
import {ModalProps} from '../../../../common/interfaces/ModalProps';
import { toast } from 'react-toastify';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#ffffff');

  const handleCreateClick = () => {
    if (title.trim() === '') {
      toast.error('Назва дошки не повинна бути порожньою');
      return;
    }
    const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/;
    if (!regex.test(title)) {
      toast.error('Назва дошки містить недопустимі символи');
      return;
    }
    onCreate(title, color); 
    setTitle(''); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Додати нову дошку</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва нової дошки"
        />
        <label>
          Оберіть колір фону:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <button onClick={handleCreateClick}>Додати</button>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default Modal
