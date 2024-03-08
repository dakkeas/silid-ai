

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
let userInfo;


console.log('register js')
console.log(registerForm)
registerForm.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log(regisInfoArray)

    console.log(regisInfoArray[0].value)

    if (regisInfoArray[3].value == regisInfoArray[4].value) {

        uniqueID = uuidv4(),
            fname = regisInfoArray[0].value,
            lname = regisInfoArray[1].value,
            email = regisInfoArray[2].value,
            password = regisInfoArray[3].value,
            strand = selectedStrand.value



        window.location = 'vark.html';
    }
})

userInfo = {
    uniqueID, uniqueID,
    fname: fname,
    lname: lname,
    strand: strand,
    email: email,
    password: password

}

