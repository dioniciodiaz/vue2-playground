<template>
  <div class="home">
    <div class="attendance-wrapper">
      <AttendanceForm @submit="onAttendanceSubmit" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AttendanceForm from "@/components/AttendanceForm.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    AttendanceForm
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
