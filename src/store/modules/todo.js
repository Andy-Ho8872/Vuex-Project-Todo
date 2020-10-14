import axios from 'axios';

const state = {
    todos: []
};


const getters = { // get data from "State" and present as a function
    allTodos: (state) => state.todos
};


const actions = {
    async fetchTodos({ commit }) { // { commit } is to make a commit to mutations, because actions are often used for asynchronous functions
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log(response.data);
        
        commit('setTodos', response.data); // to change the mutation
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title, completed: false })

        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

        commit('removeTodo', id)
    },
    async filterTodos({ commit }, event) {
        // Get seleted number
        const limit = parseInt(event.target.options[event.target.selectedIndex].innerText) // to get the limit value
        console.log(limit);

        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)

        commit('setTodos', response.data)
    },
    async updateTodo({ commit }, updaTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updaTodo.id}`, updaTodo)

        console.log(response.data);

        commit('updateTodo', response.data)
    }
};


const mutations = { // payload == response.data
    setTodos: (state, payload) => (state.todos = payload),

    newTodo: (state, todo) => state.todos.unshift(todo),

    removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id != id),

    updateTodo: (state, updaTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updaTodo.id)
        if(index !== -1) {
            state.todos.splice(index, 1, updaTodo)
        }
    }
};

export default {
    state: state, // could be shorten if the name is the same as constant
    getters,
    actions,
    mutations
};