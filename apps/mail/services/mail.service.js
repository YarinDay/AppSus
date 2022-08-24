import { func } from "prop-types"
import { storageService } from "../../../services/storage.service.js"

export const mailService = {
    loggedInUser,
    getMails,
    query,
    getById
}

const STORAGE_KEY = 'mailsDB'
const gMails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com'
},
{
    id: 'e102',
    subject: 'wassup!',
    body: 'Where are you bro',
    isRead: false,
    sentAt: 1661352157353,
    to: 'orbeker7@gmail.com'
},
{
    id: 'e103',
    subject: 'wassup!',
    body: 'Where are you bro',
    isRead: false,
    sentAt: 1600000000000,
    to: 'orbeker7@gmail.com'
},
{
    id: 'e104',
    subject: 'wassup!',
    body: 'Where are you bro',
    isRead: false,
    sentAt: 1661352157353,
    to: 'orbeker7@gmail.com'
}
]

function query(filterBy) {
    let mails = _loadFromStorage()
    if (!mails || !mails.length) {
        mails = getMails()
        _saveToStorage(mails)
    }

    if (filterBy) {
        let { subject } = filterBy
        console.log('filterBy from service', filterBy)
        mails = mails.filter(mail => (
            mail.subject.toUpperCase().includes(subject.toUpperCase())
        ))
    }
    return Promise.resolve(mails)
}

function getById(mailId){
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}


function loggedInUser() {
    const loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    return loggedinUser
}

function getMails() {
    return gMails
}

function _saveToStorage(mails) {
    storageService.saveToStorage(STORAGE_KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}