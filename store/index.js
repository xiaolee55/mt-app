import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    // 如果在状态树中指定了 nuxtServerInit 方法，Nuxt.js 
    // 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。
    async nuxtServerInit({    //用于在服务端操作store
      commit
    }, {req,app}) {
      const {
        status,
        data: {
          province,
          city
        }
      } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})
    }
  }
})

export default store
