<template>
    <div class="display" v-if="user">
      <h1 id="name"></h1>
      <h1 style= "text-align: left; margin-left: 10vw;">Company Description</h1>
      <div class="companyDesc" id="comID"></div>
      <h1 style= "text-align: left; margin-left: 10vw;">Expertise</h1>
      <div class="expertise" id="expertise"></div>
      <h1 style= "text-align: left; margin-left: 10vw;">Past Projects</h1><br>
      <div class="pastProjects">
          <div class="scroll_container">
            <div class="pp">
              <img src="/assets/room1.jpg">
              <div class="overlay">Project 1</div>
            </div>
                  <div class="pp">
              <img src="/assets/room2.jpg">
              <div class="overlay">Project 2</div>
            </div>
                <div class="pp">
              <img src="/assets/room3.jpg">
              <div class="overlay">Project 3</div>
            </div>
                <div class="pp">
              <img src="/assets/room4.jpg">
              <div class="overlay">Project 4</div>
            </div>
          </div>
      </div><br>
      <h1 style= "text-align: left; margin-left: 10vw;">Contact Details</h1>
        <div class="contactDetails">
          <div id="email">Email Address: </div>
        </div>
  </div>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import {getFirestore} from "firebase/firestore";
  import {getDoc, doc} from "firebase/firestore";
  import {getAuth, onAuthStateChanged} from "firebase/auth"
  
  export default {
      data(){
        return{
          user: false,
          useremail: ''
        }
      },
      mounted(){
        const auth = getAuth();
        const user = auth.currentUser
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.useremail = user.email;
                console.log(this.useremail);
                this.display(this.useremail);
            }
        })
      },
      methods:{
        async display(useremail) {
          const db = getFirestore(firebaseApp);
          const docRef = doc(db,"ID_Credentials",useremail)
          let credentials = await getDoc(docRef);
          let cred = credentials.data();
          let name_div = document.getElementById('name');
          name_div.innerHTML = cred.IDname;
          let comp_desc_div = document.getElementById('comID');
          comp_desc_div.innerHTML = cred.Comp_desc;
          let expertise_div = document.getElementById('expertise');
          expertise_div.innerHTML = cred.Expertise;
          let email_div = document.getElementById('email');
          email_div.innerHTML = "Email Address: " + cred.Email;
        }
      }
  }
  </script>
  <style>
  body {
    background-color: #a8e7e3;
  }
  .expertise, .pastProjects, .contactDetails, .companyDesc {
    height: 30vh;
    width: 80vw;
    background-color: rgb(207, 231, 234);
    text-align: left;
    margin-left: 10vw;
  }
  
  .pp {
    width: 30vw;
    height: 30vh;
    margin: 10px;
    cursor: pointer;
    background-color: rgb(251, 251, 251);
    display:inline-block;
  }
  
  .pastProjects {
    height:100%;
    max-width: 100vw;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    background-color: rgb(168, 198, 224);
  }
  
  img{
    width:100%;
    height:100%;
  }
  
  .overlay {
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
    width: 91.5%;
    transition: .5s ease;
    opacity:0;
    color: white;
    font-size: 20px;
    padding: 20px;
    text-align: center;
  }
  
  .pp:hover .overlay {
    opacity: 1;
  }
  </style>