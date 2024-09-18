let firstName=document.querySelector("#firstName")
let lastName=document.querySelector("#lastName")
let emailLabel=document.querySelector("#emailLabel")
let passwordLabel=document.querySelector("#passwordLabel")
submitButton=document.querySelector("#submitButton")

   submitButton.addEventListener("click",function(e){
    e.preventDefault()

    if (localStorage.getItem("emailLabel") === emailLabel.value) {
        alert("This email is already registered. Please choose a different one.");

    }

    if(firstName.value==="" || lastName.value==="" || emailLabel.value==="" ||passwordLabel.value===""){

        alert("Please, fill the remainig data")
        
     }else{
        
        localStorage.setItem("firstName",firstName.value)
        localStorage.setItem("lastName",lastName.value)
        localStorage.setItem("emailLabel",emailLabel.value)
        localStorage.setItem("passwordLabel",passwordLabel.value)
        setTimeout(() => {

            window.location="login.html"
            
        }, 500);
    }
})


