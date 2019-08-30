<template lang="html">
<div class="">
  <v-app style="background-color:#ffffff;" id="inspire">
      <v-content>
          <router-view></router-view>
      </v-content>
      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app class="py-2 pl-2" :width="250">
          <v-list dense>
              <template v-for="item in items">
                  <v-layout v-if="item.heading" :key="item.heading" row align-center>
                      <v-flex xs6>
                          <v-subheader v-if="item.heading">
                              {{ item.heading }}
                          </v-subheader>
                      </v-flex>
                      <v-flex xs6 class="text-xs-center">
                          <a href="#!" class="body-2 black--text">EDIT</a>
                      </v-flex>
                  </v-layout>
                  <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                      <template v-slot:activator>
                          <v-list-tile>
                              <v-list-tile-content>
                                  <v-list-tile-title>
                                      {{$t('menu')[item.text]}}
                                  </v-list-tile-title>
                              </v-list-tile-content>
                          </v-list-tile>
                      </template>
                      <v-list-tile v-for="(child, i) in item.children" :key="i" router :to="{ name: child.link }" class="py-1">
                          <v-list-tile-action v-if="child.icon">
                              <v-icon>{{ child.icon }}</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                              <v-list-tile-title cass="py-1">
                                  {{ $t('menu')[child.text] }}
                              </v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </v-list-group>
                  <v-list-tile class="py-1" v-else :key="item.text" router :to="{ name: item.link }">
                      <v-list-tile-action>
                          <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>
                              {{ $t('menu')[item.text] }}
                          </v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </template>
          </v-list>
      </v-navigation-drawer>
      <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="white" app fixed>
          <v-toolbar-title class="ml-0 pl-3">
              <v-flex>
                  <v-container px-0 pt-1 pb-2 ma-1>
                      <v-layout row>
                          <v-toolbar-side-icon class="pt-1" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                          <v-btn icon large>
                              <v-avatar size="40px" tile>
                                  <img class="logo"
                                    :src="require(`@/assets/gogo.png`)"
                                  >
                              </v-avatar>
                          </v-btn>
                          <span id="main_mark" class="pl-3 pt-1 mt-3 caption" >{{$t('menu')['title']}}</span>
                      </v-layout>
                  </v-container>
              </v-flex>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <span v-if="lg_getter.email">
            <span v-if="lg_getter.email">
              <v-btn icon v-on:click="showNotification()">
                .
              </v-btn>
              <v-btn icon>
                <v-icon color="#82B1FF">copyright</v-icon>
                  {{po_getter}}
              </v-btn>
              <v-btn icon router :to="{name:'upload'}">
                  <v-icon color="grey darken-2">video_call</v-icon>
              </v-btn>
              <v-btn icon>
                  <v-icon color="grey darken-2">notifications</v-icon>
              </v-btn>
              <v-btn icon>
                  <v-icon color="grey darken-2">account_circle</v-icon>
              </v-btn>
            </span>
          </span>
          <span v-else>
            <v-btn icon router :to="{name:'login'}">
                <v-icon color="grey darken-2">account_circle</v-icon>
            </v-btn>
            <v-btn icon v-on:click="showNotification()">
              <v-icon>
                notifications
              </v-icon>
            </v-btn>
          </span>

          <span class="text-xs-center">
              <v-bottom-sheet v-model="sheet">
                <template v-slot:activator>
                  <v-icon>g_translate</v-icon>
                </template>
                <v-list>
                  <v-subheader>Language</v-subheader>
                  <v-list-tile
                    v-for="lang in langs"
                    :key="lang.title"
                    @click="sheet = false"
                  >
                    <v-list-tile-avatar>
                      <v-avatar size="32px" tile>
                        <img
                          :src="lang.img"
                          :alt="lang.title"
                        >
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-title v-on:click="move_lang(lang.type)">
                      {{ lang.title }}
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-bottom-sheet>
            </span>
          </span>
      </v-toolbar>
  </v-app>
</div>
</template>

<script>
// import router from './router';
import {
    mapGetters,
    mapActions
} from 'vuex';
import i18n from './i18n';
export default {
    data: () => ({
        drawer: false,
        items: [{
                icon: "home",
                text: "home",
                link: "register"
            },
            {
                icon: "video_library",
                text: "channel",
                link: "channel"
            },
            {
                icon: "video_call",
                text: "video_make",
                link: "upload"
            },
            {
                icon: "favorite",
                text: "favorite",
                link: "likeVideo"
            },
            {
                icon: "border_color",
                text: "quiz",
                link: "qselect"
            },
            {
                icon: "keyboard_arrow_up",
                "icon-alt": "keyboard_arrow_down",
                text: "middle_go",
                model: false,
                children: [{
                        icon: "import_contacts",
                        text: "my_word_book",
                        link: "allWord"
                    },
                    {
                        icon: "import_contacts",
                        text: "my_voca_book",
                        link: "snapWord"
                    },
                    {
                        icon: "import_contacts",
                        text: "recom_word_book",
                        link: "gogoBoard"
                    }
                ]
            },
            {
                icon: "face",
                text: "my_page",
                link: "myPage"
            },
            {
                icon: "help",
                text: "help",
                link: "allWord"
            },
            {
                icon: "settings",
                text: "setting",
                link: "qselect"
            }
        ],
        langs: [
        {
          img: 'https://www.erasmustrainingcourses.com/uploads/6/5/6/3/65630323/flag-of-england-english-flag-pictures-clipart-best-vr0swm-clipart_29.png',
          title: 'English',
          type:'en'
        },
        {
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/225px-Flag_of_Japan.svg.png',
          title: 'Japan',
          type:'jp'
        },
        {
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/225px-Flag_of_South_Korea.svg.png',
          title: 'Korea',
          type:'ko'
        },
      ],
    }),
    methods: {
        ...mapActions(['login_check_actions','point_save_action','point_action']),
        showNotification() {
            Notification.requestPermission(function (result) {
                if (result === 'granted') {
                    navigator.serviceWorker.ready.then(function (registration) {
                        registration.showNotification('text-tool', {
                            body: '영상이 올라왔습니다.!',
                            icon: '/img/icons/gogo-192x192.png',
                            vibrate: [200, 100, 200, 100, 200, 100, 200],
                            tag: 'vibration-sample',
                            data: 'https://www.naver.com'
                        });
                    });
                }
            });
        },
        move_lang(lang_type){
          i18n.locale = lang_type;
        }
    },
    mounted: function () {
        if (localStorage.getItem('login')) {
            this.login_check_actions(localStorage.getItem('login')); //login check
        } else {
            console.log("loginした記録がありません。");
        }
        this.point_save_action('');

        let inter = setInterval(() =>{
          if(this.po_getter === 10){
            console.log("check ok this is alarm");
            this.showNotification();
            clearInterval(inter);
          }
        }, 500);

    },
    computed: {
        ...mapGetters({
            lg_getter: 'login_getters',
            po_getter: 'point_getter',
        })
    },
    watch: {
      po_getter:function(data){
        let inter = setInterval(() =>{
          if(this.po_getter === 10){
            console.log("check ok this is alarm");
            this.showNotification();
            clearInterval(inter);
          }
        }, 500);
      }
    }
};
</script>

<style>
div{
  font-family: Georgia, "meiryo", serif;
}
.icon {
    font-size: 40px;
}
#logo {
    cursor: pointer;
    text-decoration: none;
}
@media screen and (max-width: 500px) {
  #main_mark { display: none; }
}

</style>
