<script setup lang="ts">
import { ref, watch } from 'vue'
import { showToast } from 'vant'
import { publishCommentReq } from '@/service/modules/evaluate'

const props = defineProps<{
  show: boolean
  evaluate: Record<string, any> | null
  loadData: Function
}>()
const emit = defineEmits(['update:show'])

const content = ref('')
const show = ref(false)

watch(
  () => props.show,
  (value) => (show.value = value)
)

// 发表评论
const publish = async () => {
  if (content.value.trim() === '') {
    showToast('请输入评论内容')
    return
  }
  const result = await publishCommentReq({ evaluateId: props.evaluate?.id, content: content.value })
  if (result.message === 'ok') {
    showToast('发表成功')
    setTimeout(() => {
      props?.loadData()
      content.value = ''
      emit('update:show', false)
    }, 1000)
  }
}
</script>
<template>
  <van-popup
    @close="$emit('update:show', false)"
    v-model:show="show"
    class="publish"
    style="padding: 15px 0 40px; width: 98%"
  >
    <div class="title">发表评论</div>

    <div class="content">
      <van-field
        v-model="content"
        rows="3"
        autosize
        label="评论内容："
        label-width="70"
        type="textarea"
        clearable
        placeholder="请输入评论内容"
        show-word-limit
        maxlength="150"
      />
    </div>

    <van-button
      @click="publish"
      style="height: 32px; position: absolute; right: 10px"
      type="primary"
      >发表</van-button
    >
  </van-popup>
</template>

<style lang="less" scoped>
.title {
  padding-left: 30px;
  color: #00df71;
}
</style>
