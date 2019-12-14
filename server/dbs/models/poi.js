import mongoose from 'mongoose'

//mongoose.Schema   new mongoose.Schema()  mongoose.model(name,obj) //实例，能用的表
const Schema = mongoose.Schema
const Poi=new Schema({
  name: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode:{
    type:String
  },
  tel:{
    type:String
  },
  area:{
    type:String
  },
  addr:{
    type:String
  },
  type:{
    type:String
  },
  module:{
    type:String
  },
  longitude:{
    type:Number
  },
  latitude:{
    type:Number
  }
})

export default mongoose.model('Poi',Poi)