<template lang="html">
<div class="">
  <v-container grid-list-md text-xs-center>
      <v-layout row wrap px-5 mx-5 pt-5>
          <v-flex xs8 class="px-5">
              <v-carousel hide-delimiters>
                  <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
                    <h1 class="pt-5 pl-5 text-xs-left white--text">{{ item.text }}</h1>
                  </v-carousel-item>
              </v-carousel>
          </v-flex>
          <v-flex xs4>
              <router-view></router-view>
          </v-flex>
      </v-layout>
  </v-container>
</div>
</template>

<script>
import login_ from '@/components/login_/Login';
import loginRegister_ from '@/components/login_/LoginRegister';
export default {
    components: {
        login_,
        loginRegister_,
    },
    data() {
        return {
            items: [{
                    src: require(`@/assets/Start/service1.jpg`),
                    text: "사용자 참여형 서비스"
                },
                {
                    src: require(`@/assets/Start/service2.jpg`),
                    text: "즉각적인 100LS"
                },
                {
                    src: require(`@/assets/Start/service3.jpg`),
                    text: "사진으로 연상 가능한 어학집"
                },
                {
                    src: require(`@/assets/Start/service4.jpg`),
                    text: "어학을 위한 간편한 영상 편집"
                }
            ]
        }
    }
}
</script>

<style lang="css" scoped>
div{
  font-family: Georgia, "meiryo", serif;
}
</style>
