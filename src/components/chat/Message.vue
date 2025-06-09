<script setup lang="ts"></script>

<template>
  <div class="message">
    <span class="name">
      <slot name="name" />
    </span>
    <p class="message__text">
      <slot name="message" />
    </p>
    <span class="time">
      <slot name="time" />
    </span>
  </div>
</template>

<style scoped>
.message {
  background-color: var(--messageBg);
  border-radius: var(--radius);
  padding: 0.8rem;
  padding-top: 1.3rem;
  width: max-content;
  max-width: 100%;
  line-height: 140%;
  color: var(--textColor);
  transition: var(--smooth);
  display: flex;
  gap: 0.8rem;
  position: relative;
}

.message__text {
  min-width: 0;
  overflow-wrap: break-word;
}

.name {
  font-size: 0.7rem;
  opacity: 0.8;
  line-height: 100%;
  position: absolute;
  top: 0.5rem;
}

.time {
  font-size: 0.6rem;
  opacity: 0.6;
  line-height: 100%;
  display: flex;
  align-items: end;
}
</style>
