<template>
  <div class="home container">
    <div class="attendance-wrapper">
      <AttendanceForm @submit="onAttendanceSubmit" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { canCreateANewAttendance } from "@/utils";
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
      const canCreateAttendance = canCreateANewAttendance(
        this.activeAttendance,
        data.name
      );
      if (canCreateAttendance) {
        this.addAttendance(data);
        this.$router.push({ name: "Logs" });
      } else {
        alert("no puede hacer ponches nuevos sino se cierra la pasada");
      }
    },
    ...mapActions({
      addAttendance: "Attendance/addAttendance"
    })
  },
  computed: {
    ...mapGetters({
      activeAttendance: "Attendance/activeAttendance"
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
