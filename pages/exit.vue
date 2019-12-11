<template>
  <div class=""/>
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (ctx) =>{  
    //使用中间件发送请求，因为是独立出来的vue组件，没有
    //什么按钮触发，所以只能在中间件发送请求，因为中间件是在路由改变时被调用
    let {status,data}=await ctx.$axios.get('/users/exit')
    if(status === 200&&data&&data.code === 0) {
      window.location.href='/'
    }
  }
}
</script>