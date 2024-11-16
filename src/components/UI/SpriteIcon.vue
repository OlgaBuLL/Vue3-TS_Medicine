<template>
  <svg class="vue-icon">
    <use :xlink:href="`${icon}#${props.name}`"></use>
  </svg>
</template>

<script setup lang="ts">
import icon from "@/assets/images/icons/sprite.svg";

const props = defineProps<{
  name?: string;
}>();
</script>

<style lang="sass">
.vue-icon
  max-width: 24px
  max-height: 24px
</style>
