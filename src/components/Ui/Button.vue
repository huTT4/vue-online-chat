<template>
  <button type="submit" class="btn">
    <slot>Отправить</slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: transparent;
  transition: 0.2s;
  font-size: 1rem;
  color: var(--textColor);
}

.btn:hover {
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}
</style>
