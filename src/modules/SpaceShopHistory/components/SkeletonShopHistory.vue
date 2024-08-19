<template>
  <div class="skeleton-wrapper">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-skeleton style="width: 100%" animated>
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 240px; border-radius: 10px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </template>
        </el-skeleton>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-skeleton style="width: 100%">
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </template>
        </el-skeleton>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-skeleton style="width: 100%">
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </template>
        </el-skeleton>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <el-skeleton style="width: 100%">
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 240px"
            />
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 100%" />
            </div>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.skeleton-wrapper {
  margin-top: 30px;
}
</style>
