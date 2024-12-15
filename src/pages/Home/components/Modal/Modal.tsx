import React from 'react';
import './Modal.scss'; // Стилі для модального вікна

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = React.useState('');

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
    onCreate(title); // Викликаємо onCreate з назвою
    setTitle(''); // Очищуємо поле
    onClose(); // Закриваємо модальне вікно
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Додати нову дошку</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва нової дошки" />
        <button onClick={handleCreateClick}>Додати</button>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default Modal;
