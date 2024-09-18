let email =document.getElementById("emailLabel");
let password = document.getElementById("passwordLabel");

let loginButton=document.querySelector("#loginButton")

let getEmail=localStorage.getItem("emailLabel")

let getPassword=localStorage.getItem("passwordLabel")

loginButton.addEventListener("click",function(e){
e.preventDefault();

if(email.value===""||password.value===""){
    alert("Please, fill the remainig data")
}else if(getEmail===email.value.trim() && getPassword===password.value.trim()){
        const rememberMeCheckbox = document.getElementById("rememberMe");
       if(rememberMeCheckbox){
        localStorage.setItem("Remember me",true)
       }
        setTimeout(()=>{
            window.location="index.html"
        },500)}
        else{
        alert("Error: A user could not be found with this email address.")
    }

})
