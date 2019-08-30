<template>
<div id="box">
  <v-layout row wrap>
    <v-sheet color="rgb(245, 217, 103)" width="65">
      <sheet-footer>
        <br />
      </sheet-footer>
    </v-sheet>
    <div class="pt-1 pl-1 pr-4" style="font-size:1.3rem; font-weight:600;">{{$t('record')['graph_origin']}}</div>
    <v-sheet color="#82B1FF" width="60">
      <sheet-footer>
        <br />
      </sheet-footer>
    </v-sheet>
    <div class="pt-1 pl-1" style="font-size:1.3rem; font-weight:600;">{{$t('record')['graph_record']}}</div>
    <span class="ml-5 pl-5" style="color:red; font-size:1.5rem; font-weight:600;" v-if="score!=0">
      {{score}}{{$t('record')['score']}}
    </span>
  </v-layout>

  <div class="graph_box_1" row wrap>
    <v-sparkline class="graph" id="graph_1" :value="origin_value" :gradient="gradient[1]" :padding="10" :line-width="2" :stroke-linecap="round" :gradient-direction="Top" auto-draw line-width="2"></v-sparkline>
  </div>
  <div class="graph_box_2" row wrap>
    <v-sparkline class="graph" id="graph_2" :value="record_value" :gradient="gradient[2]" :padding="10" :line-width="2" :stroke-linecap="round" :gradient-direction="Top" auto-draw line-width="2"></v-sparkline>
  </div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
const gradients = [
  ['#82B1FF'],
  ['rgb(245, 217, 103)'],
  ['#82B1FF', '#82B1FF', '#82B1FF'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
];
export default {
  data() {
    return {
      Top: 'top',
      round: 'round',
      gradient: gradients,
      origin_value: [],
      record_value: [],
      score: 0,
    }
  },
  methods: {
  },
  mounted: function() {},
  computed: {
    ...mapGetters({
      g_getter: 'graph_orign_getter',
      r_getter: 'graph_record_getter',
      s_getter: 'graph_score_getter',
    }),
  },
  watch: {
    g_getter: function(data) {
      this.origin_value = this.g_getter;
    },
    r_getter: function(data) {
      if (!this.r_getter) {
        alert('다시 녹음해 주세요');
      } else {
        this.record_value = this.r_getter;
        this.score = this.s_getter;
      }
    }
  }
}
</script>

<style>
#box {
  height: 400px;
  margin-bottom: -30%;
}
.graph_box_1 {
  position: relative;
  width: 100%;
  z-index: 1;
}
.graph_box_2 {
  position: relative;
  top: -150px;
  width: 100%;
  z-index: 2;
}
div:hover .graph {

}
</style>
