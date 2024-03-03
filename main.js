console.log('test log 1')


// initialize variables
// 

const submitBtn = document.querySelector('.submit-container .submit-button');
const inputArr = document.querySelectorAll('input');
const form = document.querySelector('form');


console.log('submit button')
console.log(submitBtn)


form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('submit button cllicked! --------------------');
    console.log('input arr below')
    console.log(inputArr)
    

    console.log('input arr for each below ')
    
    inputArr.forEach(element=> {
        if (element.checked) {
            console.log(element.value)
        }
    })
    
    
})


