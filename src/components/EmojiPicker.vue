<template>
  <div class="emoji-picker-wrapper" ref="wrapperRef">
    <a-button class="emoji-trigger-btn" :class="{ active: showPicker }" @click.stop="togglePicker">
      <template #icon>
        <icon-face-smile-fill />
      </template>
    </a-button>

    <Teleport to="body">
      <Transition name="emoji-picker">
        <div
          v-if="showPicker"
          class="emoji-picker-popup"
          ref="pickerRef"
          :style="popupStyle"
          @click.stop
        >
          <EmojiPicker
            :native="true"
            :hide-search="false"
            :hide-group-icons="false"
            :hide-group-names="false"
            :disable-skin-tones="false"
            :display-recent="true"
            :theme="theme"
            :static-texts="{ placeholder: '搜索表情...', skinTone: '肤色' }"
            :group-names="groupNames"
            @select="onEmojiSelect"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { useThemeStore } from '@/stores/theme'

const emit = defineEmits(['select'])

const themeStore = useThemeStore()
const showPicker = ref(false)
const pickerRef = ref(null)
const wrapperRef = ref(null)
const popupPosition = ref({ top: 0, left: 0 })

const theme = computed(() => (themeStore.isDark ? 'dark' : 'light'))

const popupStyle = computed(() => ({
  position: 'fixed',
  top: `${popupPosition.value.top}px`,
  left: `${popupPosition.value.left}px`,
}))

const groupNames = {
  smileys_people: '笑脸 & 人物',
  animals_nature: '动物 & 自然',
  food_drink: '食物 & 饮料',
  activities: '活动',
  travel_places: '旅行 & 地点',
  objects: '物品',
  symbols: '符号',
  flags: '旗帜',
}

const POPUP_WIDTH = 352
const POPUP_HEIGHT = 420
const GAP = 8

const updatePosition = () => {
  if (!wrapperRef.value) return
  const rect = wrapperRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let left = rect.right + GAP
  let top = rect.top

  if (left + POPUP_WIDTH > viewportWidth - GAP) {
    left = rect.left - POPUP_WIDTH - GAP
  }

  if (left < GAP) {
    left = GAP
  }

  if (top + POPUP_HEIGHT > viewportHeight - GAP) {
    top = viewportHeight - POPUP_HEIGHT - GAP
  }

  if (top < GAP) {
    top = GAP
  }

  popupPosition.value = { top, left }
}

const togglePicker = () => {
  showPicker.value = !showPicker.value
  if (showPicker.value) {
    updatePosition()
  }
}

const onEmojiSelect = (emoji) => {
  emit('select', emoji.i)
  showPicker.value = false
}

const handleClickOutside = (event) => {
  if (!showPicker.value) return
  const wrapper = wrapperRef.value
  const picker = pickerRef.value
  if (wrapper && !wrapper.contains(event.target)) {
    if (picker && !picker.contains(event.target)) {
      showPicker.value = false
    }
  }
}

const handleScroll = () => {
  if (showPicker.value) {
    updatePosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style lang="scss" scoped>
.emoji-picker-wrapper {
  position: relative;
  display: inline-flex;
}

.emoji-trigger-btn {
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: var(--color-text-2);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: rgb(var(--primary-6));
    background: var(--color-fill-2);
  }

  &.active {
    color: rgb(var(--primary-6));
    background: var(--color-fill-2);
  }
}

.emoji-picker-popup {
  z-index: 9999;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);

  :deep(.emoji-picker) {
    --ep-color-bg: var(--color-bg-1);
    --ep-color-border: var(--color-border-2);
    --ep-color-text: var(--color-text-1);
    --ep-color-text-secondary: var(--color-text-3);
    --ep-color-active: rgb(var(--primary-6));
    --ep-color-hover: var(--color-fill-2);
    border: 1px solid var(--color-border-2);
    border-radius: 8px;
    font-family: inherit;
  }

  :deep(.emoji-picker input) {
    background: var(--color-fill-1);
    border-color: var(--color-border-2);
    color: var(--color-text-1);

    &:focus {
      border-color: rgb(var(--primary-6));
    }
  }

  :deep(.emoji-picker-header) {
    background: var(--color-fill-1);
    border-bottom-color: var(--color-border-2);
  }

  :deep(.emoji-picker-body) {
    background: var(--color-bg-1);
  }

  :deep(.emoji-picker-category) {
    border-bottom-color: var(--color-border-1);
  }

  :deep(.emoji-picker-category-name) {
    background: var(--color-fill-1);
    color: var(--color-text-2);
  }

  :deep(.emoji-picker-footer) {
    background: var(--color-fill-1);
    border-top-color: var(--color-border-2);
  }
}

.emoji-picker-enter-active,
.emoji-picker-leave-active {
  transition: all 0.2s ease;
}

.emoji-picker-enter-from,
.emoji-picker-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
