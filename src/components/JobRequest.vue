<template>
  <v-container align="center">
  <h1 id="jobRequest">Job Requests</h1><br><br>
  <v-table>
    <thead>
      <tr>
          <th>Index</th>
          <th>Job Request ID</th>
          <th>Customer</th>
          <th>Services</th>
          <th>Details</th>
          <th>Status</th>
          <th>Action</th>
      </tr>

      <tr v-for="(row, index) in tableRows" :key="row.customerName">
          <td>{{ index + 1 }}</td>
          <td>{{ row.jrid }}</td>
          <td>{{ row.customerName }}</td>
          <td>{{ row.service }}</td>
          <td>{{ row.details }}</td>
          <td>{{ row.status }}</td>
          <td>
              <v-btn v-if="row.status == 'Pending'" class="mr-1" color="green" @click="action(this.useremail, row.jrid, 'Accepted')">Accept</v-btn>
              <v-btn v-if="row.status == 'Pending'" color="red" @click="action(this.useremail, row.jrid, 'Declined')">Decline</v-btn>
              <v-btn v-if="row.status == 'Accepted'" color="secondary" @click="action(this.useremail, row.jrid,'Aborted')">Abort</v-btn>
          </td>
      </tr>
    </thead>
  </v-table>
  </v-container>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
data() {
  return {
    useremail: "",
    tableRows: []
  };
},
methods: {
  display: async function (useremail) {
      let allDocuments = await getDocs(collection(db, "Job Requests"));
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        if (documentData.DesignerEmail == useremail) {
          let row = []
          let jrid = documentData.ID
          let customerName = documentData.CustomerName;
          let service = documentData.Services;
          let details = documentData.Details;
          let status = documentData.Status;
          row.jrid = jrid;
          row.customerName = customerName;
          row.service = service;
          row.details = details;
          row.status = status;
          this.tableRows.push(row);
        }
      })
  },
  action: async function(useremail, jrid, msg) {
    const db = getFirestore(firebaseApp);
    await updateDoc(doc(db,"Job Requests", jrid.toString()),{
          Status:msg
        });
    this.tableRows = [];
    this.display(useremail);
  }
},
async mounted() {
  const auth = getAuth();
  const user = auth.currentUser
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.useremail = user.email;
    }
    this.display(this.useremail);
  });
}
}
</script>

<style scoped>

tr:nth-child(even) {
background-color: #e3edee;
}

th, td {
border: 1px solid #1f1d1d;
text-align: center;
padding: 8px;
}

th {
  background-color: rgb(114, 163, 247);
}
</style>