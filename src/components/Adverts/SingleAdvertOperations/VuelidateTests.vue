<template>
  <div>
    <div
      v-for="(v, index) in $v.people.$each.$iter"
      :key="'field no: ' + index"
    >
      <div class="form-group" :class="{ 'form-group--error': v.$error }">
        <label class="form__label">Name for {{ index }}</label>
        <input v-model.trim="v.name.$model" class="form__input" />
      </div>
      <div v-if="!v.name.required" class="error">Name is required.</div>
      <div v-if="!v.name.minLength" class="error">
        Name must have at least {{ v.name.$params.minLength.min }} letters.
      </div>
    </div>
    <div>
      <button class="button" @click="people.push({ name: '' })">Add</button>
      <button class="button" @click="people.pop()">Remove</button>
    </div>
    <div
      class="form-group"
      :class="{ 'form-group--error': $v.people.$error }"
    ></div>
    <div v-if="!$v.people.minLength" class="error">
      List must have at least {{ $v.people.$params.minLength.min }} elements.
    </div>
    <div v-else-if="!$v.people.required" class="error">
      List must not be empty.
    </div>
    <div v-else-if="$v.people.$error" class="error">List is invalid.</div>
    <button class="button" @click="$v.people.$touch">$touch</button>
    <button class="button" @click="$v.people.$reset">$reset</button>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      people: [
        {
          name: "John"
        },
        {
          name: ""
        }
      ]
    };
  },
  validations: {
    people: {
      required,
      minLength: minLength(3),
      $each: {
        name: {
          required,
          minLength: minLength(2)
        }
      }
    }
  }
};
</script>

<style scoped>
.form-group--error {
  background: blue;
  color: red;
  font-size: 22px;
}

.error {
  color: red;
}
</style>
