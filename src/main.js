
console.log('firebase setup..............')

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



const modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];


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


if (document.querySelector('.user-page')) {
    console.log('############# USER PAGE ##############')

    
    
    const userLogOutBtn = document.querySelector('.nav-section #user-logout');
    const userHomeBtn = document.querySelector('.nav-section #user-go-home');
    console.log(userLogOutBtn)

    let userCreds = JSON.parse(sessionStorage.getItem('user-cred'));
    let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
   

    const nameGreetHeader = document.querySelector(".current-user-fname");
    const pfpName = document.querySelector('#pfp-name');
    
    const varkSurvey = document.querySelector("#vark");
    const preTest = document.querySelector("#pretest");
    const postTest= document.querySelector("#posttest");
    
    
  
    const db = getDatabase();

    get(child(ref(db), `users/${userCreds.uid}/vark`)).then(snapshot => {
        console.log(snapshot.val())
        if (snapshot.exists()) {
            varkSurvey.disabled = true;
            // console.log('exists!')
            varkSurvey.style.backgroundColor = 'grey';
            varkSurvey.style.cursor= 'default';
            varkSurvey.innerHTML = 'Completed'
        } 
    }).then( () => {
        varkSurvey.onclick = () => {
            window.location = 'vark2.html'
        } 
        
    })

    get(child(ref(db), `users/${userCreds.uid}/pretest`)).then(snapshot => {
        console.log(snapshot.val())
        if (snapshot.exists()) {
            preTest.disabled = true;
            console.log('exists!')
            preTest.style.backgroundColor = 'grey';
            preTest.style.cursor= 'default';
            preTest.innerHTML = 'Completed'
        } 
    }).then( () => {
        preTest.onclick = () => {
            window.location = 'pretest.html'
        } 
        
    })

    get(child(ref(db), `users/${userCreds.uid}/posttest`)).then(snapshot => {
        console.log(snapshot.val())
        if (snapshot.exists()) {
            postTest.disabled = true;
            console.log('exists!')
            postTest.style.backgroundColor = 'grey';
            postTest.style.cursor= 'default';
            postTest.innerHTML = 'Completed'
        } else {

            console.log(' no post test taken yet!!')
        }
    }).then( () => {
        get(child(ref(db), `users/${userCreds.uid}/pretest`)).then(snapshot => {
            if (snapshot.exists()){
                postTest.onclick = () => {
                    window.location = 'posttest.html'

                } 
                console.log('pretest taken, can take posttest!') 

            } else {
                postTest.style.backgroundColor = 'grey';
                postTest.style.cursor= 'default';
                postTest.innerHTML = 'Complete Pretest First!'
                postTest.style.fontSize= '10px'
                console.log('no pretest yet, take pretest first!')
            }
            
        })
        
    })

    
    userHomeBtn.onclick = () => {
        window.location = 'index.html';
    }

    
    userLogOutBtn.onclick = () => {
        sessionStorage.removeItem('user-cred');
        sessionStorage.removeItem('user-info');
        window.location = 'index.html';
    }

    
    
    nameGreetHeader.textContent =   userInfo.fname + '!';
    pfpName.textContent = userInfo.fname + ' ' + userInfo.lname;

    let checkCred = () => {
        if (!sessionStorage.getItem('user-cred')) {
            window.location = 'index.html';
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

const auth = getAuth();
const db = getDatabase(); 
if (document.querySelector('.front-img-container')) {
        // home page!
    const homePageLoginBtn = document.querySelector('.header-login-container button');
    const homePageSignUpBtn = document.querySelector('.front-signin-container button');
    const modalSignUpBtn = document.querySelector("#modal-signup-btn");
    
    if (userLoggedIn()) {

        // use toggle instead
        homePageLoginBtn.textContent = 'Log Out' 
        homePageSignUpBtn.textContent = 'Go to Dashboard'
        
        homePageLoginBtn.onclick = () => {
            sessionStorage.removeItem('user-cred');
            sessionStorage.removeItem('user-info');
            window.location = 'index.html';
            
        }
        
        homePageSignUpBtn.onclick = () => {
            window.location = 'user.html';
            
        }
        
    }

    modalSignUpBtn.onclick = () => {
        window.location = 'signup.html'
    }

    // home page
    // 
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
        // const signUpInputFields = document.querySelectorAll('#signup div input')
        const signUpFName = document.querySelector("#fname")
        const signUpLName = document.querySelector("#lname")
        const signUpEmail = document.querySelector("#email")
        const signUpPw = document.querySelector('#pw');
        const signupConfirmPw = document.querySelector('#confirmpw');
        const strand = document.querySelector('#strand')

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
                pw: signupConfirmPw.value, 
                strand: strand.value,
                last_login: Date.now()
            }).then(() => {
                window.location = 'index.html'
            })
            // tree: users/user.uid/user_data(object)
            // 
                //

                
            // window.location = 'index.html'

        }).catch((error) => {
            console.log('error found!')
            let error_code = error.code;
            let error_message = error.message;
            console.log(error_message)
            console.log(error_code)
        })


    }
    
    



}



if (document.querySelector('#survey')); {
    console.log('vark')
    

    let visual = 0;
    let aural = 0;
    let read = 0;
    let kinesthetic = 0;

    
    const varkCheckBoxes = document.querySelectorAll('#survey div div input[type="checkbox"]');
    
    console.log(varkCheckBoxes)
    
    const submitVarkBtn = document.querySelector('#submit-vark');
    
    
 
    
    // get session storage first!
        // 
    let userCreds = JSON.parse(sessionStorage.getItem('user-cred'));
    let userInfo = JSON.parse(sessionStorage.getItem('user-info'));

        //  run code!

    // write to firebase!
    function postVarkResult(visual,aural,read,kinesthetic, uid) {
        console.log(uid)
        set(ref(db, 'users/' + uid + '/vark'), {
            visual: visual,
            aural: aural,
            read: read,
            kinesthetic: kinesthetic,
            last_taken: Date.now()
        }).then(() => {
            window.location = 'index.html'
        })
    }
    // on click!
    console.log(submitVarkBtn)

    if (submitVarkBtn) {
        submitVarkBtn.addEventListener('click', (event) => {
            event.preventDefault();
            varkCheckBoxes.forEach(checkbox => {
                if (checkbox.checked) {

                    console.log('true')
                    // if check box is checked
                    switch (checkbox.value) {

                        case 'visual':
                            visual += 1
                            break
                        case 'aural':
                            aural += 1
                            break
                        case 'read':
                            read += 1
                            break
                        case 'kinesthetic':
                            kinesthetic += 1
                            break
                    }


                }

            })
            console.log(visual)
            console.log(aural)
            console.log(read)
            console.log(kinesthetic)

            postVarkResult(visual,aural,read,kinesthetic,userCreds.uid)

            
            alert('successfully posted in firebase!')
            
        })
            
            
        }
            

        // writo to fb!

    };




if (document.querySelector(".pretest")) {
    console.log('hey!')
    
    const radioBtns = document.querySelectorAll('#pretest div div input');
 
    const submitPretestBtn = document.querySelector('#submit-pretest');
    const userCreds = JSON.parse(sessionStorage.getItem('user-cred'));
    
    let easy = 0;
    let intermediate = 0;
    let difficult = 0;

    let inc = 0;
    if (submitPretestBtn) {
        submitPretestBtn.onclick = (event) => {
            event.preventDefault();

            radioBtns.forEach((radio) => {
                if (radio.checked) {
                    switch (radio.value) {
                        case 'easy':
                            easy += 1;
                            break;
                        case 'intermediate':
                            intermediate += 1;
                            break;
                        case 'difficult':
                            difficult += 1;
                            break;

                        case 'inc':
                            inc += 1;
                            break

                    }


                }
            })

            console.log(`inc: ${inc}`)
            console.log(`easy: ${easy}`)
            console.log(`intermediate: ${intermediate}`)
            console.log(`difficult: ${difficult}`)



            set(ref(db, 'users/' + userCreds.uid + '/pretest'), {

                easy: easy,
                intermediate: intermediate,
                difficult: difficult,
                last_taken: Date.now()

            }).then(() => {
                alert('successfully taken pretest!')
                window.location = 'user.html'
            })




        }

    }
    
    

    
    
    
    
}


if (document.querySelector('#posttest')) {
    
    const radioBtns = document.querySelectorAll('input[type="radio"]');
    const submitPostTestBtn = document.querySelector('#submit-posttest');

    const userCreds = JSON.parse(sessionStorage.getItem('user-cred'));
    
    
    let score = 0
    let incorrect = 0
    

    submitPostTestBtn.onclick = (event) => {
        event.preventDefault();
        
        radioBtns.forEach((radio) => {
            
            if (radio.checked) {
                if (radio.value === 'crt') {
                    score += 1;
                    
                } else {
                    incorrect += 1;
                    
                }
                

                
            }
        })
        
        console.log('score: ' + score + '/15')
        console.log(incorrect)
        

        set(ref(db, 'users/' + userCreds.uid + '/posttest' ), {
            score: score,

        }).then(() => {
            alert('successfully submitted posttest');
            window.location = 'user.html';
            
        })
        
    } 
    
}