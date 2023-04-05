<template>
<div>
    <div class="search-container">
        <div class="search__container">
            <input class="search__input" type="text" placeholder="Search" v-model = "search">
        </div>
        <div class="filter-container">
            <button class="filter-btn" @click="toggleFilterDropdown">Filter <i class="fa fa-caret-down"></i></button>
            <div class="filter-dropdown" v-show="showFilterDropdown">
                <!-- dropdown content here -->
            </div>
        </div>
        <div class="sort-container">
            <button class="sort-btn" @click="toggleSortDropdown">Sort <i class="fa fa-caret-down"></i></button>
            <div class="sort-dropdown" v-show="showSortDropdown">
                <!-- dropdown content here -->
            </div>
        </div>
    </div>
    <div class = "company">
        <div v-for="profile in filteredProfiles">
            <CompanyProfile :profile="profile"></CompanyProfile>
        </div>
    </div>
</div>
</template>

<script>
import CompanyProfile from '../components/CompanyProfile.vue';
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
                
export default {
    name: "ProfileCards",
    components: {CompanyProfile},
    computed : {
        filteredProfiles() {
            return this.profiles.filter((profile) => {
                return (
                    profile.companyName
                           .toLowerCase()
                           .indexOf(this.search.toLowerCase()) != -1
                        );
                    });
                }
    },
    
    data() {
        return {
            search: '',
            showFilterDropdown: false,
            showSortDropdown: false,
            profiles : []
        }
    },

    methods: {
        async fetchProfiles() {
            let profilesSnapShot = await getDocs(collection(db, "profiles"));
            let profiles = [];
            profilesSnapShot.forEach((profile) => {
                    let profileData = profile.data();
                    profileData.id = profile.id;
                    profiles.push(profileData);
      });
      console.log(profiles);
      this.profiles = profiles;
    },
        toggleFilterDropdown() {
            this.showFilterDropdown = !this.showFilterDropdown;
        },
        toggleSortDropdown() {
            this.showSortDropdown = !this.showSortDropdown;
        }
    },
    mounted() {
    this.fetchProfiles();
    },
}
</script>

<style>
/* Base styling */
.search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 6vw;
    width: 80vw;
    align-self: center;
    padding-bottom: 4vh;
}
.search__container {
    flex: 1;
    border-color: #4ca49d;
    } 
.search__input {
        width: 80%;
        padding: 12px 24px;
        background-color: transparent;
        border-color: #4ca49d;
        transition: transform 250ms ease-in-out;
        font-size: 14px;
        line-height: 18px;
        
        
        background-color: transparent;
/*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */
 
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 95% center;
        border-radius: 50px;
        border: 2px solid #4ca49d;
        transition: all 250ms ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;
}
        
.search__input:placeholder {
    color: color(#7addcb a(0.8));
    border-color: #4ca49d ;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}
        
.search__input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 2px solid #4ca49d;
    border-radius: 0;
    background-position: 100% center;
    }

.filter-container {
  padding: 1.5vh 2vw;;
  flex: 0 0 auto;
  border-radius: 50px;
  background: #4ca49d;
}

.sort-container {
  padding: 1.5vh 2vw;
  flex: 0 0 auto;
  margin-left: 4vw;
  border-radius: 50px;
  background: #4ca49d;
}

.filter-btn, .sort-btn {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    margin-left: 1vw;
    margin-right: 1vw;
    font-size: 14px;
    line-height: 18px;
  }
  
.filter-dropdown, .sort-dropdown {
    position: relative;
    top: 40px;
    right: 0;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    padding: 8px;
    border-radius: 4px;
  }
  
  .filter-dropdown a, .sort-dropdown a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .filter-dropdown a:hover, .sort-dropdown a:hover {
    background-color: #ddd;
  }
  .company{
    display: flex;
    flex-wrap: wrap;
    padding-left: 3vw;
    padding-right: 2vw;
  }
  </style>