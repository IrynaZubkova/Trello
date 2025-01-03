import React from 'react';
import './Modal.scss'; // Стилі для модального вікна
import {ModalProps} from '../../../../common/interfaces/ModalProps';


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#ffffff'); // Початковий колір (білий)

  const handleCreateClick = () => {
    if (title.trim() === '') {
      alert('Назва дошки не повинна бути порожньою');
      return;
    }
    const regex = /^[a-zA-Z0-9а-яА-ЯєЄіїІїґҐ\s\-_\.]+$/;
    if (!regex.test(title)) {
      alert('Назва дошки містить недопустимі символи');
      return;
    }
    onCreate(title, color); 
    setTitle(''); 
    onClose(); 
  };

  if (!isOpen) return null;

  //відображення модального вікна:
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
            onChange={(e) => setColor(e.target.value)} // Змінюємо колір
          />
        </label>
        <button onClick={handleCreateClick}>Додати</button>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default Modal
