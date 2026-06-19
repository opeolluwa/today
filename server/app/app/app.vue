<script setup lang="ts">
import BaseInput from "../../../uilib/components/forms/BaseInput.vue";
const inputValue = ref("");
</script>

<template>
  <div>
    <BaseInput
      v-model="inputValue"
      placeholder="Enter text"
      label="Title"
      name="bookmark title"
    />
    <h1>Welcome to the App</h1>
    <p>This is the main application component.</p>
  </div>
</template>
