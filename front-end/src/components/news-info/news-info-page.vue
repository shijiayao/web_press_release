<template>
  <section class="news-info-wrap">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in headNewsTypeGroup" :key="item.value" :label="item.label" :name="item.value">
        <ul class="news-list" v-if="newsObject[activeName].length > 0">
          <li class="news-item" v-for="item in newsObject[activeName]" :key="item.uk">
            <section class="item-box" @click="newsItemClick(item)">
              <section class="left-box">
                <img v-if="item.thumbnail" :src="item.thumbnail" alt="" />
                <p v-else class="no-thumbnail">
                  <el-icon>
                    <calendar></calendar>
                  </el-icon>
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
        <p v-else>{{ item.label }}分类下暂时没有新闻</p>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="detailDialogVisible" :destroy-on-close="true" custom-class="show-dialog">
      <template #title>
        <el-button type="primary" @click="detailDialogVisible = false">返回</el-button>
      </template>
      <section class="main-content">
        <section class="left-wrap">
          <section class="left-box">
            <h2 class="title">友情链接</h2>
            <ul class="links-list">
              <li class="links-item" v-for="item in linksList" :key="item.id">
                <a :href="item.link" target="_blank">
                  <el-card shadow="hover">
                    <section class="image-box">
                      <img :src="item.image" alt="" />
                    </section>
                    <p class="name">{{ item.name }}</p>
                  </el-card>
                </a>
              </li>
            </ul>
          </section>
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
      <section class="remark-wrap">
        <section class="remark-box">
          <section class="remark-input" v-if="isLogin">
            <el-input v-model="remarkObject.remark" :rows="5" type="textarea" resize="none" placeholder="发表神妙评论"></el-input>
            <el-button type="primary" @click="remarkButton">发表评论</el-button>
          </section>
          <section class="no-login" v-else>
            <p>游客，你还有登录，登录之后即可参与精彩评论</p>
            <el-button type="primary" @click="$router.push('/login')">快去登录</el-button>
          </section>
          <ul class="remark-list">
            <li class="item" v-for="(item, index) in remarkList" :key="item.id">
              <section class="avatar-box">
                <img src="/static/image/other/202205031426578052518998.png" alt="" />
              </section>
              <section class="remark-detail">
                <p class="name-info">
                  <span class="name">{{ item.user_name }}</span>
                  <span class="middle-text" v-if="item.reply_user_name">回复了</span>
                  <span class="name" v-if="item.reply_user_name">{{ item.reply_user_name }}</span>
                </p>
                <p class="detail">{{ item.content }}</p>
                <p class="reply">
                  <span class="time">{{ formatDate(item.edit_time) }}</span>
                  <el-button v-if="!item.reply" type="text" class="reply-button" @click="replyButton(item, index)">
                    <el-icon>
                      <chat-line-square></chat-line-square>
                    </el-icon>
                    回复
                  </el-button>
                  <el-button v-else type="text" class="reply-button" @click="item.reply = false">取消回复</el-button>
                </p>
                <section class="reply-module" v-if="item.reply">
                  <section class="remark-input" v-if="isLogin">
                    <el-input v-model="remarkObject.reply" :rows="5" type="textarea" resize="none" :placeholder="'回复【' + item.user_name + '】'"></el-input>
                    <el-button type="primary" @click="remarkReplyButton">回复【{{ item.user_name }}】</el-button>
                  </section>
                  <section class="no-login" v-else>
                    <p>游客，你还有登录，登录之后即可参与精彩评论</p>
                    <el-button type="primary" @click="$router.push('/login')">快去登录</el-button>
                  </section>
                </section>
              </section>
            </li>
          </ul>
        </section>
      </section>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';
import { formatTargetDate } from '@/tools/tools.js';
import { friendLinksList, newsTypeList, newsList, remarkList, addRemark } from '@/api/api.js';

export default {
  name: 'news-info',
  components: {},
  props: {},
  data() {
    return {
      activeName: 0,
      linksList: [],
      newsTypeGroup: [],
      newsList: [],
      remarkList: [],
      newsDetailData: {},
      remarkObject: {
        news_id: 0,
        reply_user_id: 0,
        remark: '',
        reply: ''
      },
      detailDialogVisible: false
    };
  },
  watch: {},
  computed: {
    ...mapGetters(['isLogin', 'userInfo']),
    headNewsTypeGroup() {
      return [].concat([{ label: '全部', value: 0 }], this.newsTypeGroup);
    },
    newsObject() {
      let resultObject = {
        0: this.newsList
      };

      this.newsTypeGroup.forEach((element) => {
        resultObject[element.value] = [];
      });

      this.newsList.forEach((element) => {
        resultObject[element.type].push(element);
      });

      return resultObject;
    }
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
    this.getLinksList();
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
    // 获取友情链接列表
    getLinksList() {
      const _this = this;

      friendLinksList().then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.linksList = data;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 获取新闻分类
    getNewsTypeList() {
      const _this = this;

      newsTypeList().then((response) => {
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

      newsList().then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.newsList = data;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 获取新闻的评论数据
    getRemarkList() {
      const _this = this;

      remarkList({ news_id: _this.newsDetailData.id }).then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.remarkList = data;

          _this.remarkList.forEach((element) => {
            element.reply = false;
          });

          _this.remarkList.sort((a, b) => {
            return new Date(b.edit_time).getTime() - new Date(a.edit_time).getTime();
          });
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
    // 序列化时间
    formatDate(date) {
      let targetTimeObject = formatTargetDate(date);
      return `${targetTimeObject.YY}-${targetTimeObject.MM}-${targetTimeObject.DD} ${targetTimeObject.HH}:${targetTimeObject.mm}:${targetTimeObject.ss}`;
    },
    // 新闻详情点击
    newsItemClick(item) {
      this.newsDetailData = item;
      this.remarkObject.news_id = item.id;
      this.getRemarkList();
      this.detailDialogVisible = true;
    },
    // 新闻详情页 评论新闻
    remarkButton() {
      const _this = this;

      if (!_this.remarkObject.remark) {
        ElMessage.error('评论内容不能为空');
      }

      addRemark({
        news_id: _this.remarkObject.news_id,
        content: _this.remarkObject.remark
      }).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          _this.remarkObject.remark = '';
          _this.getRemarkList();
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 新闻详情页 回复别人按钮
    replyButton(item, idx) {
      const _this = this;

      this.remarkObject.reply_user_id = item.user_id;

      _this.remarkList.forEach((element, index) => {
        if (idx === index) {
          element.reply = true;
        } else {
          element.reply = false;
        }
      });
    },
    // 回复别人评论
    remarkReplyButton() {
      const _this = this;

      if (!_this.remarkObject.reply) {
        ElMessage.error('回复的内容不能为空');
      }

      addRemark({
        news_id: _this.remarkObject.news_id,
        reply_user_id: _this.remarkObject.reply_user_id,
        content: _this.remarkObject.reply
      }).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          _this.remarkObject.reply = '';
          _this.getRemarkList();
        } else {
          ElMessage.error(message);
        }
      });
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
      padding: 10px 0;

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

              .title {
                margin-bottom: 10px;
                color: #222;
                text-align: center;
              }

              .links-list {
                .links-item {
                  margin-bottom: 5px;

                  a {
                    display: block;
                    width: 100%;
                  }

                  .el-card__body {
                    padding: 5px 20px;
                    overflow: hidden;

                    .image-box {
                      float: left;
                      width: 258px;
                      height: 40px;

                      img {
                        display: block;
                        margin: 0 auto;
                        height: 100%;
                      }
                    }

                    p {
                      float: right;
                      width: 100px;
                      line-height: 40px;
                      font-size: 16px;
                      color: #777;
                      text-align: center;
                    }
                  }
                }
              }
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
                margin-right: 10px;
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

                  img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                  }
                }
              }
            }
          }
        }

        .remark-wrap {
          width: 100%;

          .remark-box {
            padding: 20px 20px 20px 440px;

            .remark-input {
              text-align: right;

              .el-textarea {
                margin-bottom: 10px;
              }
            }

            .no-login {
              text-align: center;
              padding: 20px 0;
              border: 1px solid #eee;
              border-radius: 5px;

              p {
                margin-bottom: 10px;
                font-size: 16px;
                color: #555;
              }
            }

            .remark-list {
              margin-top: 20px;

              .item {
                margin-bottom: 20px;

                .avatar-box {
                  float: left;
                  width: 60px;
                  height: 60px;

                  img {
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                }

                .remark-detail {
                  padding-left: 10px;
                  min-height: 80px;
                  overflow: hidden;

                  .name-info {
                    margin-bottom: 10px;
                    font-size: 14px;

                    .name {
                      color: #222;
                      font-weight: bold;
                    }

                    .middle-text {
                      margin: 0 5px;
                      color: #999;
                    }
                  }

                  .reply {
                    margin-top: 10px;
                    height: 20px;
                    line-height: 20px;

                    .time {
                      line-height: 20px;
                      color: #9195a3;
                    }

                    .reply-button {
                      float: right;
                      padding: 0;
                      height: 20px;
                      line-height: 20px;

                      .el-icon {
                        margin-right: 3px;
                      }
                    }
                  }

                  .remark-input {
                    margin-top: 10px;
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
