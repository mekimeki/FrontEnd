<template lang="html">
<div>
    <v-tabs class="ma-1" style="border:3px solid #82B1FF;border-radius:10px 10px 0px 0px;">
        <v-tab v-for="(content,i) in contents" key="i" ripple>
          {{$t('content')[content.name]}}
        </v-tab>
        <v-tab-item v-for="tent in contents">
            <v-data-table :items="tent.content" :headers="tent.content.name" class="elevation-1" hide-actions hide-headers select-all>
                <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ $T_change(Math.ceil(props.item.firstTime))}}</td>
                    <td class="text-xs-left">{{ props.item.voca }}</td>
                    <td class="text-xs-left">
                        <input width="200" type="text" name="" value="" v-model="props.item.explain">
                    </td>
                    <td v-on:click="tent.kind? click_mark_content(props.item) : click_mark_word(props.item)">
                        <v-btn small fab style="border:2px solid #82B1FF;">
                            {{$t('contnet')['contentStart']}}
                            <v-icon v-show="props.item.select" color="#82B1FF">add</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
            <hr>
            <v-layout row wrap justify-end>
                <v-flex xl6 sm6 md6>
                    <v-text-field label="search" single-line solo v-model="search" v-on:click="time.firstTime = video.currentTime"></v-text-field>
                </v-flex>
                <v-flex xl1 sm1 md1>
                    <v-btn color="#82B1FF" fab small class="white--text" v-on:click="tent.kind? click_search_content(search) : click_search_word(search)">
                        {{$t('content')['search']}}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-tab-item>
    </v-tabs>
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
      contents: [ //book mark
        {
          name: 'voca',
          content: [],
          kind: true
        },
        {
          name: 'word',
          content: [],
          kind: false
        },
      ],
      search: '',
      pagination: {
        page: 5,
      },
      time: {
        firstTime: 0,
        lastTime: 0,
      },
      input:"",
    }
  },
  methods: {
    ...mapActions(['content_preview_content_action', 'content_preview_word_action']),
    click_search_content(search) {
      this.$http.get("api/voca/search?voca="+search).then(result=>{
        if (result.indata) {
          for (let i = 0; i < result.data.length; i++) {
            this.contents[0].content.push({
              vo_pk: result.data[i].vo_pk,
              voca: result.data[i].voca,
              explain: result.data[i].explain,
              firstTime: this.time.firstTime,
              select: false,
            });
          }
        } else {
          this.contents[0].content.push({
            vo_pk: false,
            voca: search,
            explain: this.input,
            firstTime: this.time.firstTime,
            select: false
          });
        }
      }).catch(result=>{
        console.log("error");
      });
    },
    click_search_word(search) {
      this.$http.get("api/word/searchEn?word="+search).then(result=>{
        if (result.data) {
          this.contents[1].content.push({
            vo_pk: false,
            voca: search,
            explain: result.data.mean ? result.data.mean : this.input,
            firstTime: this.time.firstTime,
            select: false
          });
        } else {
          this.contents[1].content.push({
            vo_pk: false,
            voca: search,
            explain: this.input,
            firstTime: this.time.firstTime,
            select: false
          });
        }
      }).catch(result=>{
        console.log("error");
      });
    },
    click_mark_content(content) {
      if (content.select) {
        content.select = false;
        for (let i = 0; i <= this.cp_getter.length; i++) {
          if (this.cp_getter[0].content[i].voca === content.voca) {
            let data = {
              content: content,
              number: i,
            }
            console.log("??");
            this.content_preview_content_action(data);
            break;
          }
        }
      } else {
        content.select = true;
        let data = {
          content: content,
          number: false,
        }
        this.content_preview_content_action(data);
      }
    },
    click_mark_word(content) {
      if (content.select) {
        content.select = false;
        for (let i = 0; i <= this.cp_getter.length; i++) {
          if (this.cp_getter[1].cotnent[i].voca === content.voca) {
            let data = {
              content: content,
              number: i,
            }
            this.content_preview_word_action(data);
            break;
          }
        }
      } else {
        content.select = true;
        let data = {
          content: content,
          number: false,
        }
        this.content_preview_word_action(data);
      }
    },
  },
  mounted: function() {
    this.input = "内容を書いてください。";
    this.video = this.v_getter;
  },
  computed: {
    ...mapGetters({
      v_getter: "video_getter",
      cp_getter: "content_preview_getter",
    }),
  },
}
</script>

<style lang="css" scoped>
</style>
