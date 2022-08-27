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
    addDraftMail,
    sortMails
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
    fullname: 'Hasbula Magomedov',
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
    body: 'Hey bro',
    isRead: false,
    sentAt: 1661352157353,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e105',
    subject: 'Sprint 3!!',
    fullname: 'Coding Academi',
    body: 'Good Luck to everyone in sprint 3, we believe in you!!',
    isRead: false,
    sentAt: 1661350000000,
    to: 'yarindayan11@gmail.com',
    from: 'codingacademy@misterbit.co.il',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e106',
    subject: 'Coding in Coding Academy',
    fullname: 'Yarin Dayan',
    body: 'I really like the way this course is going',
    isRead: false,
    sentAt: 1661352157353,
    to: 'codingacademy@misterbit.co.il',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e107',
    subject: 'Notes App',
    fullname: 'Or beker',
    body: 'I have finished the notes, can you take a look?',
    isRead: false,
    sentAt: 1661352157353,
    to: 'yarindayan11@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e108',
    subject: 'Mails App',
    fullname: 'Yarin Dayan',
    body: 'I have finished the notes, take a look bro',
    isRead: false,
    sentAt: 1641133930594,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e109',
    subject: 'Im not a KID!',
    fullname: 'Hasbulla Magomedov',
    body: 'Stop telling everyone that Im a kid! Im 19 years old!! you ****',
    isRead: false,
    sentAt: 1611133930594,
    to: 'yarindayan11@gmail.com',
    from: 'HasbullaMagomedov@gmail.com',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e110',
    subject: 'SHOCKING!',
    fullname: 'Yarin Dayan',
    body: 'YO bro did you know Hasbulla is literally 19 YO?!',
    isRead: false,
    sentAt: 1661352177353,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e111',
    subject: ' Coding Academy and Or Beker in Coding Academy-Jul 22',
    fullname: 'Slack',
    body: 'You have a new direct message and a new mention in Coding',
    isRead: false,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com',
    from: 'notification@slack.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e112',
    subject: 'You know what',
    fullname: 'Or beker',
    body: `Im gonna ${utilService.makeLorem()}`,
    isRead: false,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e113',
    subject: 'Take it back!',
    fullname: 'Yarin Dayan',
    body: `Im gonna ${utilService.makeLorem()}`,
    isRead: false,
    sentAt: 1551133930594,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e114',
    subject: 'Morty',
    fullname: 'Morty',
    body: 'Hmm Rick, I don\'t know.. I dont think its a good idea to make a party when my parents aren\'t at home',
    isRead: false,
    sentAt: 1589133930594,
    to: 'yarindayan11@gmail.com',
    from: 'Morty@RickAndMorty.com',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e115',
    subject: 'Rick',
    fullname: 'Rick',
    body: 'Of course you will think like that Morty (burp), you are just a cowerd piece of ****(burp)',
    isRead: false,
    sentAt: 1559133930594,
    to: 'yarindayan11@gmail.com',
    from: 'Rick@RickAndMorty.com',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e116',
    subject: 'Morty',
    fullname: 'Morty',
    body: 'Hmm Rick, I don\'t know.. I dont think its a good idea to make a party when my parents aren\'t at home',
    isRead: false,
    sentAt: 1551133930594,
    to: 'Rick@RickAndMorty.com',
    from: 'Morty@RickAndMorty.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e117',
    subject: 'Rick',
    fullname: 'Rick',
    body: 'Of course you will think like that Morty (burp), you are just a cowerd piece of ****(burp)',
    isRead: false,
    sentAt: 1551133930594,
    to: 'Morty@RickAndMorty.com',
    from: 'Rick@RickAndMorty.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e118',
    subject: 'No subject Msg',
    fullname: 'Or beker',
    body: 'No body Msg',
    isRead: false,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e119',
    subject: 'No subject Msg',
    fullname: 'Or beker',
    body: 'No body Msg',
    isRead: true,
    sentAt: 1551133930594,
    to: 'yarindayan11@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e121',
    subject: 'How to hack to the Pantheon',
    fullname: 'Yarin Dayan',
    body: 'Step 1: Go to Paris, Step 2: Just walk to the Paris Pantheon and take w/e you want',
    isRead: true,
    sentAt: null,
    to: 'yarindayan11@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e122',
    subject: 'shokingf!',
    fullname: 'Yarin Dayan',
    body: 'YO bro did you know Hasbulla is',
    isRead: false,
    sentAt: null,
    to: 'orbeker7@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e123',
    subject: ' Coding Academy and Reut Maharat in Coding Academy-Jul 22',
    fullname: 'Slack',
    body: 'You have a new direct message and a new mention in Coding from: Vicky Polatov - Coding Academy @channel מתחיליםםם',
    isRead: false,
    sentAt: 1641553930594,
    to: 'yarindayan11@gmail.com',
    from: 'notification@slack.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e124',
    subject: 'Reminders',
    fullname: 'Or beker',
    body: 'Need to buy milk',
    isRead: false,
    sentAt: 1611133930594,
    to: 'orbeker7@gmail.com',
    from: 'orbeker7@gmail.com',
    isSentToTrash: false,
    isStared: false
},
{
    id: 'e125',
    subject: 'Reminders',
    fullname: 'Yarin Dayan',
    body: 'Need to buy milk and eggs',
    isRead: true,
    sentAt: 1621133930594,
    to: 'yarindayan11@gmail.com',
    from: 'yarindayan11@gmail.com',
    isSentToTrash: false,
    isStared: true
},
{
    id: 'e126',
    subject: 'wassup!',
    fullname: 'Hasbula Magomedov',
    body: 'Wheasdsre are you bro',
    isRead: false,
    sentAt: 1600000000000,
    to: 'yarindayan11@gmail.com',
    from: 'Hasbula@gmail.com',
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
            && mail.to === loggedinUser.email)
    }
    else if (folder === 'stared') {
        mails = mails.filter(mail => mail.isStared
            && mail.to === loggedinUser.email)
    }
    else if (folder === 'draft') {
        mails = mails.filter(mail => !mail.sentAt
            && mail.from === loggedinUser.email
            && !mail.isSentToTrash)
    }
    else if (folder === 'sent') {
        mails = mails.filter(mail => mail.from === loggedinUser.email
            && mail.from === loggedinUser.email
            && mail.sentAt)
    }

    if (filterBy) {
        const { subject, readMails } = filterBy
        if (readMails === "read") {
            mails = mails.filter(mail => (
                mail.isRead === true
            ))
        } else if (readMails === "unread") {
            mails = mails.filter(mail => (
                mail.isRead === false
            ))
        }
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

function addNewMail(mail, mailId) {
    const mails = _loadFromStorage()
    const user = loggedInUser()
    if (!mail.id) mail.id = utilService.makeId()
    else {
        const mailIdx = mails.findIndex(maill => mailId === maill.id)
        mails.splice(mailIdx, 1)
    }
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

function sortMails(sortBy) {
    const mails = _loadFromStorage()
    mails.sort((mail1, mail2) => {
        return sortBy.title === 'ASC' ? mail1.subject.localeCompare(mail2.subject) : mail2.subject.localeCompare(mail1.subject)
    })
    mails.sort((mail1, mail2) => {
        return sortBy.date === 'ASC' ? mail1.sentAt - mail2.sentAt : mail2.sentAt - mail1.sentAt
    })
    _saveToStorage(mails)
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