//Elements selectors
const submitButton = document.getElementById('submit-button');
const year = document.getElementById('year_input')
const month = document.getElementById('month_input')
const day = document.getElementById('day_input');
const labels = document.querySelectorAll('label');
const dayErrorBox = document.querySelector('.validation.day');
const ageYears = document.querySelector('.age.years');
const ageMonths = document.querySelector('.age.months');
const ageDays = document.querySelector('.age.days');
//present Date.
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1 //we add 1 here because month index starts with 0
const currentDay = currentDate.getDate() //day starts with 0 (Sunday=0)


const userInput = [year,month,day]
let noError = true
function showEmptyFieldError(field){
    /* this function takes the input-name as field argument and 
    shows field is requried error to the user if any field is left blank.*/
    const errorMessageBox = document.querySelector(`.validation.${field.name}`);
    errorMessageBox.innerText = 'This field is required'
    const label = document.querySelector(`label[for=${field.name}]`);
    const fieldInput = document.getElementById(`${field.name}_input`);
    fieldInput.classList.add('error-outline');
    label.classList.add('error');
    errorMessageBox.classList.add('error');
}
function errorWholeForm(){
    year.classList.add('error-outline');
    month.classList.add('error-outline');
    day.classList.add('error-outline');
    labels[0].classList.add('error');
    labels[1].classList.add('error');
    labels[2].classList.add('error');
    dayErrorBox.innerText = 'Must be valid a date';
    dayErrorBox.classList.add('error');

}
function removeWholeError(){
    year.classList.remove('error-outline');
    month.classList.remove('error-outline');
    day.classList.remove('error-outline');
    labels[0].classList.remove('error');
    labels[1].classList.remove('error');
    labels[2].classList.remove('error');
    dayErrorBox.classList.remove('error');

}
//custom input validators
year.addEventListener('input',(e)=>{
    const errorMessageBox = document.querySelector(`.validation.${e.target.name}`)
    const label = document.querySelector(`label[for=${e.target.name}]`)
    const fieldInput = document.getElementById(`${e.target.name}_input`);
    if(year.value > currentYear){
        errorMessageBox.innerText = 'Must be in the past.';
        errorMessageBox.classList.add('error');
        label.classList.add('error')
        fieldInput.classList.add('error-outline');
        noError = false;
    }
    else{
        errorMessageBox.classList.remove('error');
        label.classList.remove('error');
        fieldInput.classList.remove('error-outline');
        noError = true;
    }
})
month.addEventListener('input',(e)=>{
    const errorMessageBox = document.querySelector(`.validation.${e.target.name}`)
    const label = document.querySelector(`label[for=${e.target.name}]`)
    const fieldInput = document.getElementById(`${e.target.name}_input`);
    if(month.value > 12 || month.value < 0 || month.value.length > 2){
        errorMessageBox.innerText = 'Must be a valid month.';
        errorMessageBox.classList.add('error');
        label.classList.add('error')
        fieldInput.classList.add('error-outline');
        noError = false;
    }
    else{
        errorMessageBox.classList.remove('error');
        label.classList.remove('error');
        fieldInput.classList.remove('error-outline');
        noError = true;
    }
})
day.addEventListener('input',(e)=>{
    const errorMessageBox = document.querySelector(`.validation.${e.target.name}`)
    const label = document.querySelector(`label[for=${e.target.name}]`)
    const fieldInput = document.getElementById(`${e.target.name}_input`);
    
    if(day.value>31 || day.value < 0 || day.value.length > 2){
        errorMessageBox.innerText = 'Must be a valid Day.';
        errorMessageBox.classList.add('error');
        label.classList.add('error')
        fieldInput.classList.add('error-outline');
        noError = false;
    }
    else{
        errorMessageBox.classList.remove('error');
        label.classList.remove('error');
        fieldInput.classList.remove('error-outline');
        noError = true;
    }
})
submitButton.addEventListener('click',(event)=>{
    userInput.forEach((d)=>{
        if(d.value === ''){
            showEmptyFieldError(d)
            noError = false;
        }
    })

    if(noError){
        const newDateStr = `${year.value}-${month.value}-${day.value}`;
        const newDate = new Date(newDateStr)
        removeWholeError()
        const totalDaysInMonth = new Date(year.value,month.value,0).getDate()
        if(newDate.getTime()>currentDate.getTime()){
            errorWholeForm()
        }
        if(day.value > totalDaysInMonth){
            errorWholeForm()
        }
        else{
            
            console.log(newDateStr)
            const yearsDiff= Number(currentYear - year.value);
            const monthsDiff = Number(currentMonth - month.value);
            const daysDiff = Math.abs(Number(currentDay - day.value));
            console.log(daysDiff)
            let totalMonthDiff = (yearsDiff*12) + monthsDiff;
            
            let yearsOld = Math.floor(totalMonthDiff/12);
            let monthsOld = totalMonthDiff % 12;
            let daysOld
            if(currentDay < day.value){
                if(monthsOld != 0){
                    monthsOld--;
                }
                if(monthsOld === 0){
                    totalMonthDiff--;
                    monthsOld = totalMonthDiff % 12;
                    yearsOld = Math.floor(totalMonthDiff/12);
                    daysOld = (30-Number(day.value)) + Number(currentDay);
                }
                else{
                    daysOld=30-daysDiff;
                }
                
            }
            else{
                daysOld = daysDiff;
            }
            console.log(yearsOld)
            console.log(monthsOld)
            console.log(daysOld)
            ageYears.innerText = yearsOld;
            ageMonths.innerText = monthsOld;
            ageDays.innerText = daysOld;

            

        }

    }

})














