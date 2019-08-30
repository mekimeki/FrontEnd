<template lang="html">
  <div class="">
    <br>
    <span id="tag" class="ma-5">{{$t('tag')[$route.name]}}</span>
    <hr color="#82B1FF" size="6" id="line">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      tag:[
        "upload",
        "c-video",
        "subtitle",
        "content",
        "message",
      ]
    }
  },
  methods:{
    move(place){
      this.$router.push({name:place});
    }
  },
  computed:{
    ...mapGetters({
      up_getters:'upload_getters',
      vc_getters:'video_cut_getters',
    }),
  }
}
</script>

<style lang="css" scoped>
div{
  font-family: Georgia, "meiryo", serif;
}
#tag{
  font-size:170%;
  padding:0.5%;
  margin-left: 20%;
  background-color: #82B1FF;
  border-top:3px solid #82B1FF;
  border-right:3px solid #82B1FF;
  border-left:3px solid #82B1FF;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  color:white;
}
#line{
  margin-top: -0.045%;
  margin-left: 3.9%;
}

@media screen and (max-width: 1200px) {
  #line{
    margin-top: -0.5%;
    margin-left: 11.5%;
  }
}
</style>
