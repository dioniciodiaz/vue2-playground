<template>
  <tr>
    <th scope="row">{{ attendance.name }}</th>
    <th>{{ attendance.presence.in }}</th>
    <th>
      <Breaks
        id="attendance.id"
        :breaks="attendance.breaks"
        @onBreakChanges="breaks => updateBreaks(breaks, attendance)"
        :disabled="!canTakeLunch"
      />
    </th>
    <th></th>
    <th>
      <button
        @click="signingOff(attendance)"
        type="button"
        class="btn btn-secondary btn-sm"
      >
        Signing Off
      </button>
    </th>
  </tr>
</template>

<script>
import dayjs from "dayjs";

export default {
  components: {
    Breaks: () => import(/* webpackChunkName: "Breaks" */ "@v/Logs/Breaks.vue")
  },
  props: {
    attendance: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        name: "",
        breaks: [
          { in: "", out: "" },
          { in: "", out: "" }
        ],
        lunch: { in: "", out: "" },
        presence: { in: "", out: "" },
        active: true
      })
    }
  },
  methods: {
    saveAttendance(attendance) {
      this.$emit("update-atendance", attendance);
    },
    signingOff(attendance) {
      const out = dayjs().format("DD-M-YYYY h:mm:ss A");
      let attendanceCopy = {
        ...attendance,
        active: false
      };
      attendanceCopy.presence.out = out;
      this.saveAttendance(attendanceCopy);
    },
    updateBreaks(breaks = [], attendance = {}) {
      const attendanceCopy = {
        ...attendance,
        breaks
      };

      this.saveAttendance(attendanceCopy);
    },
    updateLunch(breaks = [], attendance = {}) {
      const attendanceCopy = {
        ...attendance,
        breaks
      };

      this.saveAttendance(attendanceCopy);
    }
  },
  computed: {
    canSigningOff() {
      return true;
    },
    canTakeABreak() {
      return true;
    },
    canTakeLunch() {
      return true;
    }
  }
};
</script>

<style></style>
