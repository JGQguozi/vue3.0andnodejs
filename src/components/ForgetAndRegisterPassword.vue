<template>
  <div class="page-password">
    <div class="page-password--layer">
      <div
        class="page-password--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div
          class="page-password--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- form -->
          <div class="page-password--form">
            <a-form
              ref="formPasswordRef"
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

              <a-form-item
                v-if="modelType === 'forget'"
                label="旧密码"
                name="oldPassword"
              >
                <a-input-password
                  v-model:value="formState.oldPassword"
                  placeholder="请确认旧密码"
                >
                  <template #prefix>
                    <subnode-outlined type="subnode" />
                  </template>
                </a-input-password>
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

              <a-form-item label="确认密码" name="configPassword">
                <a-input-password
                  v-model:value="formState.configPassword"
                  placeholder="请确认密码"
                >
                  <template #prefix>
                    <subnode-outlined type="subnode" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 23, offset: 0 }">
                <a-button block type="primary" @click="onSubmit">{{
                  titleName
                }}</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
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
import { register, updatePassword, verifyPassword } from "@/api/index.js";
interface FormState {
  name: string;
  password: string;
  configPassword: string;
  oldPassword: string;
}
export default defineComponent({
  name: "passwordAndregister",
  components: {
    UserOutlined,
    InfoCircleOutlined,
    SubnodeOutlined
  },
  props: {
    modelType: String
  },
  setup(props, ctx) {
    const formPasswordRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: "guozi",
      password: "Aa123456",
      configPassword: "Aa123456",
      oldPassword: "Aa123456"
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
                if (value !== formState.configPassword) {
                  return Promise.reject(`两次新密码不一致`);
                }
                if (value === formState.oldPassword) {
                  return Promise.reject(`新旧密码不能相同`);
                }
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
      ],
      configPassword: [
        {
          validator: (rule: RuleObject, value: string) => {
            if (value === "") {
              return Promise.reject("密码必填");
            } else {
              if (value !== formState.password) {
                return Promise.reject(`两次新密码不一致`);
              }
              return Promise.resolve();
            }
          },
          trigger: "blur"
        }
      ],
      oldPassword: [
        {
          validator: (rule: RuleObject, value: string, callback: any) => {
            if (value === "") {
              return Promise.reject("旧密码必填");
            } else {
              const formdatas = toRaw(formState);
              if (formdatas.name && formdatas.name != "") {
                funGather
                  .verifyPasswordFun({
                    name: formdatas.name,
                    password: formdatas.oldPassword
                  })
                  .then((result: any) => {
                    if (!result) callback("旧密码有误,请重新确认");
                    return callback();
                  });
              } else {
                return Promise.resolve();
              }
            }
          },
          trigger: "blur"
        }
      ]
    };

    const titleName = computed({
      get: () => {
        let text;
        switch (props.modelType) {
          case "forget":
            text = "重置密码";
            break;
          case "register":
            text = "注册";
            break;
        }
        return text;
      },
      set: () => {
        console.log("设置按钮");
      }
    });

    const funGather = {
      // 提交不同场景表单
      onSubmit: () => {
        formPasswordRef.value
          .validate()
          .then(() => {
            const formdatas = toRaw(formState);
            if (props.modelType === "forget") {
              // 忘记密码
              funGather.forgetPasswordFun(formdatas);
            } else {
              // 注册
              funGather.registerFun(formdatas);
            }
          })
          .catch((error: ValidateErrorEntity<FormState>) => {
            console.log("error", error);
          });
      },
      // 忘记密码
      forgetPasswordFun: async (datas: any) => {
        let result: any = await updatePassword(datas);
        if (result) {
          message.success("更新成功,自动前往登录");
          ctx.emit("handle", {
            eventName: "updateEvent",
            datas: { ...result }
          });
        }
      },
      // 注册用户
      registerFun: async (datas: any) => {
        let result: any = await register(datas);
        if (result) {
          message.success("注册成功,请前往登录");
          ctx.emit("handle", {
            eventName: "registerEvent",
            datas: { ...result }
          });
        }
        // if(result.)
      },
      // 验证用户密码正确性（修改密码时）
      verifyPasswordFun: async (datas: any) => {
        let result = await verifyPassword({ ...datas });
        return Promise.resolve(result);
      }
    };
    return {
      formPasswordRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      formState,
      rules,
      ...funGather,
      titleName
    };
  }
});
</script>
<style lang="scss"></style>
