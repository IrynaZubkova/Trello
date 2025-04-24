import React, { useState } from 'react';
import { ICard } from '../../../../common/interfaces/BoardData';
import { putCard } from '../../../../api/card';
import { apiGetBoardById } from '../../../../api/boards';

export function Card({ setLists, id, title, view, board_id, list_id }: ICard): React.JSX.Element {
  const [newTitle, setTitle] = useState(title);
  const idStr = id?.toString();

  function replaceCard() {
    if (board_id !== undefined && id !== undefined && list_id !== undefined) {
      putCard(board_id, id, newTitle, list_id)
        .then(() => apiGetBoardById(board_id))
        .then((data) => {
          if (data.lists) {
            setLists(data.lists);
          }
        });
    }
  }
  return view ? (
    <div draggable="false" id={idStr}>
      {' '}
      {title}{' '}
    </div>
  ) : (
    <div id={idStr}>
      <input
        type="text"
        placeholder={title}
        value={newTitle}
        onChange={(event) => setTitle(event?.target.value)}
        onKeyDown={(event) => {
          if (event?.key === 'Enter') {
            replaceCard();
          }
        }}
        onBlur={() => replaceCard()}
      ></input>
    </div>
  );
}
