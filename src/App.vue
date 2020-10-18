<template>
  <div id="app">
    <b-container>
      <Chore v-for="chore in choresData" :key="chore.id" v-bind="chore"></Chore>
    </b-container>
  </div>
</template>

<script>
import Chore from "./components/Chore";
import firebase from "../src/firebaseConfig";
const db = firebase.firestore();

export default {
  data() {
    return {
      name: "",
      choresData: [],
      usersData: [],
    };
  },
  components: {
    Chore,
  },
  methods: {
    // tutorial: https://blog.logrocket.com/how-to-build-and-deploy-a-vue-js-crud-app-with-cloud-firestore-and-firebase/
    createChore(name) {
      if (name != "") {
        db.collection("chores")
          .add({ name: name })
          .then(() => {
            this.readChores();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        this.name = "";
      }
    },
    readChores() {
      this.choresData = [];
      db.collection("chores")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.choresData.push({
              id: doc.id,
              name: doc.data().name,
              last_done: doc.data().last_done,
              image: doc.data().image,
              repeat: doc.data().repeat,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    readUsers() {
      this.usersData = [];
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.usersData.push({
              id: doc.id,
              name: doc.data().name,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  mounted() {
    this.readChores();
    this.readUsers();
  },
};
</script>

<style></style>
