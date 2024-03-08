
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// import { userInfo } from "/register.js";
// import { userInfo } from "./register.js";

let userInfo ;
let testVariable = 'justine';

// firebase configuration

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
let userData;
const app = initializeApp(firebaseConfig);


// VARK
if (document.querySelector('.q-container')){
    let userInfo;
    console.log('get Item test ------------------------')
    console.log(localStorage.getItem('fname'))
    console.log(localStorage.getItem('lname'))
    console.log(localStorage.getItem('email'))
    console.log(localStorage.getItem('password'))
    console.log(localStorage.getItem('strand'))
    console.log(localStorage.getItem('uniqueID'))
    
    userInfo = {
        fname : localStorage.getItem('fname'),
        lname : localStorage.getItem('lname'),
        email : localStorage.getItem('email'),
        password : localStorage.getItem('password'),
        strand : localStorage.getItem('strand'),
        uniqueID : localStorage.getItem('uniqueID')
    }

    const submitBtn = document.querySelector('.submit-container .submit-button');
    const surveyResultArray = document.querySelectorAll('#survey input');
    const surveyForm = document.querySelector('#survey');

    let visual = 0;
    let aural = 0;
    let read = 0;
    let kinesthetic = 0;

    function writeUserSurveyResult(visual, aural, read, kinesthetic, userInfo) {
        const db = getDatabase();
        set(ref(db, 'vark-questionnaire/' + userInfo.uniqueID), {
            varkResult: {
                
                visual: visual,
                aural: aural,
                read: read,
                kinesthetic: kinesthetic,
            },
            userInfo: {

                fname: userInfo.fname,
                lname: userInfo.lname,
                email: userInfo.email,
                password: userInfo.password,
                strand: userInfo.strand
                
            }
        })
    }

    surveyForm.addEventListener('submit', function (event) {
        // submit button 
        
        event.preventDefault();
        console.log('submit button clicked! --------------------');

        surveyResultArray.forEach(element => {
            // counts all ticked boxes  
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

        console.log('visual count: ' + visual)
        console.log('aural count: ' + aural)
        console.log('read count: ' + read)
        console.log('kinesthetic count: ' + kinesthetic)

        writeUserSurveyResult(visual, aural, read, kinesthetic, userInfo)

        surveyResultArray.forEach(element=> {
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
}



if (document.querySelector('.reg-container')) {

    const regisInfoArray = document.querySelectorAll('#registration input');
    const selectedStrand = document.querySelector('#strand');
    const regisBtn = document.querySelector('.register-btn-portion button');
    const registerForm = document.querySelector('#registration');
    const regContainer = document.querySelector('.reg-container');


    function uuidv4() {
        // creates random generator id
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    }

    let fname, lname, email, password, confirmPass, uniqueID, strand;


    
    registerForm.addEventListener('submit', (event) => {

        event.preventDefault();
        

        if (regisInfoArray[3].value == regisInfoArray[4].value) {

            localStorage.setItem("uniqueID", uuidv4());
            localStorage.setItem("fname", regisInfoArray[0].value);
            localStorage.setItem("lname", regisInfoArray[1].value );
            localStorage.setItem("email", regisInfoArray[2].value);
            localStorage.setItem("password", regisInfoArray[3].value);
            localStorage.setItem("strand", selectedStrand.value);
            window.location = 'vark.html';
            
        }
    })


}
