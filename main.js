'use strict'

const openModal = () => document.getElementById("modal").classList.add('active')
const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

// CRUD - creat read update delete

// CRUD - DELETE

const delete = (index) => {
    const dbCliente = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// CRUD - UPDATE
 
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client 
    setLocalStorage(dbClient)
}

// CRUD - READ

const readClient = () => getLocalStorage()

// CRUD - CREATE
const creatClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFilds = () => {
    return document.getElementById('form').reportValidity()
} 

// Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-fields')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isValidFilds()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        creatClient(client)
        closeModal()
    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHtml = ˋ
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    ˋ
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(createRow)
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click' saveClient)