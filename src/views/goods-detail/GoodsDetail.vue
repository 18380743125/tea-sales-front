<script setup lang="ts">
import GoodsItemV2 from '@/components/goods-list-v2/GoodsItemV2.vue'
import { getGoodsByIdReq } from '@/service/modules/goods'
import { ref, onMounted, computed, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { evaluateUrl, userAvatarUrl } from '@/utils/image.util'
import PublishComment from './PublishComment.vue'
import { processComment } from '@/utils/comment.util'
import { formatUTC } from '../../utils/format'

const details = ref()
const evaluating = ref(null) // 正在操作的评价
const route = useRoute()

const loadData = async () => {
  const id = route.params.id as any as number
  const result = await getGoodsByIdReq(id)
  if (result.message === 'ok') {
    details.value = result.data
  }
}

onMounted(async () => {
  loadData()
})

const evaluates = computed(() => {
  return (
    details.value?.orders
      .map((item: any) => {
        if (item.evaluate) return item.evaluate
      })
      ?.filter(Boolean) || []
  )
})

const getChats = (item: any) => {
  return processComment(toRaw(item.chats))
}

const showPublish = ref(false)

const publishClick = (item: any) => {
  evaluating.value = item
  showPublish.value = true
}
</script>

<template>
  <div :class="['details']" v-if="details">
    <!-- 返回图标 -->
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>

    <!-- 发评论 -->
    <PublishComment
      :loadData="loadData"
      v-if="!!evaluates.length"
      :evaluate="evaluating"
      v-model:show="showPublish"
    />

    <!-- 商品信息 -->
    <GoodsItemV2 :item="details" />
    <h5 class="title">共 {{ evaluates.length }} 条评价</h5>

    <div class="list" v-if="evaluates.length">
      <div class="item">
        <template v-for="item in evaluates" :key="item.id">
          <!-- 头像、用户名 -->
          <van-row class="user">
            <van-col span="4" offset="1">
              <van-image :src="userAvatarUrl(item.user.avatar)" class="img" radius="6" />
            </van-col>
            <van-col class="text">
              <div>{{ item.user.name }}</div>
              <div>{{ item.user.phone }}</div>
            </van-col>
            <div style="margin-top: 26px; margin-left: 40px">
              <van-rate allow-half :model-value="item.star" />
            </div>
          </van-row>

          <div class="imgs">
            <template v-for="img in item.imgs" :key="img.id">
              <img :src="evaluateUrl(img)" alt="" />
            </template>
          </div>
          <div class="content">{{ item.content }}</div>

          <div style="text-align: center">
            <van-icon
              @click="publishClick(item)"
              style="background-color: #f5f5f5; padding: 0 4px; border-radius: 6px"
              size="24"
              name="ellipsis"
            />
          </div>

          <!-- 评论信息 -->
          <div class="chats">
            <div class="title">评论内容</div>
            <div class="list">
              <template v-for="c of getChats(item)" :key="c.id">
                <div class="item">
                  <div class="name">(用户) {{ c.name }}</div>
                  <div class="content">{{ c.content }}</div>
                  <div class="time">{{ formatUTC(c.createAt) }}</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.details {
  position: relative;
  overflow: auto;
  margin-bottom: 100px;

  .user {
    margin-left: -20px;
    padding-bottom: 20px;
    .img {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;
      font-size: 28px;
      color: #888;
      margin-top: -20px;
    }
  }
}

.title {
  padding: 15px 10px;
  background-color: #fff;
}

.list .item {
  background-color: #fff;
  padding-bottom: 20px;
  .content {
    padding: 10px 0 0 10px;
    font-size: 36px;
  }
}

.imgs {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.imgs img {
  width: 180px;
  padding: 10px 0 0 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.back {
  position: fixed;
  top: 28px;
  left: 28px;
  color: #fff;
  font-size: 36px;
  z-index: 9;
}

.chats {
  border-top: 2px solid #f5f5f5;
  .list {
    padding-left: 12px;

    .item {
      position: relative;
      padding: 10px 0;
      padding-bottom: 40px;
      border-bottom: 1px solid #f5f5f5;
      .name {
        color: #666;
        font-size: 29px;
      }

      .time {
        font-size: 26px;
        position: absolute;
        right: 20px;
        bottom: 0px;
        color: #999;
      }
    }
  }
}
</style>
