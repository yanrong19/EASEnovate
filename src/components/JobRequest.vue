<template>
    <v-container align="center">
        <h1 id="jobRequest">Job Requests</h1>
        <br /><br />
        <v-table>
            <thead>
                <tr>
                    <th width="1%">Index</th>
                    <th width="11%">Job Request ID</th>
                    <th width="10%" v-if="usertype == 'Interior Designer'">
                        Customer
                    </th>
                    <th width="10%" v-if="usertype == 'Customer'">Designer</th>
                    <th width="20%">Services</th>
                    <th width="30%">Details</th>
                    <th width="5%">Status</th>
                    <th width="25%">Action</th>
                </tr>

                <tr v-for="(row, index) in tableRows" :key="row.customerName">
                    <td>{{ index + 1 }}</td>
                    <td>{{ row.jrid }}</td>
                    <td v-if="usertype == 'Interior Designer'">
                        {{ row.customerName }}
                        <v-tooltip activator="parent" location="top"
                            ><h3>{{ row.customerEmail }}</h3></v-tooltip
                        >
                    </td>
                    <td v-if="usertype == 'Customer'">
                        {{ row.designerName }}
                        <v-tooltip activator="parent" location="top"
                            ><h3>{{ row.designerEmail }}</h3></v-tooltip
                        >
                    </td>
                    <td>
                        <v-chip
                            class="ma-1"
                            color="primary"
                            v-for="serv in row.services"
                            :key="serv"
                        >
                            {{ serv }}</v-chip
                        >
                    </td>
                    <td>{{ row.details }}</td>
                    <td>{{ row.status }}</td>

                    <td v-if="usertype == 'Customer'">
                        <v-btn
                            v-if="row.status == 'Accepted'"
                            class="mr-1"
                            color="green"
                            @click="
                                action(this.useremail, row.jrid, 'Completed')
                            "
                            >Finish</v-btn
                        >
                        <v-btn
                            v-if="row.status == 'Accepted'"
                            color="secondary"
                            @click="action(this.useremail, row.jrid, 'Aborted')"
                            >Abort</v-btn
                        >
                        <v-btn
                            v-if="row.status == 'Completed'"
                            color="orange"
                            @click="shareProfile(row.jrid)"
                            >Review</v-btn
                        >
                        <v-btn
                            v-if="row.status == 'Reviewed'"
                            color="secondary"
                            @click="shareProfile(row.jrid)"
                            >View Review</v-btn
                        >
                    </td>
                    <td v-if="usertype == 'Interior Designer'">
                        <v-btn
                            v-if="row.status == 'Pending'"
                            class="mr-1"
                            color="green"
                            @click="
                                action(this.useremail, row.jrid, 'Accepted')
                            "
                            >Accept</v-btn
                        >
                        <v-btn
                            v-if="row.status == 'Pending'"
                            color="red"
                            @click="
                                action(this.useremail, row.jrid, 'Declined')
                            "
                            >Decline</v-btn
                        >
                        <v-btn
                            v-if="row.status == 'Accepted'"
                            color="secondary"
                            @click="action(this.useremail, row.jrid, 'Aborted')"
                            >Abort</v-btn
                        >
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
    import {
        collection,
        getDocs,
        doc,
        updateDoc,
        getDoc,
    } from "firebase/firestore";

    const db = getFirestore(firebaseApp);
    export default {
        data() {
            return {
                useremail: "",
                usertype: "",
                uid: "",
                tableRows: [],
            };
        },
        methods: {
            display: async function (useremail) {
                const docRef = doc(db, "users", String(this.uid));
                let credentials = await getDoc(docRef);
                let cred = credentials.data();
                this.usertype = cred.usertype;
                console.log(this.usertype);
                let allDocuments = await getDocs(
                    collection(db, "Job Requests")
                );
                allDocuments.forEach((docs) => {
                    let documentData = docs.data();
                    if (
                        documentData.DesignerEmail == useremail ||
                        documentData.CustomerEmail == useremail
                    ) {
                        let row = [];
                        let jrid = documentData.ID;
                        let customerName = documentData.CustomerName;
                        let customerEmail = documentData.CustomerEmail;
                        let designerName = documentData.DesignerName;
                        let designerEmail = documentData.DesignerEmail;
                        let service = documentData.Services;
                        let details = documentData.Details;
                        let status = documentData.Status;
                        row.jrid = jrid;
                        row.customerName = customerName;
                        row.customerEmail = customerEmail;
                        row.designerName = designerName;
                        row.designerEmail = designerEmail;
                        row.services = service;
                        row.details = details;
                        row.status = status;
                        this.tableRows.push(row);
                    }
                });
            },
            action: async function (useremail, jrid, msg) {
                const db = getFirestore(firebaseApp);
                await updateDoc(doc(db, "Job Requests", jrid.toString()), {
                    Status: msg,
                });
                this.tableRows = [];
                this.display(useremail);
            },
            shareProfile(jrowID) {
                console.log(jrowID);
                this.$router.push({
                    name: "LeaveReview",
                    params: { requestID: jrowID },
                });
            },
        },
        async mounted() {
            const auth = getAuth();
            const user = auth.currentUser;
            console.log(user);
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user);
                    this.useremail = user.email;
                    this.uid = user.uid;
                    console.log(user);
                }
                this.display(this.useremail);
            });
        },
    };
</script>

<style scoped>
    tr:nth-child(even) {
        background-color: #e3edee;
    }

    th,
    td {
        border: 1px solid #1f1d1d;
        text-align: center;
        padding: 8px;
    }

    th {
        background-color: rgb(114, 163, 247);
    }
</style>
