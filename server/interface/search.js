import Router from 'koa-router';
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({
  prefix: '/search'
})

router.get('/top',async (ctx)=>{
  let {status,data:{top}}=await axios.get(`http://cp-tools.cn/search/top`,{
    params:{
      input:ctx.query.input,
      city:ctx.query.city
    }
  })
  ctx.body={
    top:status===200?top:[]
  }
})

router.get('/hotPlace',async (ctx)=>{
  let city = ctx.store?ctx.store.geo.position.city:ctx.query.city
  let {status,data:{result}}=await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params:{
      city
    }
  })
  ctx.body={
    result:status===200?result:[]
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword,
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200
      ? pois
      : []
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword||'旅游';
  const city = ctx.query.city||'北京'
  const {status,data:{product,more}}=await axios.get('http://cp-tools.cn/search/products',{
    params:{
      keyword,
      city
    }
  })
  if(status===200){
    ctx.body = {
      product,
      //判断是否为登录状态
      more:ctx.isAuthenticated()?more:[],
      login:ctx.isAuthenticated()
    }
    
  }else{
    ctx.body={
      product: {},
      more:ctx.isAuthenticated()?more:[],
      login:ctx.isAuthenticated()
    }
  }
})
export default router