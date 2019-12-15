<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{item}}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data() {
    return {
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted () {
    let self=this
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city')
    if(status===200){
      let p
      let c
      let d={}
      
      city.forEach(item=>{
        p=pyjs.getFullChars(item.name).toLowerCase().slice(0,1)
        c=p.charCodeAt(0)  
        if(c>96&&c<123){
          if(!d[p]){   //使用拼音首字母作为键映射，每个键的值是一个数组，承载首字母相同的城市
            d[p]=[]
          }
          d[p].push(item.name)
        }
      })
      for(let [k,v] of Object.entries(d)){    //遍历对象并把元素拿到数组中
        blocks.push({
          title:k.toUpperCase(),
          city:v
        })
      }
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))   //按拼音首字母排序
      self.block=blocks
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/changecity/categroy.scss"
</style>