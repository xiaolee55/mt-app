import axios from 'axios'

const instance = axios.create({   //配置axios
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:2000,
  headers:{

  }
})

export default instance