import mongoose from 'mongoose'

//mongoose.Schema   new mongoose.Schema()  mongoose.model(name,obj) //实例，能用的表
const Schema = mongoose.Schema
const Province=new Schema({
  id:{
    type:String,   
    require:true   //必须字段
  },
  value:{
    type:Array,
    require:true
  }
})

export default mongoose.model('Province',Province)