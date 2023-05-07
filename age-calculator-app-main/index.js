const submitButton = document.getElementById('submit-button');

submitButton.addEventListener('submit',(e)=>{
    console.log(e.target)
    e.preventDefault()
})