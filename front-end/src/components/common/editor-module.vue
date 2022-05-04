<template>
  <section class="editor-module-wrap">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"></Toolbar>
    <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated"></Editor>
  </section>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import MD5 from 'js-md5';

export default {
  name: 'editor-module',
  components: { Editor, Toolbar },
  props: {
    contentData: {
      type: Object,
      default() {
        return {};
      }
    },
    token: String,
    setContent: {
      type: Function,
      default() {
        return 'Default function';
      }
    }
  },
  setup(props, context) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    function uploadImageApiUrl() {
      let nonce = String(Math.random()).substring(2); // 随机数
      let ts = new Date().getTime(); // 时间戳
      let s = MD5(`/api/upload/image~${nonce}${ts}`); // 签名

      return `/api/upload/image?nonce=${nonce}&ts=${ts}&s=${s}`;
    }

    // 内容 HTML
    const valueHtml = ref(props.contentData.content);

    // 模拟 ajax 异步获取内容
    onMounted(() => {
    });

    const toolbarConfig = {
      toolbarKeys: ["uploadImage", "clearStyle"]
    };
    const editorConfig = {
      placeholder: '请输入内容...', MENU_CONF: {
        uploadImage: {
          headers: {
            Authorization: props.token, // 给请求头中添加 Authorization 请求头
            ['X-Void-Risk']: 1 // 开发、测试环境
          },
          server: uploadImageApiUrl(),
          fieldName: 'news-info'
        }
      }
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    watch(valueHtml, (CValue) => {
      context.emit('setContent', CValue);
    })

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
