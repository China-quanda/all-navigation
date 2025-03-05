<template>
  <header :class="['header', isFixed ? 'isFixed' : '']">
    <div class="header-level1 w1200px">
      <div class="time">
        <span>{{ time }}</span>
        <span>{{ dataTime }}</span>
      </div>
      <div class="list">
        <a href="#">需求池</a>
        <a href="#">赞助榜</a>
        <a href="#">积分榜</a>
        <a href="#">消息通知</a>
        <a href="#">登录</a>
      </div>
    </div>
    <div class="header-nav">
      <a href="#">需求池</a>
      <a href="#">赞助榜</a>
      <a href="#">积分榜</a>
      <a href="#">消息通知</a>
      <a href="#">登录</a>
    </div>
    <div class="header-search w1200px">
      <a class="logo" href="/">
        <h1 class="logo-title">xx导航</h1>
        <img class="logo-img" src="http://iph.href.lu/180x60?text=LOGO">
      </a>
      <Search v-model="keyword"></Search>
      <div class="btns">
        <button class="system-setting">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L18 10H10V18L4 24L10 30V38H18L24 44L30 38H38V30L44 24L38 18V10H30L24 4Z" fill="none"
              stroke="#bb6d6d" stroke-width="4" stroke-linejoin="round" />
            <path
              d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
              fill="none" stroke="#bb6d6d" stroke-width="4" stroke-linejoin="round" />
          </svg>
        </button>
        <a class="cu_tool" id="cu_tool_btn">
          <svg class="gb_Pe" focusable="false" viewBox="0 0 24 24">
            <path
              d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z">
            </path>
          </svg>
        </a>
      </div>
    </div>
    <div class="header-hot">
      <a href="#">加入用户交流群</a>
      <a href="#">大模型</a>
      <a href="#">Tokens</a>
      <a href="#">免费领取</a>
      <a href="#">进大厂</a>
      <a href="#">好书在线</a>
      <a href="#">摸鱼导航</a>
      <a href="#">做好简历</a>
      <a href="#">Ai应用开发</a>
    </div>
    <button class="installBtn">
      <span>安装到桌面</span>
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4004 11.551L36.3332 5H11.6666L6.58398 11.551" stroke="#bb6d6d" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M6 13C6 11.8954 6.89543 11 8 11H40C41.1046 11 42 11.8954 42 13V40C42 41.6569 40.6569 43 39 43H9C7.34315 43 6 41.6569 6 40V13Z"
          fill="none" stroke="#bb6d6d" stroke-width="4" stroke-linejoin="round" />
        <path d="M32 27L24 35L16 27" stroke="#bb6d6d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M23.9917 19V35" stroke="#bb6d6d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </header>
</template>

<script setup lang="ts">
const keyword = ref('')
const dataTime = ref('')
const time = ref('')
const isFixed = ref(false)
function getDateInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始的
  const day = now.getDate();
  const dayOfWeek = now.getDay(); // 星期几
  const daysOfWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
 
  return {
    year,
    month,
    day,
    dayOfWeek: daysOfWeek[dayOfWeek] // 将数字转换为中文星期
  };
}
function getFormattedTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
onMounted(() => {
  const { year,month,day,dayOfWeek} = getDateInfo();
  time.value = `${year} 年 ${month} 月 ${day} 日  ${dayOfWeek}`
  
  setInterval(() => {
    dataTime.value = getFormattedTime();
  }, 1000);

  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // isFixed.value = scrollTop > 175 ? true : false
  }
})
</script>

<style scoped lang="scss">
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 0px;
  border-bottom: 0.2px solid #f1f0f0;
  box-shadow: 0px 10px 10px rgb(238 242 245 / 80%);
  background-color: #fff;
}

.isFixed {
  position: sticky;
  top: 0px;
  left: 0;
  right: 0;
  height: 72px;
  padding: 8px 0px;
  -webkit-backdrop-filter: saturate(180%) blur(3px);
  backdrop-filter: saturate(180%) blur(3px);
  background: hsla(0, 0%, 100%, .5);

  .header-level1,
  .header-nav,
  .header-hot,
  .installBtn {
    display: none !important;
  }
}

.header-level1 {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  .time{
    display: flex;
    gap: 10px;
    color: #666;
  }

  .list {
    display: flex;
    gap: 10px;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 15px;
  a{
    color: #333;
    &:hover{
      // color: #666;
    }
  }
}

.header-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  .logo {
    display: block;
    width: 170px;
    height: 55px;

    .logo-title {
      display: none;
    }

    .logo-img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }

  .btns {
    display: flex;
    gap: 15px;

    .system-setting {
      cursor: pointer;
      height: 55px;
      width: 55px;
      border-radius: 50px;
      padding: 16px;
      border: 1px solid #f0f4fb;
      background-color: transparent;
      background-image: linear-gradient(0deg, #ffffff 0%, #f3f5f8 100%);
      border: 2px solid #fff;
      box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1);
    }

    .cu_tool {
      // position: absolute;
      // right: -30px;
      // top: 35px;
      padding: 13px;
      display: inline-block;
      outline: none;
      vertical-align: middle;
      -webkit-border-radius: 2px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 55px;
      width: 55px;
      cursor: pointer;
      text-decoration: none;
      color: #5f6368;
      border-radius: 50px;
      border: 1px solid #f0f4fb;
      background-image: linear-gradient(0deg, #ffffff 0%, #f3f5f8 100%);
      border: 2px solid #fff;
      box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, .1);
    }
  }



}

.header-hot {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 15px;
  a{
    color: #9d9b9b;
    &:hover{
      color: #000;
    }
  }
}

.installBtn {
  position: absolute;
  left: 50px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 120px;
  font-size: 14px;
  background-color: whitesmoke;
  border: none;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  color: #666;
}
</style>