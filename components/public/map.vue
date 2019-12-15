<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height:{
      type:Number,
      default:300
    },
    point:{
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data() {
    return {
      id: "map",
      key: ''
    }
  },
}
</script>