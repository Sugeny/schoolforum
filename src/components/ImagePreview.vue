<template>
  <a-image-preview-group
    v-model:visible="visible"
    v-model:current="currentIndex"
    :srcList="imageList"
    infinite
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
const currentIndex = ref(props.initialIndex)

const imageList = ref([])

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
  },
)

watch(visible, (val) => {
  emit('update:modelValue', val)
})

watch(
  () => props.images,
  (newImages) => {
    imageList.value = Array.isArray(newImages) ? [...newImages] : []
  },
  { immediate: true, deep: true },
)

watch(
  () => props.initialIndex,
  (val) => {
    currentIndex.value = val
  },
)

const open = (index = 0) => {
  currentIndex.value = index
  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close,
})
</script>
