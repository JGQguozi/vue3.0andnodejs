<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >
      {{ time }}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            时间是一切财富中最宝贵的财富
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <!-- <img class="page-login--logo" src="@/assets/image/logo.png" /> -->
          <!-- title -->
          <div class="page-login--title">登录</div>
          <!-- form -->
          <div class="page-login--form">
            <a-form
              ref="formRef"
              :model="formState"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              label-align="left"
            >
              <a-form-item label="用户名" name="name">
                <a-input
                  v-model:value="formState.name"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <user-outlined type="user" />
                  </template>
                  <template #suffix>
                    <a-tooltip title="用户名只能输入字母">
                      <info-circle-outlined
                        style="color: rgba(0, 0, 0, 0.45)"
                      />
                    </a-tooltip>
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item label="密码" name="password">
                <a-input-password
                  v-model:value="formState.password"
                  placeholder="请输入密码"
                >
                  <template #prefix>
                    <subnode-outlined type="subnode" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 23, offset: 0 }">
                <a-button block type="primary" @click="onSubmit">登录</a-button>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 23, offset: 0 }">
                <a-button block @click="resetForm">清除</a-button>
              </a-form-item>
            </a-form>

            <p class="page-login--options" flex="main:justify cross:center">
              <a-button type="text" @click="showModal('forget')">
                忘记密码</a-button
              >
              <a-button type="text" @click="showModal('register')"
                >注册用户</a-button
              >
            </p>
            <!-- quick login -->
            <a-button
              class="page-login--quick"
              size="default"
              type="info"
              @click="getFun"
            >
              快速选择用户（测试功能）
            </a-button>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)"
            >
              {{ language.label }}
            </a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />
            2018 D2 Projects 开源组织出品
            <a href="https://github.com/FairyEver"> @FairyEver </a>
          </p>
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>

    <a-modal
      :title="modelType === 'forget' ? '忘记密码' : '注册'"
      v-model:visible="visible"
      :footer="null"
      :maskClosable="false"
    >
      <ForgetAndRegisterPassword :modelType="modelType" @handle="handleFun" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRaw,
  UnwrapRef,
  ref,
  computed
} from "vue";
import {
  RuleObject,
  ValidateErrorEntity
} from "ant-design-vue/es/form/interface";
import {
  UserOutlined,
  InfoCircleOutlined,
  SubnodeOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import { login, getCompanyDetail } from "@/api/index.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import $store from "@/store/index";
import ForgetAndRegisterPassword from "@/components/ForgetAndRegisterPassword.vue";
import localforage from "localforage";
import { asyncRoutesAlready } from "@/utils/asyncRouter.js";
import store from "@/store/index.js";
interface FormState {
  name: string;
  password: string;
}
interface CallDatasState {
  eventName?: string;
  datas?: any;
}
export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    InfoCircleOutlined,
    SubnodeOutlined,
    ForgetAndRegisterPassword
  },
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: "guozi",
      password: "Aa123456"
    });
    const rules = {
      name: [
        {
          validator: (rule: RuleObject, value: string) => {
            if (value === "") {
              return Promise.reject("用户名称必填");
            } else {
              return Promise.resolve();
            }
          },
          trigger: "blur"
        },
        { min: 3, max: 9, message: "长度3-9位", trigger: "blur" }
      ],
      password: [
        {
          validator: (rule: RuleObject, value: string) => {
            if (value === "") {
              return Promise.reject("密码必填");
            } else {
              const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
              if (value.indexOf(" ") > -1) {
                return Promise.reject(new Error(`密码不能包含空格`));
              }
              if (reg.test(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(
                  `密码必须包含有大小写字母和数字且至少8位`
                );
              }
            }
          },
          trigger: "blur"
        }
      ]
    };
    const router = useRouter();

    let name = computed(() => {
      // return $store.state;
      return "展示";
    });

    const modalText = ref<string>("Content of the modal");
    const visible = ref<boolean>(false);
    let modelType = ref<string>("");
    const store = useStore();
    const funGather = {
      showModal: (vals: any) => {
        modelType.value = vals;
        visible.value = true;
      },
      resetForm: () => {
        formRef.value.resetFields();
      },
      getFun: async () => {
        let res: any = await getCompanyDetail();
      },
      onSubmit: async () => {
        formRef.value
          .validate()
          .then(() => {
            funGather.loginFun(toRaw(formState));
          })
          .catch((error: ValidateErrorEntity<FormState>) => {
            console.log("error", error);
          });
      },
      loginFun: async (datas: any) => {
        let result: any = await login(datas);
        if (result) {
          const { token } = result;
          if (token) {
            // 用户token存至localforage
            // 用户数据存至store
            localforage.setItem("myuniquekey", token);
            store.commit("d2admin/user/setUserInfo", result);
            // 构造路由
            asyncRoutesAlready().then((routesData: any) => {
              message.success("登录成功");

              console.log("登录成功", store);
              // router.push("/");
            });

            // router.addRoute({
            //   path: "/",
            //   redirect: { name: "Finance" },
            //   component: layoutHeaderAside,
            //   children: [
            //     {
            //       path: "/finance/index",
            //       name: "Finance",
            //       meta: {
            //         auth: true,
            //         cache: true,
            //         title: "财务首页",
            //         roles: ["admin", "common"]
            //       },
            //       component: () => import("@/views/finance/index.vue")
            //     },
            //     {
            //       path: "/finance/other",
            //       name: "FinanceOther",
            //       meta: {
            //         auth: true,
            //         cache: true,
            //         title: "财务other",
            //         roles: ["common"]
            //       },
            //       component: () => import("@/views/finance/index.vue")
            //     },
            //     {
            //       path: "/finance/otherTwo",
            //       name: "FinanceOtherTwo",
            //       meta: {
            //         auth: true,
            //         cache: true,
            //         title: "财务otherTwo",
            //         roles: ["superadmin"]
            //       },
            //       component: () => import("@/views/finance/index.vue")
            //     }
            //   ]
            // });

            // router.push("/finance/index");
            // console.log("store===>", store);
          }
        }
      },
      handleFun: (callDatas: UnwrapRef<CallDatasState>) => {
        visible.value = false;
        const { datas, eventName } = callDatas;
        if (eventName === "registerEvent" || eventName === "updateEvent") {
          // 注册，忘记密码
          funGather.loginFun({
            name: datas.name,
            password: datas.password
          });
        }
      }
    };
    return {
      formRef,
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      formState,
      rules,
      modalText,
      visible,
      modelType,
      ...funGather
    };
  }
});
</script>
<style lang="scss" scoped>
@import "@/assets/style/public.scss";
// @import "@/assets/style/color.scss";
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100vh;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 159px;
    margin-bottom: 3em;
    margin-top: 3em;
  }
  .page-login--title {
    font-size: 1.9rem;
    font-weight: bolder;
    margin-top: 15vh;
  }
  // 登录表单
  .page-login--form {
    width: 27rem;
    display: table;
    margin: 5vh auto 17vh;
    padding: 4vh 11vh;
    border-radius: 16px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
