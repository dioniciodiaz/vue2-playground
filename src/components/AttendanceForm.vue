<template>
  <ValidationObserver v-slot="{ invalid }" class="validation-observer">
    <form @submit.prevent="onSubmit">
      <ValidationProvider
        name="Name"
        rules="required|alpha"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider name="time" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="exampleInputPassword1">Date</label>
          <input
            v-model="date"
            type="date"
            class="form-control"
            id="exampleInputPassword1"
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    date: ""
  }),
  methods: {
    onSubmit() {
      const atendanceObject = {
        date: this.date,
        in: dayjs().format("h:mm:ss A"),
        out: "",
        id: 1,
        name: this.name,
        breaks: [
          { in: "", out: "" },
          { in: "", out: "" }
        ],
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
