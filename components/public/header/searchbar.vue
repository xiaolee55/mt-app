<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col 
        :span="3" 
        class="left">
        <a href="//bj.meituan.com"><img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团"></a>
      </el-col> 
      <el-col 
        :span="15" 
        class="center">
        <div class="wrapper">
          <el-input 
            v-model="search" 
            placeholder="搜索商家或地点"
            @focus="focus" @blur="blur" @input="input"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl class="searchList" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd 
              v-for="(item,index) in $store.state.home.hotPlace" 
              :key="index"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd 
              v-for="(item,index) in searchList" 
              :key="index"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>
          </dl>
        </div>
        <p class="suggest">
          <a
             v-for="(item,index) in hotPlace" 
            :key="index"
            :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col> 
      <el-col 
        :span="6" 
        class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>  
    </el-row>    
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      hotPlace: [],
      searchList: []
    }
  },
  methods: {
    focus: async function() {
      this.isFocus=true
      let self=this
      let city=self.$store.state.geo.position.city.replace('市','')
      let {status,data:{result}}=await self.$axios.get('/search/hotPlace',{
        params:{
          city
        }
      })  
      self.hotPlace=result    
    },
    blur: function() {
      let self=this
      setTimeout(() => {      //防止点击链接之前就已经失去焦点，导致列表消失，点击事件不触发
        this.isFocus=false
      }, 200);
    },
    input: _.debounce(async function() {    //防抖函数，防止每次输入都要发送请求
      let self=this
      let city=self.$store.state.geo.position.city.replace('市','')
      self.searchList=[]
      let {status,data:{top}}=await self.$axios.get('/search/top',{
        params:{
          input:self.search,
          city
        }
      })
      self.searchList=top.slice(0,10)
    },300)
  },
  computed: {
    isHotPlace: function(){
      return this.isFocus&&!this.search
    },
    isSearchList: function(){
      return this.isFocus&&this.search
    }
  },
}
</script>