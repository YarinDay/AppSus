import { func } from "prop-types"
import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    loggedInUser,
    getMails,
    query,
    addNewMail,
    getById,
    markAsRead,
    sendToTrash,
    toggleStarMail,
    getUnreadMails,
    addDraftMail
}

const STORAGE_KEY = 'mailsDB'
const gMails = [{
    id: 'e101',
    subject: 'Miss you!',
    fullname: 'Or beker',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e102',
    subject: 'wassup!',
    fullname: 'Yarin Dayan',
    body: 'Where are you bro',
    isRead: false,
    sentAt: 1661352157353,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e103',
    subject: 'wassup!',
    fullname: 'Hasbula Bulabula',
    body: 'Wheasdsre are you bro',
    isRead: false,
    sentAt: 1600000000000,
    to: 'orbeker7@gmail.com',
    from: 'Hasbula@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e104',
    subject: 'wassup!',
    fullname: 'Yarin Dayan',
    body: 'Wheyou bro',
    isRead: false,
    sentAt: 1661352157353,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
}
]

function query(filterBy, folder) {
    const loggedinUser = loggedInUser()
    let mails = _loadFromStorage()
    if (!mails || !mails.length) {
        mails = getMails()
        _saveToStorage(mails)
    }

    if (folder === 'inbox') {
        mails = mails.filter(mail => !mail.isSentToTrash
            && mail.to === loggedinUser.email
            && mail.sentAt)
    }
    else if (folder === 'trash') {
        mails = mails.filter(mail => mail.isSentToTrash
            && mail.to === loggedinUser.email
            && mail.sentAt)
    }
    else if (folder === 'stared') {
        mails = mails.filter(mail => mail.isStared
            && mail.to === loggedinUser.email)
    }
    else if (folder === 'draft') {
        mails = mails.filter(mail => !mail.sentAt
            && mail.from === loggedinUser.email)
    }
    else if (folder === 'sent') {
        mails = mails.filter(mail => mail.from === loggedinUser.email
            && mail.from === loggedinUser.email
            && mail.sentAt)
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

function getById(mailId) {
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function addNewMail(mail) {
    const mails = _loadFromStorage()
    const user = loggedInUser()
    mail.id = utilService.makeId()
    mail.from = user.email
    mail.fullname = user.fullname
    mail.sentAt = Date.now()
    mails.push(mail)
    _saveToStorage(mails)
}
function addDraftMail(mail) {
    const mails = _loadFromStorage()
    const user = loggedInUser()
    mail.id = utilService.makeId()
    mail.from = user.email
    mail.fullname = user.fullname
    mails.push(mail)
    _saveToStorage(mails)
}

function markAsRead(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    mail.isRead = true
    _saveToStorage(mails)
}

function sendToTrash(mailId) {
    const mails = _loadFromStorage()
    const mailIdx = mails.findIndex(mail => mailId === mail.id)
    if (!mails[mailIdx].isSentToTrash) mails[mailIdx].isSentToTrash = true
    else if (mails[mailIdx].isSentToTrash) mails.splice(mailIdx, 1)
    _saveToStorage(mails)
}

function toggleStarMail(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    mail.isStared = mail.isStared ? false : true
    _saveToStorage(mails)
}

function getUnreadMails() {
    const loggedinUser = loggedInUser()
    const mails = _loadFromStorage()
    if (!mails || !mails.length) return
    let unreadMails = 0
    mails.map(mail => {
        if (!mail.isRead && !mail.isSentToTrash && mail.to === loggedinUser.email) unreadMails++
    })
    return unreadMails
}

function loggedInUser() {
    const loggedinUser = {
        email: 'yarindayan11@gmail.com',
        fullname: 'Yarin Dayan'
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