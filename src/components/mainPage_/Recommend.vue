<template lang="html">
<v-container class="fontStyle" pa-5 ml-5 fluid grid-list-md>
    <v-layout pl-3 row wrap>
        <v-flex xs3 md3 sm3>
          <div class="divSquare1 mt-1">
              <v-icon class="pl-3 pt-5 mt-4" size="80" color="black">play_arrow</v-icon>
              <div class="titleName">{{$t('recommand')['advice']}}</div>
          </div>
        </v-flex>
        <v-flex xs9 md9 sm9>
            <div class="category">
                <div class="categoryName1">{{$t('recommand')['movie']}}</div>
                <div class="categoryName2">{{$t('recommand')['action']}}</div>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/1.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/12.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="category">
                <div class="categoryName1">{{$t('recommand')['movie']}}</div>
                <div class="categoryName2">{{$t('recommand')['animation']}}</div>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/51.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/50.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/52.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/17.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/5.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/22.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/56.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/55.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/54.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/53.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
        </v-flex>
    </v-layout>
    <v-layout pl-3 row wrap>
        <v-flex xs3>
          <div class="divSquare1 mt-1">
              <v-icon class="pl-3 pt-5 mt-4" size="80" color="black">play_arrow</v-icon>
              <div class="titleName">{{$t('recommand')['enrollment']}}</div>
          </div>
        </v-flex>
        <v-flex xs9>
            <div class="category">
                <div class="categoryName1">{{$t('recommand')['movie']}}</div>
                <div class="categoryName2">{{$t('recommand')['fantasy']}}</div>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/2.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/3.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="category">
                <div class="categoryName1">{{$t('recommand')['movie']}}</div>
                <div class="categoryName2">{{$t('recommand')['mellow']}}</div>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/4.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/6.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/8.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/15.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/14.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/9.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/10.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/11.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/13.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
            <div class="divSquare">
                <v-img :src="require(`@/assets/Poster/21.jpg`)" lazy-src="https://picsum.photos/id/11/10/6" aspect-ratio="1" class="grey lighten-2" max-width="500" max-height="300"></v-img>
            </div>
        </v-flex>
    </v-layout>
</v-container>

<!-- called register page -->
<!-- <router-view></router-view> -->
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
        };
    },

    methods: {
        ...mapActions(["recommend_action"])
    },
    mounted: function () {
        window.scrollTo(0, 0);
        console.log("recommend");
        this.recommend_action().then(result => {
            console.log("picture data and recommend", result);
        });
    }
};
</script>

<style lang="css" scoped>
.fontStyle{
    font-family: Georgia, "meiryo", serif;
}
.category {
    width: 181px;
    height: 182px;
    margin: 4px;
    border: 1px solid #E0E0E0;
    background-color: #E0E0E0;
    float: left
}

.divSquare {
    width: 181px;
    height: 185px;
    margin: 4px;
    border: 1px solid white;
    background-color: white;
    float: left
}

.divSquare1 {
    width: 100%;
    height: 374px;
    margin: 4px;
    background-color:#82B1FF;
    float: left
}

.titleName {
    padding-left: 38px;
    font-size: 2.3rem;
    font-weight: 550;
}

.categoryName1 {
    padding: 75px 0 0 30px;
    font-size: 1.5rem;
    font-weight: 550;
}

.categoryName2 {
    padding: 5px 0 0 30px;
    font-size: 1.1rem;
    font-weight: 520;
}

.mainName {
    color: white;
    font-size: 1.6rem;
    font-weight: 600;
}

.subName {
    color: white;
    font-size: 1rem;
}
</style>
