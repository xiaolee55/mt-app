import mongoose from 'mongoose'

//mongoose.Schema   new mongoose.Schema()  mongoose.model(name,obj) //实例，能用的表
const Schema = mongoose.Schema
const UserSchema=new Schema({
  username:{
    type:String,   
    unique:true,   //唯一字段
    require:true   //必须字段
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type: String,
    require:true
  }
})

export default mongoose.model('User',UserSchema)