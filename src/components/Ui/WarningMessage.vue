<script setup lang="ts"></script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped>
div {
  border: 1px solid var(--border);
  border-radius: var(--radius);

  background-color: var(--backgroundChat);
  box-shadow: 0 0 1rem 0.05rem var(--shadowChat);
  color: var(--textColor);

  max-width: 400px;
  width: max-content;
  line-height: 150%;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto 1.5rem;
  padding: 1rem;
}
</style>
