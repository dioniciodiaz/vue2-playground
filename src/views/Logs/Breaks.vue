<template>
  <div class="break">
    <dl v-if="breaks.length > 0">
      <li v-for="rest in breaksFormated" :key="rest" class="">
        {{ rest }}
      </li>
    </dl>
    <button
      v-show="canAddMoreBreaks && !shouldCloseBreak"
      @click="addBreak()"
      type="button"
      class="btn btn-success btn-sm"
      :disabled="disabled"
    >
      Break
    </button>
    <button
      v-show="shouldCloseBreak"
      @click="closeBreak()"
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
  name: "Break",
  props: {
    breaks: {
      type: Array,
      default: () => {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addBreak() {
      const newBreak = { in: dayjs().format("DD-M-YYYY h:mm:ss A"), out: "" };
      const breaks = [...this.breaks, newBreak];
      this.$emit("update-breaks", breaks);
    },
    closeBreak() {
      let copyOfBreaks = [...this.breaks];
      const currentIndex = copyOfBreaks.length - 1;
      let oldBreak = copyOfBreaks[currentIndex];
      const completedBreak = {
        ...oldBreak,
        out: dayjs().format("DD-M-YYYY h:mm:ss A")
      };
      copyOfBreaks[currentIndex] = completedBreak;
      this.$emit("update-breaks", copyOfBreaks);
    }
  },
  computed: {
    canAddMoreBreaks() {
      return this.breaks.length < 2;
    },
    shouldCloseBreak() {
      let result = false;
      const copyOfBreaks = [...this.breaks];

      if (copyOfBreaks.length) {
        const currentIndex = copyOfBreaks.length - 1;
        const lastBreak = copyOfBreaks[currentIndex];
        result = lastBreak.out === "";
      }
      return result;
    },
    breaksFormated() {
      return [...this.breaks].map(item => dayjs(item.in).format("h:mm:ss A"));
    }
  }
};
</script>
