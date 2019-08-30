<template lang="html">
  <div class="">
    <v-tabs class="ma-1" style="border:3px solid #82B1FF;border-radius:10px 10px 0px 0px;">
      <v-tab v-for="tent in cp_getter" ripple>
        {{$t('content')[tent.name]}}
      </v-tab>
      <v-tab-item v-for="content in cp_getter">
        <v-card v-for="(tent,i) in content.content" key="i" style="border:1px solid #82B1FF;">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{tent.voca}}</h3>
              <h5>TIME:{{$T_change(Math.ceil(tent.firstTime))}}</h5>
              <div>
                <input type="text" placeholder="please" name="" value="" v-model="tent.explain.replace(/\s/gi, '')">
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="#82B1FF">
              <v-icon>check</v-icon>{{$t('content')['ok']}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-layout justify-center>
      <v-btn large class="white--text" color="#82B1FF" v-on:click="click_save()">{{$t('content')['save']}}</v-btn>
    </v-layout>
    <v-layout justify-center>
      <div class="" v-show="up_getters.content">
        <v-btn class="white--text" color="#82B1FF" large v-on:click="move()">{{$t('content')['move']}}</v-btn>
      </div>
    </v-layout>
    <v-dialog v-model="open" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          <span class="cut">{{$t('create_video')['created']}}</span>
          <v-progress-linear v-model="percent_content" color="#82B1FF"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      video: '',
      open:false,
      percent_content:0,
    }
  },
  methods: {
    ...mapActions(['upload_content_action', 'percent_action']),
    click_save() {
      this.open = true;
      let data = {
        video: this.$route.query.video,
        content: this.cp_getter[0].content,
        word: this.cp_getter[1].content,
      }
      this.upload_content_action(data);
      let inter = setInterval(() => {
        this.percent_content = this.percent;
        if (this.percent_content === 100) {
            this.open = false;
            clearInterval(inter);
        }
      }, 100);
    },
    move() {
      this.percent_action(0);
      this.$router.push({
        name: 'message',
        query: {
          video: this.$route.query.video
        }
      });
    },
  },
  mounted: function() {
    this.video = this.v_getter;
  },
  computed: {
    ...mapGetters({
      v_getter: "video_getter",
      up_getters: "upload_getters",
      cp_getter: "content_preview_getter",
      percent: 'percent_getter'
    }),
  },
}
</script>

<style lang="css" scoped>
#scroll_div {
  overflow: scroll;
  height: 500px;
}
</style>
