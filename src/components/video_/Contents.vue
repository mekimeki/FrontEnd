<template lang="html">
  <div>
    <v-tabs class="ma-1" style="border:3px solid #82B1FF;border-radius:20px 20px 0px 0px;" grow>
        <v-tab v-for="mark in b_getter" :key="mark.name" ripple>
            {{$t('video_see')[mark.tab]}}
            <span class="pl-2"></span><input style="width:30px;" class="check_card"  v-show="mark.tab ==='voca'" v-model="card_check.content_num"/>
            <input style="width:30px;" class="check_card"  v-show="mark.tab === 'word'" v-model="card_check.word_num"/>
        </v-tab>
        <v-tab-item v-for="(mark, i) in b_getter" :key="i">
          <div id="scroll_div">
            <div class="" v-if="mark.name === 'content'">

              <v-card v-for="(tent, i) in mark.content" :key="i" v-if="i< check_content" class="ma-1">
                <v-card-title primary-title>
                  <div class="content_card">
                    <h4 class="headline mb-0" v-if="!(mark.name === 'subtitleBook')">{{tent.title}}</h4>
                    <img :src="bi_getter[i]" alt="" v-if="mark.name === 'subtitleBook'" width="200" height="100" crossOrigin = "Anonymous">
                    <div>
                      <input type="text" name="" value="" v-model="tent.textArea">
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat small color="blue darken-1" v-on:click="click_update_share(tent,mark.name,i)">
                    <v-icon>check</v-icon>{{$t('video_see')['attend']}}
                  </v-btn>
                  <v-btn flat small color="blue darken-1" v-on:click="click_history(tent.title)">
                    <v-icon>check</v-icon>{{$t('video_see')['history']}}
                  </v-btn>
                </v-card-actions>
              </v-card>

            </div>

            <div class="" v-else-if="mark.name === 'word'">
              <v-card v-for="(tent, i) in mark.content" :key="i" v-if="i< check_word" class="ma-1">
                <v-card-title primary-title>
                  <div class="word_card">
                    <h4 class="headline mb-0" v-if="!(mark.name === 'subtitleBook')">{{tent.title}}</h4>
                    <img :src="bi_getter[i]" alt="" v-if="mark.name === 'subtitleBook'" width="200" height="100" crossOrigin = "Anonymous">
                    <div>
                      <input type="text" name="" value="" v-model="tent.textArea">
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>

                </v-card-actions>
              </v-card>
            </div>

            <div class="" v-else>
              <v-card v-for="(tent, i) in mark.content" :key="i">
                <v-card-title primary-title>
                  <div>
                    <h4 class="headline mb-0" v-if="!(mark.name === 'subtitleBook')">{{tent.title}}</h4>
                    <img :src="bi_getter[i]" alt="" v-if="mark.name === 'subtitleBook'" width="200" height="100">
                    <div>
                      <input type="text" name="" value="" v-model="tent.textArea">
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat small color="#82B1FF" v-on:click="click_bookmark(i,tent,mark.name,$event)">
                    <v-icon>check</v-icon>SAVE
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>

          </div>
          <v-card class="ma-2" v-show="mark.name === 'content'">
            <v-card-title primary-title>
              <v-layout row wrap>
                <v-flex xl12 sm12 md12>
                  <v-text-field
                    height="20"
                    :label="$t('video_see')['voca']"
                    v-model="share.title"
                  ></v-text-field>
                </v-flex>
                <v-flex xl12 sm12 md12>
                  <v-text-field
                    height="20"
                    :label="$t('video_see')['voca_exp']"
                    v-model="share.content"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-btn right flat small color="#82B1FF" v-on:click="click_share(share.title,share.content,mark.name)">
                <v-icon>check</v-icon>{{$t('video_see')['attend']}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
    </v-tabs>

      <v-layout row justify-center>
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
        </template>
        <v-card>
          <v-card-title>{{$t('video_see')['history']}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-card v-for="(content,i) in history_content" :key="i">
              <v-card-title primary-title>
                <div>
                  <!-- <h4 class="headline mb-0">{{ content.voca }}</h4> -->
                  <h3>{{ content.explain }}</h3>
                  <v-icon color="#82B1FF">ballot</v-icon>{{i}}
                </div>
              </v-card-title>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
export default {
  data() {
    return {
      video: "", //video
      video_time_check_c: "", //video time checks
      video_time_check_w: "",
      check: 0, //content check
      check_word: 0,
      check_content: 0,
      share: {
        title: "",
        content: "",
      },
      dialog: false,
      history_content: [],
      card_check: {
        word: false,
        word_num: 0,
        content: false,
        content_num: 0,
      }
    }
  },
  methods: {
    ...mapActions(['content_action', 'share_content_action', 'share_word_action', 'share_content_update_action']),
    click_share(title, content, name) {
      if (confirm("本当に参加しますか？")) {
        let data = {
          'time': this.video.currentTime,
          'pk': this.$route.query.video,
          'title': title,
          'content': content,
        }
        if (name === 'content') {
          this.share_content_action(data);
        } else {
          this.share_word_action(data);
        }
      }
    },
    click_update_share(data, name, num) {
      if (confirm("本当に参加しますか？")) {
        let data_s = {
          'vo_pk': data.pk,
          'voca': data.title,
          'video_pk': this.$route.query.video,
          'explain': data.textArea,
          'time': data.firstTime,
          'num': num,
        }
        this.share_content_update_action(data_s);
      }
    },
    click_history(title) {
      this.dialog = true;
      this.$http.get("api/voca/history?voca="+title).then(result=>{
        this.history_content = result.data;
      }).catch(result=>{
        console.log(result+"error");
      });
    },
    click_bookmark(num, value, name, evt) {
      if (evt.target.innerHTML === 'ok') {
        alert('もう保存されました。');
      } else {
        if (name == 'subtitleBook') {
          let form = new FormData();
          form.append('explain',value.textArea);
          form.append('title',value.title);
          form.append('video_pk',this.$route.query.video);
          form.append('picture',this.bi_getter[num]);
          this.$http.post("/api/getLine",form).then(result=>{
            evt.target.innerHTML = 'ok';
          }).catch(result=>{
            console.log(result+"error");
          })
        } else if (name == 'wordBook') {
          let form = new FormData();
          form.append("word",value.title);
          form.append("email",this.l_getter.email);
          this.$http.post("/api/getWord", form).then(result=>{
            console.log("bookmark check2", result.data);
            // alert("저장되었습니다.");
            evt.target.innerHTML =　"saved";
          }).catch(result=>{
            console.log(result+"error");
          });
        }
      }
    },
    check_view(data,view,time) {
      for (let i = 0; i < view.content.length; i++) {
        if (data.toFixed(1) === view.content[i].firstTime.toFixed(1)) {
          time = 1 + i;
          document.getElementById('scroll_div').scrollTop = document.getElementById('scroll_div').scrollHeight;
        }
      }
    },
  },
  mounted: function() {
    this.video = this.v_getter;
    this.$http.get("/api/videoInfo/content/"+this.$route.query.video).then(result => {
      for (let i = 0; i < result.data.voca.length; i++) {
        this.b_getter[0].content.push({
          "pk": result.data.voca[i][3],
          "title": result.data.voca[i][2][0],
          "firstTime": result.data.voca[i][1][0],
          "lastTime": result.data.voca[i][1][1],
          "textArea": result.data.voca[i][2][1],
        });
      }
      for (let i = 0; i < result.data.word.length; i++) {
        this.b_getter[1].content.push({
          "pk": result.data.word[i][3],
          "title": result.data.word[i][2][0],
          "firstTime": result.data.word[i][1][0],
          "lastTime": result.data.word[i][1][1],
          "textArea": result.data.word[i][2][1],
        });
      }
      setInterval(() => {
        this.video_time_check_c = this.video.currentTime;
        this.video_time_check_w = this.video.currentTime;
      }, 100);
    }).catch(result => {
      console.log(result+"error");
    });
  },
  computed: {
    ...mapGetters({
      v_getter: 'video_getter',
      cp_getter: 'capture_getter',
      c_getter: 'content_getter',
      b_getter: 'bookmark_getter',
      bi_getter: 'bookmark_image_getter',
      l_getter: 'login_getters',
      open_record_getter:'open_record_getter',
    }),
  },
  watch: {
    video_time_check_c: function(data) {
      for (let i = 0; i < this.b_getter[0].content.length; i++) {
        if (data.toFixed(1) === this.b_getter[0].content[i].firstTime.toFixed(1)) {
          this.check_content = 1 + i;
          this.card_check.content = true;
          if(!this.open_record_getter){
              this.card_check.content_num++;
          }
          setTimeout(() => {
            let content_card = document.getElementsByClassName("content_card");
            content_card[i].style.border = "4px solid #EF5350";
            content_card[i].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
            setTimeout(() => {
              content_card[i].style.border = "";
              this.card_check.content = false;
            }, 1000);
          }, 100);
        }
      }
    },
    video_time_check_w: function(data) {
      for (let i = 0; i < this.b_getter[1].content.length; i++) {
        if (data.toFixed(1) === this.b_getter[1].content[i].firstTime.toFixed(1)) {
          this.check_word = 1 + i;
          this.card_check.word = true;
          if(!this.open_record_getter){
            this.card_check.word_num++;
          }
          setTimeout(() => {
            let word_card = document.getElementsByClassName("word_card");
            word_card[i].style.border = "4px solid #EF5350";
            word_card[i].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
            setTimeout(() => {
              word_card[i].style.border = "";
              this.card_check.word = false;
            }, 3000);
          }, 100);
        }
      }
    }
  },
}
</script>

<style lang="css" scoped>
#scroll_div{
  overflow: scroll;
  height:500px;
}
.check_card{
  text-align: center;
  color:white;
  font-size:1.2rem;
  background: rgb(245, 33, 33);
  width:100%;
  border-radius: 20%;
}
</style>
