export default {
  dbs: 'mongodb://127.0.0.1:27017/student',     //连接MongoDB
  redis:{                                       //连接redis
    get host(){
      return '127.0.0.1'
    },
    get post(){
      return 6379
    }
  },
  smtp:{             //连接SMTP服务
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return '1084235321@qq.com'
    },
    get pass(){
      return 'pnjbvczckikggfbj'
    },
    get code(){
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}