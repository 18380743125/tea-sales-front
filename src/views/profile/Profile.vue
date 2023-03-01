<script setup lang="ts"></script>

<template>
  <div class="profile">
    <div class="info">
      <!-- 头像、用户名 -->
      <van-row class="avatar">
        <van-col :span="4" :offset="1">
          <van-image round width="60" height="60" />
        </van-col>
        <van-col style="margin-top: 22px; margin-left: 6px; color: #fff">请先登录</van-col>
      </van-row>

      <!-- 金额相关 -->
      <van-row style="text-align: center; color: #fff; margin-top: 14px">
        <van-col :span="6" :offset="1">
          <div>
            <span style="font-size: 18px; margin-right: 2px"></span>
            <span style="font-size: 12px">元</span>
          </div>
          <div style="font-size: 13px; margin-top: 2px">资产</div>
        </van-col>
        <van-col :span="6" :offset="2" style="text-align: center">
          <div>
            <span style="font-size: 18px; margin-right: 2px">0.00</span>
            <span style="font-size: 12px">元</span>
          </div>
          <div style="font-size: 13px; margin-top: 2px">红包</div>
        </van-col>
        <van-col :span="6" :offset="2" style="text-align: center">
          <div>
            <span style="font-size: 18px; margin-right: 2px">0</span>
            <span style="font-size: 12px">张</span>
          </div>
          <div style="font-size: 13px; margin-top: 2px">优惠卷</div>
        </van-col>
      </van-row>
      <van-row
        style="
          height: 73px;
          background: linear-gradient(
            to bottom right,
            #ffe4c7,
            #fbd9b4,
            #fdd0a7,
            #ffcca1,
            #ffbd8a,
            #fdc18d
          );
          width: 96%;
          margin: 18px auto;
          border-radius: 10px;
          border-top: 2px solid #fff;
        "
      >
        <van-col :span="16" :offset="1">
          <div style="padding-top: 8px; position: relative">
            <van-icon :size="26" color="#652c0c" name="vip-card" />
            <span style="color: #652c0c; font-size: 14px; position: absolute; top: 12px; left: 30px"
              >省钱会员</span
            >
          </div>
          <div style="color: #855634; margin-top: 6px; font-size: 16px">
            , 每月最高可省<span style="color: #e5854f">90</span>元
          </div>
        </van-col>
        <van-col :span="7" style="margin-top: 20px">
          <van-button
            style="height: 30px; border-radius: 20px; font-size: 13px; overflow: hidden"
            color="linear-gradient(to right, #fe8b3a, #fd6d3b)"
            >立即开通</van-button
          >
        </van-col>
      </van-row>
    </div>
    <div>
      <!-- 我的订单 -->
      <div
        style="
          background-color: #fff;
          width: 96%;
          border-radius: 14px;
          height: 126px;
          margin: 0 auto;
          margin-top: 16px;
        "
      >
        <div style="padding: 16px">
          <van-row>
            <van-col :span="6">我的订单</van-col>
            <van-col
              :span="8"
              :offset="10"
              style="text-align: right; color: #a0a0a0; font-size: 13px"
              >查看全部<van-icon name="arrow" :size="13"
            /></van-col>
          </van-row>
          <van-grid :border="false" :column-num="5">
            <van-grid-item text="待发货">
              <template #icon>
                <van-icon name="send-gift-o" color="#00df71" :size="30" />
              </template>
            </van-grid-item>
            <van-grid-item text="待收货">
              <template #icon>
                <van-icon name="logistics" color="#00df71" :size="30" />
              </template>
            </van-grid-item>
            <van-grid-item text="已完成">
              <template #icon>
                <van-icon name="chat-o" color="#00df71" :size="30" />
              </template>
            </van-grid-item>
            <van-grid-item text="已取消">
              <template #icon>
                <van-icon name="pause-circle-o" color="#00df71" :size="30" />
              </template>
            </van-grid-item>
            <van-grid-item text="退货服务">
              <template #icon>
                <van-icon name="tosend" color="#00df71" :size="30" />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!-- 常用功能 -->
      <div
        style="
          background-color: #fff;
          border-radius: 14px;
          background-color: #fff;
          width: 96%;
          margin: -10px auto;
        "
      >
        <h4 style="margin-left: 14px; padding-top: 20px">常用功能</h4>
        <van-cell-group>
          <van-cell is-link title="充值" />
          <van-cell title="个人信息" is-link />
          <van-cell title="个人名片" is-link />
          <van-cell title="二维码" is-link />
        </van-cell-group>
      </div>
      <div class="logout">
        <van-button round block type="primary">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.profile {
  position: relative;
  background-color: #f7f7f7;
  height: 100%;

  .hide-scroll;

  .info {
    background: linear-gradient(to bottom right, #8adf71, #7adf71, #5adf71, #4adf71, #3adf71);

    .avatar {
      padding-top: 40px;
    }
  }

  .logout {
    height: 50px;
    border-radius: 14px;
    margin: 40px auto 60px;
    width: 93%;
  }
}
</style>
