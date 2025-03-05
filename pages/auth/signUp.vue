<template>
   <div class="login" @keydown.enter="submitSignUp">
    <div class="login-left">
      <a class="logo" href="/">
        <img class="logo-img" src="@/assets/images/login/logo.png" alt="logo" />
      </a>
      <div class="auth-title">{{ title }} </div>
      <div class="auth-descs">
        <div class="auth-desc">- Create your free account</div>
        <div class="auth-desc">- Explore {{ title }}'s core features for individuals and organizations.</div>
      </div>
      <div class="cover"></div>
    </div>
    <div class="login-right">
      <div class="auth-content">
        
        <h1 class="login-title">Sign up to {{ title }} </h1>
        <div class="login-content">
          <div class="login-item">
            <div class="login-field">
              <img class="fl" src="@/assets/images/login/people_img.png" />
              <input v-model="form.email" class="login-input w-90" type="text" placeholder="请输入邮箱" />
            </div>
          </div>
          <div class="login-item">
            <div class="login-field">
              <img class="fl" src="@/assets/images/login/lock_img.png" />
              <input v-model="form.password" class="login-input w-80" :type="showPassword ? 'password' : 'text'"
                placeholder="请输入密码" autocomplete="new-password" />
              <div :class="[showPassword ? 'hidden-icon' : 'show-icon', 'pwd-field-flag']"
                @click="showPassword = !showPassword"></div>
            </div>
          </div>
          <div class="login-item">
            <div class="login-field">
              <div v-if="codeImg" v-html="codeImg" id="codeImg"  @click="loadCodeImg" ></div>
              <img v-else id="codeImg" src="@/assets/images/login/default_code.png" />
              <img class="fl" src="@/assets/images/login/code_img.png" />
              <input v-model="form.code" class="login-input w-90" type="text" placeholder="请输入右图计算结果" />
            </div>
          </div>
        </div>
        <button class="login-btn" :disabled="isDisabled" @click="submitSignUp">
          <div v-if="loginLoading">
            <div class="loader">
              <div class="justify-content-center jimu-primary-loading"></div>
            </div>
            注&nbsp;&nbsp;册&nbsp;&nbsp;中...
          </div>
          <span v-else>注&nbsp;&nbsp;册</span>
        </button>
        <div class="operation-items">
          <div class="inline-block" style="color: #9aa1ab">已有账号？</div>
          <a class="a-link" href="/auth/signIn">立即登录</a>
          <NuxtLink class="fr fetch-pwd" to="/auth/forgotPassword">忘记密码</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })
const { title } = useAppConfig();

const loginLoading = ref(false)
const showPassword = ref(true)
const codeImg = ref('')

const form = reactive({
  email: '877880098@qq.com',
  password: '123456',
  code: '',
  uuid:''
})

const isDisabled = computed(() => form.email && form.password && form.code && loginLoading.value)
async function submitSignUp() {
  loginLoading.value = true
  const { data } = await useFetch('/api/auth/signUp', {
    method: 'POST',
    body: form,
    watch:false
  }).finally(()=>{
    loginLoading.value = false
  })
  if(data.value.code === 0){
    alert(data.value.message)
    navigateTo('/auth/signIn')
  }else{
    alert(data.value.message)
    loadCodeImg()
  }
}

async function loadCodeImg() {
  $fetch('/api/captcha').then((result)=>{
    form.uuid = result.data.uuid
    codeImg.value = result.data.captcha
  })
}

onMounted(() => {
  loadCodeImg()
})

</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  min-width: 900px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/images/login/login-bg.png');
  --login-left-width: 450px;
}

.login-left {
  position: relative;
  display: inline-block;
  width: var(--login-left-width);
  height: 100%;
  background-color: #0e64f4;
  // padding-top: 80px;
  padding: 80px 30px 0px 30px;
  box-sizing: border-box;

  .logo {
    // margin-top: 60px;
    height: 80px;
    width: 80px;
    display: block;
    // text-align: center;
    margin: 0 auto;

    .logo-img {
      width: 100%;
      height: 100%;
    }
  }

  .auth-title {
    text-align: center;
    margin-top: 60px;
    padding: 30px 0px;
    color: #ffffff;
    font-size: 26px;
    font-weight: 500;
    font-family: 'Microsoft Yahei Semibold', Arial, sans-serif;
  }

  .auth-descs {
    .auth-desc {
      padding-bottom: 15px;
      color: #cbdfff;
      font-size: 15px;
      line-height: 1.31;
      font-family: 'Microsoft Yahei', Arial, sans-serif;
    }
  }

  .cover {
    width: 100%;
    height: 230px;
    margin-top: 70px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/assets/images/login/auth_left_img.png');
  }
}

.login-right {
  position: relative;
  width: calc(100% - var(--login-left-width));
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin: auto;

  .auth-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 35px 50px;
    box-sizing: border-box;
    height: 430px;
    width: 450px;
    box-shadow: 0 0.5rem 4rem 0 rgba(115, 135, 169, 0.1);
    border-radius: 10px;
    background-color: #ffffff;

    img {
      margin: unset;
    }

    .login-title {
      padding: 10px 0px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      font-family: MicrosoftYaHeiSemibold;
      position: relative;
      color: #36383c;
    }

    .fl {
      float: left;
      display: inline;
    }

    .fr {
      float: right;
      display: inline;
    }

    .w-90 {
      width: 90%;
    }

    .w-80 {
      width: 80%;
    }

    .login-content {
      .login-item {
        .login-field {
          display: flex;
          position: relative;
          padding-bottom: 0.55rem;
          padding-top: 1.4rem;
          border-bottom: 1px solid #edf0f5;
          transition: all 0.2s ease;

          img:not([id='codeImg']) {
            width: 1.7rem;
            height: 1.7rem;
          }

          input {
            font-size: 0.8rem;
            font-weight: 300;
            color: #666666;
            line-height: 1.56;
            outline: none;
            border-style: hidden;
          }

          input[type='text'],
          input[type='text']:focus,
          input[type='number'],
          input[type='number']:focus,
          input[type='tel'],
          input[type='tel']:focus,
          input[type='password'],
          input[type='password']:focus {
            font-size: 0.9rem;
            font-weight: 400;
            color: #343e4c;
            line-height: 1.388;
            border: none;
            vertical-align: middle;
            outline: none;
            font-family: 'Microsoft Yahei', Arial, sans-serif;
          }

          .login-input {
            padding-left: 0.8rem;
          }

          .hidden-icon,
          .show-icon {
            width: 1.6rem;
            height: 1.6rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            bottom: 0.55rem;
            cursor: pointer;
          }

          .show-icon {
            background-image: url('@/assets/images/login/show_icon.png');
          }

          .hidden-icon {
            background-image: url('@/assets/images/login/hidden_icon.png');
          }

          #codeImg {
            cursor: pointer;
            position: absolute;
            height: 2.3rem;
            width: 5.9rem;
            right: 0;
            top: 0.55rem;
            border-radius: 4px;

            &:hover {
              opacity: 0.8;
              transition: opacity cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }
          }
        }
      }
    }

    a.disabled,
    button.disabled,
    a[disabled],
    button[disabled] {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
      text-decoration: none !important;
      -webkit-tap-highlight-color: transparent;
    }

    .login-btn {
      margin-top: 30px;
      display: block;
      width: 100%;
      height: 45px;
      border-radius: 999px;
      background: #2979ff;
      font-size: 14px;
      font-weight: 500;
      font-family: MicrosoftYaHeiSemibold;
      color: #ffffff;
      text-align: center;
      line-height: 2.8;
      cursor: pointer;
      border: 0px;
    }

    .operation-items {
      font-size: 13px;
      margin-top: 25px;

      .inline-block {
        display: inline-block;
      }

      .a-link {
        color: var(--primary);
        font-family: MicrosoftYaHei;
        cursor: pointer;
        text-decoration: none;

        &:hover {
          color: #5494ff;
        }
      }

      .fetch-pwd {
        color: #5c697b;
        cursor: pointer;
        font-weight: 500;

        &:hover {
          color: var(--primary);
        }
      }
    }
  }
}

@media (max-width: 916px) {

  .login {
    background-color: white;
    background-image: unset;
    min-width: unset;

    .login-left {
      display: none;
    }

    .login-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      // background-color: #0e64f4;
    }
  }
}

@media (max-width: 1280px) {
  .auth-content {
    box-shadow: unset !important;
  }

  .login-right {
    background-color: #ffffff;
    transition: background-color 0.3s linear;
  }
}

.loader {

  .jimu-primary-loading:before,
  .jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: '';
  }

  .jimu-primary-loading:before {
    left: -19.992px;
  }

  .jimu-primary-loading:after {
    left: 19.992px;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }

  .jimu-primary-loading:before,
  .jimu-primary-loading:after,
  .jimu-primary-loading {
    background: #076fe5;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
  }

  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 6.8px);
    top: calc(50% - 16px);
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }

  @-webkit-keyframes loading-keys-app-loading {

    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 #076fe5;
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px #076fe5;
      height: 40px;
    }
  }

  @keyframes loading-keys-app-loading {

    0%,
    80%,
    100% {
      opacity: 0.75;
      box-shadow: 0 0 #076fe5;
      height: 32px;
    }

    40% {
      opacity: 1;
      box-shadow: 0 -8px #076fe5;
      height: 40px;
    }
  }
}
</style>
