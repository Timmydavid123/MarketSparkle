const fullName = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password')
const rePassword = document.getElementById('Re-enter password');
const form = document.getElementById('s-form')

// function onSubmit() {
 
//     const fullName = document.getElementById('fullname');
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     const rePassword = document.getElementById('Re-enter password');

    


//     localStorage.setItem('fullName', fullName.value)
// console.log(localStorage.getItem('fullName'));

// }
//     if(password != rePassword) {
//         alert("Passwords do not match")
//         return;
//     }
//     console.log(fullName, email);

//   }

// form.addEventListener('submit', onSubmit())


 
fetch('https://localhost:5000/backend-cmrf.onrender.com/signup')
 .then((response)=> response.json())
 .then((signup)=>{
    console.log(signup);
 })

 console.log(data)


// function fetchDataFromBackend(){
//     fetch('http://localhost:5000/api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m/data')
//  .then((response)=> response.json())
//  .then((data)=>{
//         fullName.innerHTML = (data.hourly.temperature_2m[2]+ data.current_units.temperature_2m)

//     console.log(data);
//  })
// }
