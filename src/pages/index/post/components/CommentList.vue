<template>
  <div class="comment-list-wrapper">
    <a-spin :loading="loading" dot class="comment-spin">
      <div class="comment-list">
        <CommentItem
          v-for="(comment, index) in comments"
          :key="comment.id"
          :class="['animate-fade-in-up', `animate-delay-${Math.min(index + 1, 8)}`]"
          :comment="comment"
          :reply-target="replyTarget"
          :replying="replying"
          @like="(comment) => $emit('like', comment)"
          @reply="(comment) => $emit('reply', comment)"
          @delete="(comment) => $emit('delete', comment)"
          @like-reply="(data) => $emit('like-reply', data)"
          @reply-to-reply="(data) => $emit('reply-to-reply', data)"
          @delete-reply="(data) => $emit('delete-reply', data)"
          @like-sub-reply="(data) => $emit('like-sub-reply', data)"
          @reply-to-sub-reply="(data) => $emit('reply-to-sub-reply', data)"
          @delete-sub-reply="(data) => $emit('delete-sub-reply', data)"
          @submit-reply="(data) => $emit('submit-reply', data)"
          @submit-reply-to-reply="(data) => $emit('submit-reply-to-reply', data)"
          @submit-reply-to-sub-reply="(data) => $emit('submit-reply-to-sub-reply', data)"
          @cancel-reply="$emit('cancel-reply')"
        />
      </div>

      <a-empty v-if="!loading && comments.length === 0" description="暂无评论，快来抢沙发吧~" />
    </a-spin>

    <div v-if="hasMore" class="load-more">
      <a-button long @click="$emit('load-more')" :loading="loading"> 加载更多评论 </a-button>
    </div>
  </div>
</template>

<script setup>
import CommentItem from './CommentItem.vue'

const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
  replyTarget: {
    type: [String, Number, null],
    default: null,
  },
  replying: {
    type: Boolean,
    default: false,
  },
})

defineEmits([
  'like',
  'reply',
  'delete',
  'like-reply',
  'reply-to-reply',
  'delete-reply',
  'like-sub-reply',
  'reply-to-sub-reply',
  'delete-sub-reply',
  'submit-reply',
  'submit-reply-to-reply',
  'submit-reply-to-sub-reply',
  'cancel-reply',
  'load-more',
])
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
  width: 100%;
}

.comment-spin {
  display: block;
}

.comment-list {
  display: flex;
  flex-direction: column;
}

.load-more {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-2);
}
</style>

<style>
@use '../../../../styles/animations.scss';
</style>
