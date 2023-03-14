import axios from 'axios';


const url = "http://localhost:3001/todos";

export const getallTodos = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addTodo = async (todoForm) => {
    return await axios.post(url,todoForm);
}

export const editTodo = async (id, todoForm) => {
    return await axios.put(`${url}/${id}`,todoForm);
}


export const deleteTodo = async (id) => {
    return await axios.delete(`${url}/${id}`);
}