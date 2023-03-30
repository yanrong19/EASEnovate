<template>
    <div class="createUpdate" v-if="user">
      <h1>CREATE/UPDATE YOUR PORTFOLIO</h1>
      <div class="photo">
          <input type="file" ref="file" style="display: none" @change="previewImage" accept="image/*"/>
          <button id = "profilePicBtn" v-on:click="uploadPhoto"><img src="/assets/photo.png"/></button>
      </div>
      <form id="credForm">
        <div class="infoForm">
          <label for="id_name">Name</label>
          <input id="id_name" type="text" placeholder="Enter Name" required="true"><br><br>
          <label for="email">Email</label>
          <input id="email" type="text" placeholder="Enter Email" required="true"><br><br>
          <label for="compy_desc">Company Description</label>
          <input id="comp_desc" type="text" placeholder="Enter Company Description" required="false"><br><br>
          <label for="expertise">Expertise</label>
          <input id="expertise" type="text" placeholder="Enter your Expertise" required="false"><br><br>
          <label for="website">Website</label>
          <input id="website" type="text" placeholder="Enter Website URL" required="false"><br><br>
        </div>
        <div class="save">
          <button id="uploadbutton" type="button" v-on:click="uploadChange">Upload</button>
        </div>
      </form>
    </div>
</template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import {getFirestore} from "firebase/firestore";
  import {doc,setDoc} from "firebase/firestore";
  import {getAuth, onAuthStateChanged} from "firebase/auth"
  const db = getFirestore(firebaseApp);
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
                console.log(this.useremail)
            }
        })
      },
      methods: {
        uploadPhoto(){
          let photo = this.$refs.file;
          photo.click();
          console.log(photo)
        },
        async uploadChange(){
          let id_name = document.getElementById("id_name").value;
          let email = document.getElementById("email").value;
          let comp_desc = document.getElementById("comp_desc").value;
          let expertise = document.getElementById("expertise").value;
          let website = document.getElementById("website").value;
          
          const docRef = await setDoc(doc(db,"ID_Credentials", this.useremail),{
            IDname:id_name, Email:email, Comp_desc:comp_desc, Expertise:expertise, Website:website
          });
          document.getElementById("credForm").reset();
          this.$router.push("/displayid");
        },
      }
}
</script>
<style scoped>
.infoForm, .btn{
  width: 55vw;
  height: auto;
  text-align: left;
  display: inline-block;
}

.createUpdate{
    text-align:center;
    display:block;
}

.photo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2% 2% 2% 2%;
}

img{
  cursor: pointer;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  display: inline-block;
  text-align: center;
}

#uploadbutton:hover {
  background-color: #41f8c1;
}

#profilePicBtn {
  transition-duration: 0.4s;
  width: 70px;
  border-width: 0;
  background-color: #a8e7e3;
}

#profilePicBtn:hover {
  background-color: #a5a5a5;
  color: white;
}
/* Full-width input fields */
input[type="text"] {
  width: 100%;
  padding: 15px;
  display: inline-block;
  background: #f1f1f1;
  border-color: #4caf50;
  border: 2px solid #ccc;
  border-color: #106241;
}
</style>