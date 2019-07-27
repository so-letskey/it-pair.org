<template>
  <div>
    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input v-model.trim.lazy="$v.name.$model" class="form__input" />
    </div>
    <div v-if="!$v.name.required" class="error">Field is required</div>
    <div v-if="!$v.name.minLength" class="error">
      Name must have at least {{ $v.name.$params.minLength.min }} letters.
    </div>
    <!-- <tree-view
      :data="$v.name"
      :options="{ rootObjectKey: '$v.name', maxDepth: 2 }"
    ></tree-view> -->
    <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
      <label class="form__label">Age</label>
      <input v-model.trim.lazy="$v.age.$model" class="form__input" />
    </div>
    <div v-if="!$v.age.required" class="error">Field is required</div>
    <div v-if="!$v.age.between" class="error">
      Must be between {{ $v.age.$params.between.min }} and
      {{ $v.age.$params.between.max }}
    </div>
    <span tabindex="0">Blur to see changes</span>
    <div class="invalid-feedback">
      Please provide a valid state.
    </div>
    <!-- <tree-view
      :data="$v.age"
      :options="{ rootObjectKey: '$v.age', maxDepth: 2 }"
    ></tree-view> -->
  </div>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      age: 0
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      required,
      between: between(20, 30)
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
