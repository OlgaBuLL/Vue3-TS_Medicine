<template>
  <header class="header">
    <RouterLink to="/" class="header__link"
      ><SpriteIcon name="logo" class="header__logo"
    /></RouterLink>

    <nav class="header__menu">
      <RouterLink to="/" class="header__link">Врачи</RouterLink>
      <RouterLink to="/nurses" class="header__link">Медсестры</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import SpriteIcon from "@/components/UI/SpriteIcon.vue";
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;

  &__logo {
    max-width: 40px;
    max-height: 40px;
  }

  &__menu {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__link {
    color: var(--color-text);

    &:hover {
      color: var(--secondary);
    }

    &.router-link-active {
      color: var(--primary);
    }

    &.router-link-exact-active {
      color: var(--primary);

      &:hover {
        color: var(--secondary);
      }
    }
  }
}
</style>
