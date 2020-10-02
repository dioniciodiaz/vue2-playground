<template>
  <div class="home container">
    <div class="attendance-wrapper">
      <AttendanceForm @submit="onAttendanceSubmit" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    AttendanceForm: () =>
      import(
        /* webpackChunkName: "AttendanceForm" */ "@v/Home/AttendanceForm.vue"
      )
  },
  methods: {
    onAttendanceSubmit(data) {
      this.addAttendance(data);
      this.$router.push({ name: "Logs" });
    },
    ...mapActions({
      addAttendance: "Attendance/addAttendance"
    })
  }
};
</script>

<style>
.attendance-wrapper {
  justify-content: center;
  display: flex;
}
</style>
