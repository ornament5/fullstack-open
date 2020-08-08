import axios from 'axios';

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
            .then(response => response.data);
};

const create = (name, number) => {
    return axios.post('http://localhost:3001/persons', {name, number})
            .then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
    .then(response => response.status);   
}

const update = (id, updatedPerson) => {
  return axios.put(`http://localhost:3001/persons/${id}`, updatedPerson)
    .then(response => response.data); 
}

export default {getAll, create, update, remove};