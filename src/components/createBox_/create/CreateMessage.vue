<template lang="html">
  <div class="ma-5">
    <v-layout>
      <v-flex sm10>
        <video_></video_>
      </v-flex>
      <v-flex sm8>
        <v-card class="pa-4" style="border:4px; solid #4DB6AC;">
          <v-text-field
            :label="$t('message')['title']"
            v-model="create_text.title"
          ></v-text-field>
          <v-textarea
            background-color="grey lighten-2"
            rows="10"
            :label="$t('message')['explain']"
            v-model="create_text.explain"
          ></v-textarea>
          <v-overflow-btn
            :items="category_list"
            :label="$t('message')['category']"
            target="#dropdown-example"
            v-model="category"
          ></v-overflow-btn>
        </v-card>
        <v-layout justify-center>
          <v-btn large class="white--text" v-on:click="click_upload_created()" color="#82B1FF">{{$t('message')['create']}}</v-btn>
        </v-layout>
        <div class="text-xs-center">
          <v-dialog v-model="open" hide-overlay persistent width="300">
              <v-card>
                  <v-card-text>
                      <span class="cut">{{$t('message')['created']}}</span>
                      <v-progress-linear v-model="percent" color="#82B1FF"></v-progress-linear>
                  </v-card-text>
              </v-card>
          </v-dialog>
      </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import video_ from '@/components/video_/Video2';
export default {
  components: {
    video_,
  },
  data() {
    return {
      create_text: {
        title: '',
        explain: '',
        category: '',
        open: false,
      },
      category_list: ['fantasty', 'sf', 'fear', 'thriller', 'comedy', 'romance', 'action'],
    }
  },
  methods: {
    ...mapActions(['upload_created_action','point_action']),
    click_upload_created() {
      this.open = true;
      let data = {
        video_pk: this.$route.query.video,
        text: this.create_text,
      }
      this.upload_created_action(data).then(result => {
        if (result) {
          // alert(this.$route.query.video+'success');
          this.point_action(1);
          this.$router.push({
            name: 'v-video',
            query: {
              video: this.$route.query.video
            }
          });
        }
      });
    }
  },
  mounted: function() {

  },
  computed: {
    ...mapGetters({
      up_getters: 'upload_getters',
      percent: 'percent_getter',
    })
  },

}
</script>

<style lang="css" scoped>
</style>
