<template>
  <b-col cols="12" sm="6">
    <b-card
      :title="name"
      :img-src="image"
      class="mb-2"
      header=" "
      :header-bg-variant="timeStatus"
    >
      <b-card-text>
        <b-row>
          <b-col> Zuletzt: {{ last_done_date }} </b-col>
          <b-col v-if="nextExecutionInDays >= 0">
            Nächstes Mal in: {{ nextExecutionInDays }} Tag/en
          </b-col>
          <b-col v-else> Verspätet um {{ nextExecutionInDays }} Tag/e </b-col>
        </b-row>
      </b-card-text>
      <b-button block variant="success" size="lg" v-on:click="updateChore"
        ><b-icon icon="check"></b-icon>Erledigt</b-button
      >
    </b-card>
  </b-col>
</template>

<script>
import firebase from "../../src/firebaseConfig";
const db = firebase.firestore();

export default {
  name: "Chore",
  props: ["id", "name", "repeat", "last_done", "image"],
  methods: {
    evaluateRepeatPropToDays() {
      if (!this.$props.repeat) return null;
      var repeat = this.$props.repeat;
      if (repeat === "weekly") return 7;
    },
    calculateDayDistance(date1, date2) {
      var oneDay = 1000 * 3600 * 24;
      var result = Math.floor((date1.getTime() - date2.getTime()) / oneDay);
      if (result >= 0) {
        return result;
      } else {
        return -1;
      }
    },
    updateChore() {
      db.collection("chores").doc(this.id).update({
        last_done: new Date(),
      });
    },
  },
  computed: {
    last_done_date: function () {
      if (!this.$props.last_done) return null;
      return this.$props.last_done.toDate().toDateString();
    },
    nextExecutionInDays: function () {
      if (!this.$props.last_done) return null;
      var next_due = this.$props.last_done.toDate();
      var distance = this.evaluateRepeatPropToDays();
      next_due.setDate(next_due.getDate() + distance);
      return this.calculateDayDistance(next_due, new Date());
    },
    timeStatus: function () {
      if (this.nextExecutionInDays <= 1) {
        return "danger";
      } else if (this.nextExecutionInDays <= 3) {
        return "warning";
      } else {
        return "success";
      }
    },
  },
};
</script>

<style></style>
