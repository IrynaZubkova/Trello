import api from './request';

const apiAddList = async (boardId: number, listTitle: string) => {
    const response = await api.post(`/board/${boardId}/list`, { title: listTitle });
    return response.data;
  };
  
  export { apiAddList };
  //!!!! додати якось CREATE_LIST