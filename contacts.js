const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts(){
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        console.table(allContacts);
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        const wantedContact = allContacts.find(({ id }) => id === contactId);
        console.table(wantedContact);
    } catch (error) {
        console.error(error);
    }
}


async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        const removedContact = allContacts.filter(({ id }) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(removedContact),"utf8");
        console.log('Contact deleted');
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid(),
        name,
        email,
        phone,
    };

    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        const updatedContacts = [...allContacts, newContact];

        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts),"utf8");
        console.log(`${name} added to contacts`);
    } catch (error) {
        console.error(error);
    }
}


module.exports = { listContacts, getContactById, removeContact, addContact };