<template>
    <v-container align="center">
        <h1 id="jobRequest">Job Requests</h1>
        <br /><br />
        <v-table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Customer</th>
                    <th>Services</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                <tr v-for="(row, index) in tableRows" :key="row.customerName">
                    <td>{{ index + 1 }}</td>
                    <td>{{ row.customerName }}</td>
                    <td>{{ row.service }}</td>
                    <td>{{ row.details }}</td>
                    <td>{{ row.status }}</td>
                    <td>
                        <v-btn
                            v-if="row.status == 'Pending'"
                            class="mr-1"
                            color="green"
                            @click="action(this.useremail, 'Accepted')"
                            >Accept</v-btn
                        >
                        <v-btn
                            v-if="row.status != 'Declined'"
                            color="red"
                            @click="action(this.useremail, 'Declined')"
                            >Decline</v-btn
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
        deleteDoc,
        setDoc,
        getDoc,
    } from "firebase/firestore";

    const db = getFirestore(firebaseApp);
    export default {
        data() {
            return {
                useremail: "",
                tableRows: [],
            };
        },
        methods: {
            display: async function (useremail) {
                //let allDocuments = await getDocs(collection(db, "Job Requests"));
                let allDocuments = await getDocs(
                    collection(db, String(useremail).concat("_JR"))
                );

                allDocuments.forEach((docs) => {
                    let row = [];
                    let documentData = docs.data();
                    let customerName = documentData.CustomerName;
                    let service = documentData.Service;
                    let details = documentData.Details;
                    let status = documentData.Status;
                    row.customerName = customerName;
                    row.service = service;
                    row.details = details;
                    row.status = status;
                    this.tableRows.push(row);
                });
            },
            action: async function (useremail, msg) {
                console.log(useremail);
                const db = getFirestore(firebaseApp);
                const docRef = doc(
                    db,
                    String(useremail).concat("_JR"),
                    String(useremail)
                );
                let JR_info = await getDoc(docRef);
                let jr = JR_info.data();
                jr.Status = msg;
                await setDoc(
                    doc(
                        db,
                        String(this.useremail).concat("_JR"),
                        String(this.useremail)
                    ),
                    {
                        CustomerName: jr.CustomerName,
                        Service: jr.Service,
                        Details: jr.Details,
                        Status: jr.Status,
                    }
                );
                this.tableRows = [];
                this.display(useremail);
            },
            async getUserData(docRef) {
                const docSnap = await getDoc(docRef);
                return docSnap;
            },
        },
        async mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.useremail = auth.currentUser.email;
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
