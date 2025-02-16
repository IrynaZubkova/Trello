import React, { useState, useEffect } from 'react';

import { EditableBoardBackgroundProps } from '../../../../common/interfaces/EditableBoardBackgroundProps';

const EditableBoardBackground: React.FC<EditableBoardBackgroundProps> = ({
  boardId,
  initialBackground,
  onBackgroundChange,
}) => {
  const [backgroundType, setBackgroundType] = useState<'color' | 'image'>('color');
  const [backgroundColor, setBackgroundColor] = useState<string>(initialBackground);
  const [image, setImage] = useState<string | null>(null); 
  const [imageFile, setImageFile] = useState<File | null>(null); 

  
  const convertImageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (imageFile) {
      convertImageToBase64(imageFile)
        .then((base64Image) => {
          setImage(base64Image); 
        })
        .catch((err) => console.error('Помилка при конвертації зображення:', err));
    }
  }, [imageFile]);


  const handleColorChange = async () => {
    const newColor = backgroundColor;
    setBackgroundColor(newColor);
    const boardItem = document.querySelector('.board');
    if (boardItem) {
      (boardItem as HTMLElement).style.backgroundColor = newColor; 
    }
    console.log('Відправка нового кьогору на сервер:', newColor);
    if (onBackgroundChange) {
      onBackgroundChange( newColor, 'color');
    }
  };

  const handleImageChange = async () => {
    if (!image) {
      console.error('Зображення не вибрано');
      return;
    }
    console.log('Відправка base64 зображення на сервер:', image);
    
    const boardItem = document.querySelector('.board');
    if (boardItem) {
      (boardItem as HTMLElement).style.backgroundImage = `url(${image})`; 
    }
    if (onBackgroundChange) {
      onBackgroundChange(image, 'image'); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); 
    }
  };

  return (
    <div className="editable-board-background">
      
      <label>
        <span>Виберіть тип фону:</span>
        <div>
          <input
            type="radio"
            id="color"
            name="background-type"
            checked={backgroundType === 'color'}
            onChange={() => setBackgroundType('color')}
          />
          <label htmlFor="color">Колір</label>

          <input
            type="radio"
            id="image"
            name="background-type"
            checked={backgroundType === 'image'}
            onChange={() => setBackgroundType('image')}
          />
          <label htmlFor="image">Зображення</label>
        </div>
      </label>

      {backgroundType === 'color' ? (
        <>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            aria-label="Виберіть колір фону дошки"
          />
          <button className="save-color-btn" onClick={handleColorChange}>Зберегти колір</button>
        </>
      ) : (
        <>
         <div className="image-upload-container">
          <div style={{ backgroundImage: `url(${image})` }}></div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} 
          />
          <button  className="save-image-btn" onClick={handleImageChange}>Зберегти картинку</button>
        </div>
        </>
      )}
    </div>
  );
};

export default EditableBoardBackground;
