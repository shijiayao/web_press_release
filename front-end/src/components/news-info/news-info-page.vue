<template>
  <section class="news-info-wrap">
    <ul class="news-list">
      <li class="news-item" v-for="item in newsList" :key="item.uk">
        <section class="item-box" @click="newsItemClick(item)">
          <section class="left-box">
            <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
            <p v-else class="no-thumbnail">
              <el-icon><calendar></calendar></el-icon>
            </p>
          </section>
          <section class="right-box">
            <h3 class="title">{{ item.title }}</h3>
            <p class="info">
              <span>{{ newsTypeLabel(item.type) }}</span>
              <span>{{ formatDate(item.edit_time) }}</span>
            </p>
          </section>
        </section>
      </li>
    </ul>

    <el-dialog v-model="detailDialogVisible" :destroy-on-close="true" custom-class="show-dialog">
      <template #title>
        <el-button type="primary" @click="detailDialogVisible = false">返回</el-button>
      </template>
      <section class="main-content">
        <section class="left-wrap">
          <section class="left-box"></section>
        </section>
        <section class="right-wrap">
          <h3 class="title">{{ newsDetailData.title }}</h3>
          <p class="info">
            <span>{{ newsTypeLabel(newsDetailData.type) }}</span>
            <span>{{ formatDate(newsDetailData.edit_time) }}</span>
          </p>
          <section class="detail-wrap">
            <article class="detail-content" v-html="newsDetailData.content"></article>
          </section>
        </section>
      </section>
      <section class="">
        666666666666666666666
      </section>
    </el-dialog>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus';
import { formatTargetDate } from '@/tools/tools.js';
import { newsInfoNewsTypeList, newsInfoNewsList } from '@/api/api.js';

export default {
  name: 'news-info',
  components: {},
  props: {},
  data() {
    return {
      newsList: [],
      newsTypeGroup: [],
      newsDetailData: {},
      detailDialogVisible: false
    };
  },
  watch: {},
  computed: {},
  beforeCreate() {
    /**
     * 在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。
     */
  },
  created() {
    /**
     * 在实例创建完成后被立即同步调用。
     * 在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。
     * 然而，挂载阶段还没开始，且 el property 目前尚不可用。
     */
    this.getNewsTypeList();
    this.getNewsList();
  },
  beforeMount() {
    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  mounted() {
    /**
     * 在实例挂载完成后被调用，这时候传递给 app.mount 的元素已经被新创建的 vm.el 替换了。
     * 如果根实例被挂载到了一个文档内的元素上，当 mounted 被调用时， vm.el 也会在文档内。
     * 注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 mounted 内部使用 vm.nextTick
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  beforeUpdate() {
    /**
     * 在数据发生改变后，DOM 被更新之前被调用。
     * 这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
     * 该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
     */
  },
  updated() {
    /**
     * 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或侦听器取而代之。
     * 注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 updated 内部使用 vm.nextTick
     */
  },
  beforeUnmount() {
    /**
     * 实例销毁之前调用。在这一步，实例仍然完全可用。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  unmounted() {
    /**
     * 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  methods: {
    // 获取新闻分类
    getNewsTypeList() {
      const _this = this;

      newsInfoNewsTypeList().then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.newsTypeGroup = data;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 获取新闻列表
    getNewsList() {
      const _this = this;

      newsInfoNewsList().then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.newsList = data;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 新闻 type
    newsTypeLabel(value) {
      let resultArray = this.newsTypeGroup.filter((element) => element.value === value) || [{}];

      return resultArray[0].label;
    },
    // 序列化新闻时间
    formatDate(date) {
      let targetTimeObject = formatTargetDate(date);
      return `${targetTimeObject.YY}-${targetTimeObject.MM}-${targetTimeObject.DD} ${targetTimeObject.HH}:${targetTimeObject.mm}:${targetTimeObject.ss}`;
    },
    // 新闻详情点击
    newsItemClick(item) {
      this.newsDetailData = item;
      this.detailDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.news-info-wrap {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;

  .news-list {
    width: 100%;

    .news-item {
      padding: 10px;

      .item-box {
        cursor: pointer;

        .left-box {
          float: left;
          width: 160px;
          height: 90px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
            transition: all 0.8s;

            &:hover {
              transform: scale(1.2);
            }
          }

          .no-thumbnail {
            width: 160px;
            height: 90px;
            line-height: 90px;
            text-align: center;
            background-color: #e8e8e8;

            .el-icon {
              font-size: 30px;
              color: #999;
              vertical-align: middle;
            }

            &:hover {
              background-color: #e1e1e1;

              .el-icon {
                color: #666;
              }
            }
          }
        }

        .right-box {
          padding-left: 15px;
          height: 90px;
          overflow: hidden;

          .title {
            height: 50px;
            color: #333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;

            &:hover {
              color: #409eff;
            }
          }

          .info {
            margin-top: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #999;

            span {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  :deep {
    .show-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 1200px;
      height: 98%;

      .el-dialog__header {
        padding: 20px 20px 0;
        height: 32px;
      }

      .el-dialog__body {
        padding: 0;
        height: calc(100% - 50px);
        overflow-y: auto;

        .main-content {
          padding: 40px 20px;

          .left-wrap {
            position: relative;
            float: left;
            width: 400px;
            height: 10px;

            .left-box {
              position: fixed;
              width: 400px;
              height: 500px;
              background-color: red;
            }
          }

          .right-wrap {
            padding-left: 20px;
            overflow: hidden;

            .title {
              font-size: 30px;
            }

            .info {
              margin: 10px 0;
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              color: #999;

              span {
                margin-right: 5px;
              }
            }

            .detail-wrap {
              height: 100%;
              overflow-y: auto;

              .detail-content {
                font-size: 0;

                p {
                  margin-bottom: 10px;
                  font-size: 16px;
                  line-height: 1.5;
                  text-indent: 2em;

                  &:last-of-type {
                    margin-bottom: 0;
                  }
                }
              }
            }
          }
        }
      }

      .el-dialog__headerbtn {
        top: 0;
        right: 0;
        width: 52px;
        height: 52px;
        font-size: 26px;
      }
    }
  }
}
</style>
