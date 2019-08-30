<template>
<div class="text-xs-center">
  <v-list id="menu">
    <v-list-tile v-for="(item, index) in items" :key="index">
      <v-list-tile-title class="list" v-on:click='menu(item)'>
        {{ $t("helptool")[item.title]}}
        <v-icon color="white">{{item.check}}</v-icon>
      </v-list-tile-title>
    </v-list-tile>
  </v-list>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
    </template>
    <v-card>
      <v-card-title class="headline">퀴즈</v-card-title>
      <v-card-text>
        <quizone></quizone>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">퀴즈취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import quizone from '@/components/quizPage_/QuizOne';
export default {
  components:{
    quizone
  },
  data() {
    return {
      items: [{
          title: 'subtitleUpdate',
          method:0,
          check:'',
        },
        {
          title: 'continuity',
          method:1,
          check:'',
        },
        {
          title: 'url_copy',
          method:2,
          check:'',
        },
        {
          title: 'quiz',
          method:3,
          check:'',
        }
      ],
      dialog:false,
    }
  },
  methods: {
    menu(item){
      item.check = 'check';
      if(item.method === 0){
        this.subtitle_edit();
      }else if(item.method === 1){
        this.loop_video();
      }else if(item.method === 2){
        this.time_copy();
      }else if(item.method === 3){
        this.quiz_open();
      }
      setTimeout(()=>{
        item.check = '';
      },1000);
    },
    loop_video(){
      this.v_getter.currentTime = 0;
      if(this.v_getter.duration.toFixed(1) === this.v_getter.currentTime.toFixed(1)){
        this.v_getter.currentTime = 0;
      }
    },
    time_copy(){
      let copyText = document.getElementById('copy_area');
      copyText.value = document.location.href+"?time="+this.v_getter.currentTime;
      copyText.select();
      document.execCommand('copy');
      alert("URL 복사"+copyText.value);
    },
    subtitle_edit(){
      this.$router.push({
        name: 'subtitle',
        query: {
          video: this.$route.query.video,
          firstTime: 0,
          lastTime: this.v_getter.duration,
          check:true,
        }
      });
    },
    quiz_open(){
      this.dialog = true;
    }
  },
  mounted: function() {
  },
  computed: {
    ...mapGetters({
      v_getter: 'video_getter',
    }),
  },
}
</script>

<style lang="css" scoped>
#menu{
  opacity:0.7;
  background: black;
  border-radius:0px 40px 40px 40px
}
.list{
  color: white;
}
.list:hover{
  background-color: white;
  cursor:pointer;
}
</style>
