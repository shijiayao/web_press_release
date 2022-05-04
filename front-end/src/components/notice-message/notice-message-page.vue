<template>
  <section class="notice-message-wrap">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <bell-filled></bell-filled>
            </el-icon>
            <span>公告</span>
          </span>
        </template>
        <el-collapse accordion>
          <el-collapse-item v-for="item in noticeData" :key="item.id" :name="item.id">
            <template #title>
              <el-icon>
                <bell-filled></bell-filled>
              </el-icon>
              <h3 class="title">{{ item.title }}</h3>
            </template>
            <section class="content-wrap">
              <p class="content-info">发布时间：{{ formatDate(item.edit_time) }}</p>
              <article class="content" v-html="showDetailContent(item.content)"></article>
            </section>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <chat-line-round></chat-line-round>
            </el-icon>
            <span>消息</span>
          </span>
        </template>
        <section v-if="messageData.length > 0">
          <el-card v-for="(item, index) in messageData" :key="item.id" :shadow="item.shadow ? item.shadow : 'hover'" @click="cardClick(index)">
            <h3 class="title">
              <el-icon>
                <chat-line-round></chat-line-round>
              </el-icon><span>{{ item.reply_user_name }}回复了你的评论</span>
            </h3>
            <section class="content-height" :style="{ height: item.height + 'px' }">
              <section class="content-wrap" ref="box">
                <p class="content-info">{{ formatDate(item.edit_time) }}</p>
                <article class="content" v-html="showDetailContent(item.content)"></article>
              </section>
            </section>
          </el-card>
        </section>
        <p v-else>暂时没有消息</p>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';
import { formatTargetDate } from '@/tools/tools.js';
import { userNoticeMessage } from '@/api/api.js';

export default {
  name: 'notice-message',
  components: {},
  props: {},
  setup() {
    return {
      box: ref(0)
    };
  },
  data() {
    return {
      noticeData: [],
      messageData: []
    };
  },
  watch: {},
  computed: {
    ...mapGetters(['userInfo'])
  },
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
    this.getUserNoticeMessage();
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
    // 获取用户相关的公告和消息
    getUserNoticeMessage() {
      const _this = this;

      userNoticeMessage().then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.noticeData = data.notice;
          _this.messageData = data.message;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 序列化时间
    formatDate(date) {
      let targetTimeObject = formatTargetDate(date);
      return `${targetTimeObject.YY}-${targetTimeObject.MM}-${targetTimeObject.DD} ${targetTimeObject.HH}:${targetTimeObject.mm}:${targetTimeObject.ss}`;
    },
    // 公告内容格式化
    showDetailContent(content) {
      return content
        .split('\n')
        .map((element) => `<p>${element}</p>`)
        .join('');
    },
    // 点击
    cardClick(idx) {
      this.messageData.forEach((element, index) => {
        if (idx === index) {
          element.shadow = 'always';
          element.height = this.box[idx].offsetHeight;
        } else {
          element.shadow = 'hover';
          element.height = 0;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.notice-message-wrap {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;

  .el-tabs {
    :deep {
      .el-tabs__header {
        .el-tabs__item {
          font-size: 0;

          &.is-active {
            .custom-tabs-label {
              .el-icon {
                color: #e6a23c;
              }
            }
          }

          .custom-tabs-label {
            display: inline-block;
            height: 40px;
            font-size: 0;
            vertical-align: top;

            .el-icon {
              margin-right: 3px;
              font-size: 20px;
              vertical-align: middle;
            }

            span {
              display: inline-block;
              font-size: 16px;
              line-height: 40px;
              vertical-align: middle;
            }
          }
        }
      }

      .el-tabs__content {
        .el-collapse {
          .el-collapse-item__header {
            padding: 10px 0;
            height: auto;

            .el-icon {
              margin-right: 5px;
              font-size: 20px;
              color: #e6a23c;
            }

            .title {
              padding: 12px 0;
              line-height: 24px;
              font-size: 16px;
            }

            &.is-active,
            &:hover {
              color: #409eff;
            }
          }

          .content-wrap {
            padding: 0 20px;

            .content-info {
              margin-bottom: 5px;
              font-size: 14px;
              color: #777;
            }

            .content {
              font-size: 0;

              p {
                font-size: 16px;
                line-height: 2;
                text-indent: 2em;
              }
            }
          }
        }

        .el-card {
          margin-bottom: 10px;
          cursor: pointer;

          .title {
            position: relative;
            margin-bottom: 0;
            padding-left: 25px;
            line-height: 24px;
            font-size: 16px;
            transition: all 0.8s;

            .el-icon {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              margin-right: 5px;
              font-size: 20px;
              color: #e6a23c;
            }
          }

          .el-card__body {
            padding: 15px 20px;
          }

          .content-height {
            transition: all 0.8s;
          }

          .content-wrap {
            .content-info {
              margin-bottom: 5px;
              font-size: 14px;
              color: #777;
            }

            .content {
              will-change: height;
              font-size: 0;

              p {
                font-size: 16px;
                line-height: 2;
              }
            }
          }

          &.is-hover-shadow {
            .content-height {
              height: 0;
              overflow: hidden;
            }
          }

          &.is-always-shadow {
            .title {
              margin-bottom: 15px;
            }

            .content-height {
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>
