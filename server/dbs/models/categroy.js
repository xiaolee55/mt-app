import mongoose from 'mongoose'

//mongoose.Schema   new mongoose.Schema()  mongoose.model(name,obj) //实例，能用的表
const Schema = mongoose.Schema
const Categroy=new Schema({
  city:{
    type:String,   
    require:true   //必须字段
  },
  types:{
    type:Array,
    require:true
  },
  areas:{
    type:Array,
    require:true
  }
})

export default mongoose.model('Categroy',Categroy)