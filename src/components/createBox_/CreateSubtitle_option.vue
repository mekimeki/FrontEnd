<template lang="html">
<div id="out">
  <div id="subtitle_box">
    {{subtitle_open}}
  </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex';
export default {
  data() {
    return {
      video: '',
      video_time_check: 0,
      subtitle_open: '',
    }
  },
  mounted: function() {
    this.video = this.v_getter;
    setInterval(() => {
      this.video_time_check = this.video.currentTime;
    }, 100);
  },
  computed: {
    ...mapGetters({
      v_getter: 'video_getter',
      preview_getter: 'subtitle_preview_getter',
    }),
  },
  watch: {
    video_time_check: function(data) { //subtitle view methods
      for (let i = 0; i < this.preview_getter.length; i++) {
        if (this.video.currentTime.toFixed(1) === this.preview_getter[i].firstTime.toFixed(1)) {
          this.subtitle_open = this.preview_getter[i].textArea;
        } else if (this.video.currentTime.toFixed(1) === this.preview_getter[i].lastTime.toFixed(1)) {
          this.subtitle_open = "";
        }
      }
    }
  },
}
</script>

<style lang="css" scoped>
#out{
  width: 100%;
  text-align: center;
  font-size: 1.9rem;
}
#subtitle_box{
  color:white;
  font-size: 1.9rem;
  background-color: rgba(255, 255, 255, 0.4);
  position: relative;
  display: inline-block;
  top:-140px;
  cursor:pointer;
}
</style>
