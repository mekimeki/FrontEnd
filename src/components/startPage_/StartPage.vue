<template>
<div class="">
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xl6 xs6 sm6 md6>
        <v-carousel
          hide-delimiters="false"
          class="ma-1"
          style="opacity:0.7;"
          height="525"
        >
          <v-carousel-item v-for="(item, i) in start_items" :key="i">
            <v-sheet :color="item.color" height="105%" tile>
              <v-layout row wrap class="pa-5">
                <v-icon large color="black">{{item.icon}}</v-icon>
                <h2 style="color:black;text-decoration:underline;">{{$t('start')[item.text_1]}}</h2>
                <br /><br />
                <h3>{{$t('start')[item.text_2]}}</h3>
                <br />
                <h3>{{$t('start')[item.text_3]}}</h3>
              </v-layout>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <!--explanaiton of service -->
      <v-flex xl6 xs6 sm6 md6 class="pa-2">
        <v-layout wrap row>
          <v-flex xs6 sm6 md6 class="pb-4" v-for="explain in explains" :key="explain">
            <v-img :src="require(`@/assets/Start/${explain.img}.jpg`)" aspect-ratio="1.5" @mouseover="explain.hover=true" @mouseleave="explain.hover=false" :class="{active: explain.active}" style="-webkit-filter: grayscale(100%);">
              <span v-if="explain.hover">
                <v-layout wrap row justify-center class="pa-5">
                  <v-flex sm12 xl12 md12>
                    <v-layout justify-center>
                      <v-icon color="white" x-large>{{explain.icon}}</v-icon>
                    </v-layout>
                  </v-flex>
                  <v-flex sm12 xl12 md12>
                    <v-layout justify-center>
                      <h3 class="text-xs-center white--text">{{$t('picture_start')[explain.text]}}</h3>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </span>
            </v-img>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-4">
        <v-img :src="require(`@/assets/Start/post1.png`)"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-4">
        <v-img :src="require(`@/assets/Start/post2.png`)"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-4">
        <v-img :src="require(`@/assets/Start/post3.png`)"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-4">
        <v-img :src="require(`@/assets/Start/post4.png`)"></v-img>
      </v-flex>

      <v-flex xs12 sm12 class="py-4">
        <v-card flat color="white">
          <v-layout v-for="item in items" :key="item" justify-center>
            <v-btn flat large :to="`${ item.link }`">
              <h1>{{$t('start')['move']}}</h1>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    showComment: false,
    comment: "",
    items: [{
      link: "main"
    }],
    explains: [{
        text: "first",
        icon: "group_add",
        hover: false,
        img: "service1",
        active: "hover1"
      },
      {
        text: "second",
        icon: "headset_mic",
        hover: false,
        img: "service2",
        active: "hover2"
      },
      {
        text: "third",
        icon: "collections",
        hover: false,
        img: "service3",
        active: "hover3"
      },
      {
        text: "forth",
        icon: "switch_video",
        hover: false,
        img: "service4",
        active: "hover4"
      }
    ],
    start_items: [{
        icon: "video_call",
        color: "#82B1FF",
        text_1: "first",
        text_2: "second",
        text_3: "third"
      },
      {
        icon: "video_call",
        color: "#82B1FF",
        text_1: "first",
        text_2: "second",
        text_3: "third"
      },
    ],
  }),
  methods: {
    changeComment(a) {
      this.showComment = true;
      this.comment = a;
    }
  }
};
</script>

<style lang="css" scoped>
div{
  font-family: Georgia, "meiryo", serif;
}
.start_left {
  padding:5%;
  color:white;
  background-color: yellow;
  width:100%;
  height:100%;
}
.active {
  filter: opacity(80);
  -webkit-filter: opacity(0.8);
  height: 100%;
}
.logo {
  max-height: 50px;
  max-width: 50px;
}
h2{
  color:black;
}
h3{
  color:black;
}
</style>
