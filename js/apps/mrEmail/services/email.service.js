// import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"


const emailsDB = [{
    id: utilService.makeId(),
    senderName: 'Moshe B.',
    from: 'moshe.man@gmail.com',
    to: 'vladkt@gmail.com',
    cc: ['broden@gmail.com','mike@gmail.com'],
    subject: 'This email is important!',
    body: 'sup Dawg?? long time no c.',
    isRead: true,
    sentAt: Date.now() - Math.floor(Math.random()*4100000),
    isStarred: false
},
{   
    id: utilService.makeId(),
    senderName: 'Yossi Pupkin',
    from: 'yossi@gmail.com',
    to: 'vladkt@gmail.com',
    cc: ['moran@gmail.com','yoda@gmail.com'],
    subject: 'check this lorem out',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam ut mauris tempor vehicula. Donec feugiat lorem a ex blandit pretium. Sed vestibulum sed orci viverra tincidunt. Cras sem elit, ultrices quis nunc tincidunt, mollis pellentesque justo. Suspendisse efficitur dignissim suscipit. Cras sollicitudin arcu vehicula nisl cursus consectetur. Duis sit amet pellentesque tellus. In mauris metus, consequat suscipit fringilla a, sodales in nunc. Cras malesuada pharetra ante mollis sollicitudin..',
    isRead: false,
    sentAt: Date.now() - Math.floor(Math.random()*9100000),
    isStarred: false
},
{   
    id: utilService.makeId(),
    senderName: 'Maru Yogoshvili',
    from: 'mar@walla.com',
    to: 'vladkt@gmail.com',
    cc: ['yossi@gmail.com','stalin@gmail.com'],
    subject: 'got a new car today',
    body: 'If MoneySaving is your goal, buying a brand spanking new car off the factory line is no way to put pounds back in your pocket. The moment you drive a shiny new model off the forecourt youll lose money, typically in the £1,000s.',
    isRead: false,
    sentAt: Date.now() - Math.floor(Math.random()*6100000),
    isStarred: false
},
{   
    id: utilService.makeId(),
    senderName: 'The Dude',
    from: 'dooder@gmail.com',
    to: 'vladkt@gmail.com',
    cc: ['moran@gmail.com','yoda@gmail.com'],
    subject: 'no subject really :)',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam ut mauris tempor vehicula. Donec feugiat lorem a ex blandit pretium. Sed vestibulum sed orci viverra tincidunt. Cras sem elit, ultrices quis nunc tincidunt, mollis pellentesque justo. Suspendisse efficitur dignissim suscipit. Cras sollicitudin arcu vehicula nisl cursus consectetur. Duis sit amet pellentesque tellus. In mauris metus, consequat suscipit fringilla a, sodales in nunc. Cras malesuada pharetra ante mollis sollicitudin..',
    isRead: false,
    sentAt: Date.now() - Math.floor(Math.random()*9900000),
    isStarred: false
},
{   
    id: utilService.makeId(),
    senderName: 'Mark Sito',
    from: 'sito@gmail.com',
    to: 'vladkt@gmail.com',
    cc: ['moran@gmail.com','yoda@gmail.com'],
    subject: 'hello, brand new lorem for u',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam ut mauris tempor vehicula. Donec feugiat lorem a ex blandit pretium. Sed vestibulum sed orci viverra tincidunt. Cras sem elit, ultrices quis nunc tincidunt, mollis pellentesque justo. Suspendisse efficitur dignissim suscipit. Cras sollicitudin arcu vehicula nisl cursus consectetur. Duis sit amet pellentesque tellus. In mauris metus, consequat suscipit fringilla a, sodales in nunc. Cras malesuada pharetra ante mollis sollicitudin..',
    isRead: false,
    sentAt: Date.now() - Math.floor(Math.random()*9990000),
    isStarred: false
}];

function getEmptyEmail() {
    const emptyEmail = {
    senderName: 'VladKT',
    from: 'vladkt@gmail.com',
    to: '',
    cc: [],
    subject: '',
    body: '',
    isRead: false,
    sentAt: Date.now(),
    isStarred: false
    }
    return Promise.resolve(emptyEmail);
}

function getEmails() {
    return Promise.resolve(emailsDB);
}

function getFilteredEmails(filterBy) {
    var tempArr = null;
    switch(filterBy.emailStatus) {
        case 'unread':
          tempArr = emailsDB.filter(email => !email.isRead);
          break;
        case 'read':
          tempArr = emailsDB.filter(email => email.isRead);
          break;
        case 'all':
          tempArr = emailsDB;
    }
    return Promise.resolve(tempArr.filter(email => {
        return (email.body.includes(filterBy.str)  || email.senderName.toLowerCase().includes(filterBy.str) || email.subject.includes(filterBy.str) || email.from.includes(filterBy.str)) 
    }));
}

function getEmailsStatus() {
const allEmailsCount = emailsDB.length;
let unreadEmailsCount = 0;
emailsDB.forEach(email => {if (!email.isRead) unreadEmailsCount++});
return Promise.resolve({allEmailsCount,unreadEmailsCount});
}

function deleteEmail(emailId) {
    const idx = emailsDB.findIndex(email => email.id === emailId)
    if(idx === -1) return Promise.reject('DID NOT REMOVE EMAIL')
    emailsDB.splice(idx, 1);
    // storageService.store(KEY, cars)
    return Promise.resolve('EMAIL REMOVED')
}

function getEmailById(emailId) {
    const email = emailsDB.find(email => email.id === emailId)
    if(!email) return Promise.reject('error: no email found');
    return Promise.resolve(email);
}

function saveEmail(email) {
    if (!email.id) email.id = utilService.makeId();
    emailsDB.unshift(email);
}

export const emailService = {
    getEmails,
    getFilteredEmails,
    getEmailsStatus,
    deleteEmail,
    getEmailById,
    getEmptyEmail,
    saveEmail
}