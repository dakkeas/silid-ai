console.log('test log 1')


// initialize variables
// 

const submitBtn = document.querySelector('.submit-container .submit-button');
const inputArr = document.querySelectorAll('input');
const form = document.querySelector('form');
console.log('submit button')
console.log(submitBtn)

// count for each
let visual = 0;
let aural = 0;
let varkResult = {};
let read = 0;
let kinesthetic = 0;

let result = '';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCwhq2pVe0sSCZ9GdiaYW_TX3fzMBElOqE",
//     authDomain: "silid-ai-939a6.firebaseapp.com",
//     databaseURL: "https://silid-ai-939a6-default-rtdb.firebaseio.com",
//     projectId: "silid-ai-939a6",
//     storageBucket: "silid-ai-939a6.appspot.com",
//     messagingSenderId: "831704041330",
//     appId: "1:831704041330:web:548f66b512c763ee68ffeb",
//     measurementId: "G-YL22G17R5M"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwhq2pVe0sSCZ9GdiaYW_TX3fzMBElOqE",
    authDomain: "silid-ai-939a6.firebaseapp.com",
    databaseURL: "https://silid-ai-939a6-default-rtdb.firebaseio.com",
    projectId: "silid-ai-939a6",
    storageBucket: "silid-ai-939a6.appspot.com",
    messagingSenderId: "831704041330",
    appId: "1:831704041330:web:548f66b512c763ee68ffeb",
    measurementId: "G-YL22G17R5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// /const database = getDatabase(app);


function writeUserSurveyResult(userID, visual, aural, read, kinesthetic) {
    const db = getDatabase();
    set(ref(db, 'vark-questionnaire/' + userID), {
        visual: visual,
        aural: aural,
        read: read,
        kinesthetic: kinesthetic
    })
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('submit button cllicked! --------------------');
    console.log('input arr below')
    console.log(inputArr)


    console.log('COUNT --------------')
    inputArr.forEach(element => {
        if (element.checked) {
            console.log(element.value)

            switch (element.value) {
                case 'visual':
                    visual += 1;
                    break
                case 'aural':
                    aural += 1;
                    break
                case 'read':
                    read += 1;
                    break
                case 'kinesthetic':
                    kinesthetic += 1;
                    break
            }
        }
    })

    // window.location = 'submitted-page.html';
    // inputArr.forEach(element => {
    //     if (element.checked) {
    //         element.checked = false;
    //     }
    // })
    console.log('visual count: ' + visual)
    console.log('aural count: ' + aural)
    console.log('read count: ' + read)
    console.log('kinesthetic count: ' + kinesthetic)
    writeUserSurveyResult('test-run', visual, aural, read, kinesthetic)
    
    // 

    inputArr.forEach(element=> {
        if (element.checked) {
            element.checked = false;
        }
    })
    mainContainer.removeChild(insContainer);
    mainContainer.removeChild(qContainer);
    submittedTextContainer.style.display = "block"
    
})

const submittedTextContainer = document.querySelector('.submitted-text-container');
const mainContainer = document.querySelector('.main-container')
const insContainer = document.querySelector('.ins-container');
const qContainer = document.querySelector('.q-container');




function changeToSubmit() {
    window.location = 'submitted-page.html'
    
}