<template>
  <div class="logs container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Sign In</th>
          <th scope="col">Break</th>
          <th scope="col">Lunch</th>
          <th scope="col">Signing Off</th>
        </tr>
      </thead>
      <tbody>
        <AttendanceRow
          v-for="attendance in activeAttendance"
          :key="attendance.id"
          :attendance="attendance"
          @update-atendance="saveAttendance"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AttendanceRow: () =>
      import(/* webpackChunkName: "AttendanceRow" */ "@v/Logs/Row.vue")
  },
  methods: {
    ...mapActions({
      updateAttendance: "Attendance/updateAttendance"
    }),
    saveAttendance(attendance) {
      this.updateAttendance(attendance);
    }
  },
  computed: {
    ...mapGetters({
      activeAttendance: "Attendance/activeAttendance"
    })
  }
};
</script>
