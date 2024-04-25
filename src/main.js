
console.log('firebase setup..............')


// import { doc } from 'firebase/firestore';
// Add Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { get, getDatabase, ref, set, child} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
            window.open('user.html')
            
        }
    })


}
// NEW

// modal


const modal = document.getElementById("myModal");

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
const loginModal = document.querySelector('#loginModal')

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}





// if (document.querySelector('.login-body')) {
//     console.log('###########LOGIN PAGE#############')

//     const loginPageLoginBtn = document.querySelector('.login-button button');
//     console.log(loginPageLoginBtn)
//     loginPageLoginBtn.onclick = function() {
//         console.log('login button clicked!')
//         modal.style.display = "block";
//     }

// }


if (document.querySelector('.user-page')) {
    console.log('############# USER PAGE ##############')
    
    const userLogOutBtn = document.querySelector('.nav-section #user-logout');
    const userHomeBtn = document.querySelector('.nav-section #user-go-home');
    console.log(userLogOutBtn)

    let userCreds = JSON.parse(sessionStorage.getItem('user-cred'));
    let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
   

    const nameGreetHeader = document.querySelector(".current-user-fname");
    const pfpName = document.querySelector('#pfp-name');
    
    const varkSurvey = document.querySelector("#vark-questionnaire");
    const preTest = document.querySelector("#pretest");
    const postTest= document.querySelector("#posttest");
    
    
    
    
    
    userHomeBtn.onclick = () => {
        window.location = 'home.html';
    }

    
    userLogOutBtn.onclick = () => {
        sessionStorage.removeItem('user-cred');
        sessionStorage.removeItem('user-info');
        window.location = 'home.html';
    }

    varkSurvey.onclick = () => {
        window.location = 'vark2.html'
    } 

    postTest.onclick = () => {
        
        window.location = 'posttest.html'
    } 
    preTest.onclick = () => {
        window.location = 'pretest.html'
    } 
    
    
    nameGreetHeader.textContent =   userInfo.fname;
    pfpName.textContent = userInfo.fname + ' ' + userInfo.lname;

    let checkCred = () => {
        if (!sessionStorage.getItem('user-cred')) {
            window.location = 'home.html';
        } else {

            
            
            
        }
    }

    window.addEventListener('load', checkCred) 
    
}



function userLoggedIn() {
    if (sessionStorage.getItem('user-cred')) {
        return true
    } else {
        return false
    }
}
if (document.querySelector('.front-img-container')) {
    const homePageLoginBtn = document.querySelector('.header-login-container button');
    const homePageSignUpBtn = document.querySelector('.front-signin-container button');

    if (userLoggedIn()) {

        // use toggle instead
        homePageLoginBtn.textContent = 'Log Out' 
        homePageSignUpBtn.textContent = 'Go to Dashboard'
        
        homePageLoginBtn.onclick = () => {
            sessionStorage.removeItem('user-cred');
            sessionStorage.removeItem('user-info');
            window.location = 'home.html';
            
        }
        
        homePageSignUpBtn.onclick = () => {
            window.location = 'user.html';
            
        }
        
    }

    // home page
    // 
    const auth = getAuth();
    const db = getDatabase(); 
    // login modal input fields

    const loginEmail = document.querySelector('#loginEmail');
    const loginPassword = document.querySelector('#loginPw');
    const loginModalBtn = document.querySelector('.login-button button');
    

    loginModalBtn.onclick = (event) => {
        // remove default functions
        event.preventDefault();
        
        console.log('clicked on login modal!')
        
        if (validate_email(loginEmail.value )=== false || validate_password(loginPassword.value) === false) {

            alert('invalid email/password format!')
            return

        }


        
        signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
            .then((userCredential) => {
                console.log('signing in');
                const user = userCredential.user;
                
                console.log(user.uid)
                
                get(child(ref(db), 'users/' + user.uid + '/userInfo')).then((snapshot) => {
                    // retrieving data at this instance/snapshot
                    
                    console.log('retrieving data!') 
                    if(snapshot.exists()) {
                        // if there is data!
                        console.log('snapshot exists!') 
                        console.log(snapshot.val())
                        sessionStorage.setItem("user-info", JSON.stringify({
                            // making an object from the values retrived from firebase
                            // stringify makes the object into a string
                            // session storage gets lost when tab is closed or redirected
                            // saving the object into the session storage!
                            email: snapshot.val().email,
                            fname: snapshot.val().fname,
                            lname: snapshot.val().lname
                        }))
                        
                        sessionStorage.setItem("user-cred", JSON.stringify(user))
                        
                        window.location = ('user.html')
                        
                    } else {
                        console.log('NO DATA FOUND!')
                    }

                    
                })
            })
            .catch((error) => {
                alert(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    
    console.log('test!')
    console.log('###########HOME PAGE#############')

    // login and signup button on home screen

     
    homePageLoginBtn.addEventListener('click', () => {
        // clicking login button opens modal
        // sets style to flex from 'none'
        if (!userLoggedIn()) {
            console.log('modal!!!!')
            loginModal.style.display = 'flex';
            
        } else {
            return
        }
    }) 

    homePageSignUpBtn.addEventListener('click', () => {
        // navigates to signup page when signup btn is clicked
        if (!userLoggedIn())  {
            window.location = ('signup.html')
        }

    }) 
    

}

// initialize variables





function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/;

    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        console.log('password is too short!')
        return false
    } else {
        return true
    }
}


function validate_field(field) {
    if (field == null) {
        return false
    } else {
        return true
    }
}



if (document.querySelector('.signup-body')) {
    console.log('######### SIGN UP PAGE #############')
    

    // input fields
    
    // signup btn
    const signUpPageSignUpBtn = document.querySelector('.signup-button button');
    
    
    // when signup btn is clicked 
    //
    signUpPageSignUpBtn.onclick = function(event) {
        
        console.log('clicked!')
        event.preventDefault()
        
        const auth = getAuth();
        const db = getDatabase();

        console.log(db)
        const signUpInputFields = document.querySelectorAll('#signup div input')
        const signUpFName = document.querySelector("#fname")
        const signUpLName = document.querySelector("#lname")
        const signUpEmail = document.querySelector("#email")
        const signUpPw = document.querySelector('#pw');
        const signupConfirmPw = document.querySelector('#confirmpw');

        if (signUpPw.value !== signupConfirmPw.value) {
            console.log('passwords dont match!')
            return
        }
        if (validate_email(signUpEmail.value) == false || validate_password(signUpPw.value) == false) {
            console.log('invalid email or password!')
            return
            // dont run code anymore
        }

        if (validate_field(signUpFName.value) == false || validate_field(signUpLName.value) == false) {
            console.log('missing input fields!')
            return
        }
        console.log('creating user................')
        createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPw.value).then((userCredential) => {
            let user = userCredential.user;
            console.log('user created!')
            console.log(user.uid)
            // add this to firebase database
            // 
            // let database_ref = database.ref();

            

            set(ref(db, 'users/' + user.uid + '/userInfo'), {
                fname: signUpFName.value,
                lname: signUpLName.value,
                email: signUpEmail.value,
                last_login: Date.now()
            })
            // tree: users/user.uid/user_data(object)
            // 


            // window.location = 'home.html'

        }).catch((error) => {
            console.log('error found!')
            let error_code = error.code;
            let error_message = error.message;
            console.log(error_message)
            console.log(error_code)
        })


    }
    
    



}
