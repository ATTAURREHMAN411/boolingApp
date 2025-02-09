import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { collection, getDocs, query, where, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

let upload = document.querySelector(".image img")
let fullName = document.querySelector(".image h5")

let allTodo = []
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
let value = await getDataFromFirestore()
console.log(value);

 value.map(item =>{
    upload.src = item.image
    fullName.innerHTML = item.FullName
 })

    } else {
        window.location = "index.html"
    }
});

// get data from database

async function getDataFromFirestore() {
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allTodo.push({
            ...doc.data(),
            docid: doc.id
        })
    });
    
     return allTodo
     
}















