<template>
  <div class="loader__wrapper">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss">
.loader {
  position: relative;
  width: 35px;
  height: 35px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -23px;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    animation: rotateLoader 1s infinite cubic-bezier(0.77, 0, 0.175, 1);
  }
  &::before {
    background: var(--primary);
  }
  &::after {
    background: var(--secondary);
    animation-delay: 500ms;
  }
}

@keyframes rotateLoader {
  0%,
  100% {
    translate: 40px 0;
  }
  25% {
    scale: 0.2;
  }
  50% {
    translate: 0;
  }
  75% {
    scale: 1;
  }
}

.loader__wrapper {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
