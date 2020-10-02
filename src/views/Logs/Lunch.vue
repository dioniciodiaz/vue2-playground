<template>
  <div class="Lunch">
    <span>
      {{ lunchFormated }}
    </span>

    <button
      v-show="shouldTakeLunch"
      @click="takeLunch()"
      type="button"
      class="btn btn-success btn-sm"
      :disabled="disabled"
    >
      Lunch
    </button>
    <button
      v-show="shouldBackFromLunch"
      @click="backFromLunch()"
      type="button"
      class="btn btn-info btn-sm"
      :disabled="disabled"
    >
      Back
    </button>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Lunch",
  props: {
    lunch: {
      type: Object,
      default: () => {
        return { in: "", out: "" };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    takeLunch() {
      const goToLunch = { in: dayjs().format("DD-M-YYYY h:mm:ss A"), out: "" };
      this.$emit("update-lunch", goToLunch);
    },
    backFromLunch() {
      const finishLunch = {
        ...this.lunch,
        out: dayjs().format("DD-M-YYYY h:mm:ss A")
      };
      this.$emit("update-lunch", finishLunch);
    }
  },
  computed: {
    shouldTakeLunch() {
      return this.lunch.in === "";
    },
    shouldBackFromLunch() {
      return this.lunch.in !== "" && this.lunch.out === "";
    },
    lunchFormated() {
      let result = "";
      if (this.lunch.in !== "") {
        result = `${dayjs(this.lunch.in).format("h:mm A")} - Now`;
      }

      if (this.lunch.out !== "") {
        result = result.replace(
          "Now",
          `${dayjs(this.lunch.in).format("h:mm A")}`
        );
      }
      return result;
    }
  }
};
</script>
