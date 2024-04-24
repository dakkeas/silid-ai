
console.log('firebase setup..............')


// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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

const auth = getAuth(app);


// firebase configuration


















// Initialize Firebase
// 

function register(visual, aural, read, kinesthetic, userInfo) {

    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then(function () {
            // Signed up 
            //user variable

            let user = auth.currentUser

            const db = getDatabase();

            let user_data = {
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
                    strand: userInfo.strand
                }


            }

            set(ref(db, 'users/' + user.uid), { user_data });

            // add this user to firebase database


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // ..
        });




    // set(ref(db, 'vark-questionnaire/' + userid), {
    // })
}
// VARK
if (document.querySelector('.q-container')){
    let userInfo;
    // get user info from browser storage
    console.log('get Item test ------------------------')
    console.log(localStorage.getItem('fname'))
    console.log(localStorage.getItem('lname'))
    console.log(localStorage.getItem('email'))
    console.log(localStorage.getItem('password'))
    console.log(localStorage.getItem('strand'))
    console.log(localStorage.getItem('uniqueID'))
    
    // set into object
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



    surveyForm.addEventListener('submit', function (event) {
        // submit button 
        // collect vark survey result
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

        // write survey result to firebase database

        register(visual, aural, read, kinesthetic, userInfo)

        // write user info to firebase auth
        



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

    // input fields array
    const regisInfoArray = document.querySelectorAll('#registration input');
    const selectedStrand = document.querySelector('#strand');
    const regisBtn = document.querySelector('.register-btn-portion button');
    const registerForm = document.querySelector('#registration');
    const regContainer = document.querySelector('.reg-container');


    // function uuidv4() {
    //     // creates random generator id
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    //         .replace(/[xy]/g, function (c) {
    //             const r = Math.random() * 16 | 0,
    //                 v = c == 'x' ? r : (r & 0x3 | 0x8);
    //             return v.toString(16);
    //         });
    // }

    // let fname, lname, email, password, confirmPass, uniqueID, strand;


    
    registerForm.addEventListener('submit', (event) => {

        event.preventDefault();
        

        if (regisInfoArray[3].value == regisInfoArray[4].value) {

            // localStorage.setItem("uniqueID", uuidv4());
            localStorage.setItem("fname", regisInfoArray[0].value);
            localStorage.setItem("lname", regisInfoArray[1].value );
            localStorage.setItem("email", regisInfoArray[2].value);
            localStorage.setItem("password", regisInfoArray[3].value);
            localStorage.setItem("strand", selectedStrand.value);
            window.location = 'vark.html';
            
        }
    })


}
// NEW
// 
// modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





if (document.querySelector('.login-body')) {
    console.log('###########LOGIN PAGE#############')

    const loginPageLoginBtn = document.querySelector('.login-button button');
    console.log(loginPageLoginBtn)
    loginPageLoginBtn.onclick = function() {
        console.log('login button clicked!')
        modal.style.display = "block";
    }

}

if (document.querySelector('.front-img-container')) {
    // home page
    console.log('###########HOME PAGE#############')
    const homePageLoginBtn = document.querySelector('.header-login-container button');
    const homePageSignUpBtn= document.querySelector('.front-signin-container button');
    
    homePageLoginBtn.addEventListener('click', () => {
        console.log('hey') 
        window.location = ('login.html')

    }) 

    homePageSignUpBtn.addEventListener('click', () => {
        console.log('hey') 
        window.location = ('signup.html')

    }) 
   
    
    
}