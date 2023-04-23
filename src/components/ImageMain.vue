<template>
  <el-main class="image-main">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col v-for="(item, index) in 20" :key="index" :span="6" :offset="0">
          <el-card shadow="hover">
            <div>
              <div class="imgage__cover h-[150px] relative" style="width: 100%">
                <img
                  class="h-[150px]"
                  src="http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62af03d1b2aeb.jpg"
                  alt=""
                />
                <span class="cover__title text-sm"
                  >public/admin1123131311231</span
                >
              </div>
              <div class="image__action flex item-center justify-center p-2">
                <el-button type="primary" text size="small">重命名</el-button>
                <el-button type="primary" text size="small">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">底部分页</div>
  </el-main>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.image-main {
  position: relative;
}
.image-main .top {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 50px;
  right: 0;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  @apply flex justify-center items-center;
}
.el-card__body {
  padding: 0;
}
.cover__title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  line-height: 28px;
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
