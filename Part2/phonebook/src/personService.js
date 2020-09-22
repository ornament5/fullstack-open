import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
            .then(response => response.data);
};

const create = (name, number) => {
    return axios.post(baseUrl, {name, number})
            .then(response => response.data);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.status);   
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data); 
}

export default {getAll, create, update, remove};