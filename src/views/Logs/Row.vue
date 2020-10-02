<template>
  <tr>
    <th scope="row">{{ attendance.name }}</th>
    <th>{{ attendance.presence.in }}</th>
    <th>
      <Breaks
        :breaks="attendance.breaks"
        @update-breaks="breaks => updateBreaks(breaks, attendance)"
        :disabled="!canTakeABreak"
      />
    </th>
    <th>
      <Lunch
        :lunch="attendance.lunch"
        @update-lunch="lunch => updateLunch(lunch, attendance)"
        :disabled="!canTakeLunch"
      />
    </th>
    <th>
      <button
        @click="signingOff(attendance)"
        type="button"
        class="btn btn-info btn-sm"
        :disabled="!canSigningOff"
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
    Breaks: () => import(/* webpackChunkName: "Breaks" */ "@v/Logs/Breaks.vue"),
    Lunch: () => import(/* webpackChunkName: "Lunch" */ "@v/Logs/Lunch.vue")
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
    updateLunch(lunch = {}, attendance = {}) {
      const attendanceCopy = {
        ...attendance,
        lunch
      };

      this.saveAttendance(attendanceCopy);
    }
  },
  computed: {
    canSigningOff() {
      return this.canTakeABreak === this.canTakeLunch;
    },
    canTakeABreak() {
      return (
        this.attendance.lunch.in === "" || this.attendance.lunch.out !== ""
      );
    },
    canTakeLunch() {
      return !this.shouldCloseBreak;
    },
    shouldCloseBreak() {
      let result = false;
      const copyOfBreaks = [...this.attendance.breaks];
      if (copyOfBreaks.length) {
        const currentIndex = copyOfBreaks.length - 1;
        const lastBreak = copyOfBreaks[currentIndex];
        result = lastBreak.out === "";
      }
      return result;
    }
  }
};
</script>
