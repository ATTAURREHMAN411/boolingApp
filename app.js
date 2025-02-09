import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

let fullname = document.querySelector("#fullname")
let email = document.querySelector("#email").value
let password = document.querySelector("#password").value
let userProfilePicUrl = ""

let myWidget = cloudinary.createUploadWidget({
    cloudName: 'dcwrsxkvn',
    uploadPreset: 'ml_default'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        userProfilePicUrl = result.info.secure_url
    }
}
)

document.getElementById("upload_widget").addEventListener("click", function (event) {
    event.stopPropagation()
    myWidget.open();
}, false);



let btn = document.querySelector(".submitebtn");

btn.addEventListener("click", (event)=>{
    event.preventDefault()
let email = document.querySelector("#email").value
let password = document.querySelector("#password").value

   createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
  
    const user = userCredential.user;
      alert("Create Account...")

      try {
        const docRef = await addDoc(collection(db, "users"), {
         FullName : fullname.value,
         Email : email,
         Password : password,
         image : userProfilePicUrl,
         uid: auth.currentUser.uid

        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
     console.log(user);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    
  }); 
})








