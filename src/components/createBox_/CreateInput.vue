<template lang="html">
    <v-card color="wilte" class="dark--text ma-1" style="border:2px solid #82B1FF;">
      <v-layout row wrap>
        <v-flex xl12 sm12 md12>
          <v-card-title>
            <span class="textSize pr-2" >{{$t('subtitle')['start']}}</span>
            <input style="width:60px; font-size:18px;" type="text" name="" value="" v-model="firstTime">
            <span class="textSize pr-2" >{{$t('subtitle')['end']}}</span>
            <input style="width:60px; font-size:18px;" type="text" name="" value="" v-model="lastTime">
          </v-card-title>
        </v-flex>
        <v-flex xl12 sm12 md12 class="ma-2">
          <v-text-field
            :label="$t('subtitle')['subtitleInput']"
            v-on:click="time_check(true)"
            v-model="subtitle_write"
          >
          </v-text-field>
          <v-layout justify-end>
            <v-icon color="#82B1FF" medium v-on:click="time_check(false)">add_circle_outline</v-icon>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import axios from 'axios';
export default {
  data() {
    return {
      video: "",
      check_time: {
        'first': "",
        'last': "",
        'now': "",
      },
      create_number: "",
      subtitle_buffer: [],
      subtitle_write: "",
    }
  },
  methods: {
    ...mapActions(['subtitle_buffer_action']),
    time_check(check) {
      if (check) {
        this.check_time.first = this.video.currentTime;
      } else {
        if (!(this.check_time.first === "")) {
          if (this.check_time.last === "") {
            this.check_time.last = this.video.currentTime + 2;
            this.create_number = this.check_time.first;
          } else {
            this.check_time.last = this.video.currentTime;
            this.create_number = this.check_time.first;
          }
        } else {
          if (this.create_number === this.check_time.first) {
            alert("같음");
          } else {
            this.check_time.last = this.video.currentTime;
            this.create_number = this.check_time.first;
          }
        }
      }
    },
    subtitle_scroll_save() {}
  },
  mounted: function() {
    this.video = this.v_getter;
  },
  computed: {
    ...mapGetters({
      v_getter: "video_getter",
      s_getter: "subtitle_getter",
    }),
    firstTime: function() {
      return this.$T_change(Math.ceil(this.check_time.first));
    },
    lastTime: function() {
      return this.$T_change(Math.ceil(this.check_time.last));
    }
  },
  watch: {
    create_number(data) {
      this.subtitle_buffer.push({
        "firstTime": this.check_time.first,
        "lastTime": this.check_time.last,
        "textArea": this.subtitle_write,
      });
      this.subtitle_buffer_action(this.subtitle_buffer);
      this.check_time.first = "";
      this.check_time.last = "";
      this.subtitle_write = "";
    }
  }
}
</script>

<style lang="css" scoped>
.textSize{
    font-size: 1.2rem;
    font-weight: 500;
}
</style>
