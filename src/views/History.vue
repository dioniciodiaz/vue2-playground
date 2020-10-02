<template>
  <div class="History container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Event Type</th>
          <th scope="col">Hour</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in historyFormated" :key="attendance.in">
          <th scope="row">{{ attendance.name }}</th>
          <th>{{ attendance.date }}</th>
          <th>{{ attendance.type }}</th>
          <th>{{ attendance.hours }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { formatHistoryAttendances } from "@/utils";

export default {
  computed: {
    ...mapGetters({
      historyAttendance: "Attendance/historyAttendance"
    }),
    historyFormated() {
      return formatHistoryAttendances(this.historyAttendance);
    }
  }
};
</script>
