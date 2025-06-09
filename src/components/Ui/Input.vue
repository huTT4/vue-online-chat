<script setup lang="ts">
interface Props {
  modelValue: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :value="modelValue"
    @input="handleInput"
    type="text"
    class="input"
    placeholder="Введите сообщение..."
  />
</template>

<style scoped>
.input {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  transition: 0.1s;
  background-color: var(--backgroundInput);
  color: var(--textColor);
  transition: var(--smooth);
}

.input:focus {
  outline: solid 1px var(--border);
  transition: 0s;
}
</style>
