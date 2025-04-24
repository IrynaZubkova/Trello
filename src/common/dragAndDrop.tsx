// import { apiPutCards } from '../api/card';

// export function dragAndDrop(board_id: number, position: number) {
//   const dragElements = document.querySelectorAll('div[draggable="true"]');
//   const dropElements = document.querySelectorAll('.listItems');

//   dragElements.forEach(() => addEventListener('dragstart', onDragStart));
//   dragElements.forEach(() => addEventListener('dragleave', onDragLeave));
//   dragElements.forEach(() => addEventListener('dragenter', onDragEnter));

//   dropElements.forEach(() =>
//     addEventListener('dragover', (event) => {
//       event.preventDefault();
//     })
//   );
//   dropElements.forEach(() => addEventListener('drop', (ev) => onDrop(ev, board_id, position)));
// }

// function onDragStart(ev: any) {
//   if (ev.target.className != 'drag') {
//     const div = document.createElement('div');
//     div.className = 'noActive';
//     ev.target.className = 'drag';
//     const el = document.querySelector('.drag');
//     el?.insertAdjacentElement('afterend', div);
//   }
//   ev.dataTransfer.setData('text/plain', ev.target.id);
//   ev.dataTransfer.effectAllowed = 'move';
// }

// function onDragLeave(ev: any) {
//   ev.preventDefault();
//   document.querySelector('.noActive')?.remove();
// }

// function onDragEnter(ev: any) {
//   ev.preventDefault();
//   if (ev.target.classList == 'listItems') {
//     const element = getPosition(ev.target, ev.clientY);
//     if (ev.target.querySelector('.newActive') && ev.target.querySelector('.newActive') !== element) {
//       document.querySelector('.newActive')?.remove();
//     }
//     if (!ev.target.querySelector('.newActive')) {
//       const div = document.createElement('div');
//       div.className = 'newActive';
//       if (element !== null) {
//         element.insertAdjacentElement('afterend', div);
//       } else {
//         ev.target.insertBefore(div, ev.target.lastChild);
//       }
//     }
//   }
// }

// function onDrop(ev: any, board_id: number, position: number) {
//   ev.preventDefault();

//   const data = ev.dataTransfer.getData('text/plain');
//   const el = document.getElementById(data);
//   const elOld = document.querySelector('.newActive');

//   if (el && elOld?.parentElement) {
//     elOld.parentElement.insertBefore(el, elOld);
//     const newlist = el?.parentElement?.parentElement;
//     if (newlist) {
//       apiPutCards(board_id, +data, position, +newlist?.id);
//     }
//   }

//   document.querySelector('.newActive')?.remove();
//   document.querySelector('.drag')?.classList.remove('drag');
// }

// function getPosition(container: any, y: any) {
//   const dragEls = [...container.querySelectorAll('.listItems div[draggable=true]:not(.drag)')];

//   for (const drag of dragEls) {
//     const pos = drag.getBoundingClientRect();
//     if (y < pos.bottom + pos.height / 2) {
//       return drag;
//     }
//   }
//   return null;
// }
