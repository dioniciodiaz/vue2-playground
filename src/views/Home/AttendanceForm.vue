<template>
  <ValidationObserver v-slot="{ invalid }" class="validation-observer">
    <form @submit.prevent="onSubmit">
      <ValidationProvider
        name="Name"
        rules="required"
        v-slot="{ errors, valid }"
      >
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            v-on:keyup.enter="() => valid && onSubmit()"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider name="time" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="time">Time</label>
          <input
            v-model="date"
            type="text"
            class="form-control"
            id="time"
            disabled
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <button type="submit" :disabled="invalid" class="btn btn-primary">
        Submit
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    date: dayjs().format("h:mm:ss A")
  }),
  methods: {
    onSubmit() {
      const atendanceObject = {
        id: uuidv4(),
        name: this.name,
        breaks: [],
        lunch: { in: "", out: "" },
        presence: { in: dayjs().format("DD-M-YYYY h:mm:ss A"), out: "" },
        active: true
      };

      this.$emit("submit", atendanceObject);
    }
  }
};
</script>

<style scoped>
span.validation-observer {
  display: block;
  border-color: #17a2b8;
  border-width: thick;
  border-style: outset;
  padding: 57px;
}
</style>
