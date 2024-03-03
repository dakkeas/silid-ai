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
let read = 0;
let kinesthetic = 0;

let result = '';

form.addEventListener('submit', function(event){
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

    window.location = 'submitted-page.html';
    // inputArr.forEach(element => {
    //     if (element.checked) {
    //         element.checked = false;
    //     }
    // })
    console.log('visual count: ' + visual)
    console.log('aural count: ' + aural)
    console.log('read count: ' + read)
    console.log('kinesthetic count: ' + kinesthetic)
    
    
})


