<template lang="html">
<v-container class="fontStyle"　white fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout white wrap row>

        <!-- modal of add files -->
        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-img class="albumImage" :src="dummyWords[0]">
                    </v-img>
                    <div id="wordCard" class="pt-2">{{ dummyWords[0].word }}</div>
                    <!-- <span>
                        <div class="subheading font-weight-black pt-5 pb-2 pl-4 ml-3" primary-title>
                            저장할 단어장을 선택해 주세요.
                        </div>
                    </span>
                    <v-card-text>
                        <v-flex pl-3 ml-2>
                            <ul>
                                <div v-for="book in books" :key="book">
                                    <li class="subheading font-weight-black">
                                        <v-btn class="subheading" flat>{{ book.title }}</v-btn>
                                    </li>
                                </div>
                            </ul>
                        </v-flex>
                    </v-card-text> -->

                    <!-- select category -->
                    <!-- <v-layout wrap>
                        <v-flex pl-5 pr-3 pt-3 xs6 md6>
                            <v-select height="50px" sm4 v-model="lang" :items="items" label="언어 선택" outline></v-select>
                        </v-flex>
                        <v-flex pl-3 pr-5 pt-3 xs6 md6>
                            <v-select height="50px" sm4 v-model="category" :items="categories" label="카테고리" outline></v-select>
                        </v-flex>
                        <v-flex pl-5 pb-2 xs6 md8>
                            <v-text-field v-model="albumNames" sm8 label="단어장 명" single-line outline></v-text-field>
                        </v-flex>
                        <!-- make album button -->
                    <!-- <v-flex xs6 pl-3 mt-2 pb-2 md4>
                            <v-icon large color="grey darken-3" @click="createAlbumQuest()">add</v-icon>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider> -->
                    <!-- confirm button -->
                    <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog = false, box = false">
                            확인
                        </v-btn>
                    </v-card-actions> -->

                </v-card>
            </v-dialog>
        </div>

        <!-- modal of words crawling -->
        <div class="text-xs-center">
            <v-dialog v-model="crawl" width="1020">
                <v-card color="light-blue lighten-3">
                    <v-container fill-heights fluid pa-3 text-xs-left>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>

                                <v-card flat color="white">
                                    <div class="mainWord px-3 py-4 ml-3">{{ mainWord }}</div>
                                </v-card>

                                <v-card flat color="white">
                                    <span v-for="(crawlMean, a) in crawlMeans" :key="(crawlMean, a)" flat color="white" class="pl-2">
                                        <span class="crawlMean pl-4">{{ crawlMean }}</span>
                                    </span>
                                </v-card>

                                <div class="pt-3" style="background-color:white;"></div>

                                <v-card v-for="(crawlWord, i) in crawlWords" :key="(crawlWord, i)" flat color="white">
                                    <span v-if="i%2==0">
                                        <div class="py-2"></div>
                                    </span>
                                    <div class="crawlWord pl-4 ml-2">{{ crawlWord }}</div>
                                    <span v-if="i==9">
                                        <div class="py-2"></div>
                                    </span>
                                </v-card>

                                <div class="pt-3" style="background-color:white;"></div>

                            </v-flex>
                        </v-layout>
                    </v-container>
                    <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="crawl = false">
                            click
                        </v-btn>

                    </v-card-actions>-->
                </v-card>
            </v-dialog>
        </div>

        <!--select of words-->
        <!-- <v-flex justify-start white xs12 sm12 md12>
            <v-toolbar-items>
                <v-bottom-nav :active.sync="bottomNav" :value="true" color="white">
                    <v-btn></v-btn>
                    <v-btn color="blue" flat v-for="(menu,m) in menus" :key="(menu,m)" v-bind:value="menu.value" @click="allWord(m)">{{menu.word}}</v-btn>
                    <v-btn color="blue" flat v-for="(book,i) in books" :key="(book,i)" v-bind:value="book.id" @click="selectedWordsQuest(i)">{{book.title}}</v-btn>
                    <v-btn></v-btn>
                </v-bottom-nav>
            </v-toolbar-items>
        </v-flex> -->

        <!--words button-->
        <v-flex lg12 sm12 xs2 row wrap>
            <v-container fluid grid-list-md white>
                <v-layout pa-0 ma-0 v-model="box" justify-end>
                    <v-flex pa-0 ma-0 justify-start white xs12 sm12 md12>
                        <div style="margin: 0;">
                            <v-btn depressed v-for="(menu,m) in menus" :key="(menu,m)" v-bind:value="menu.value" @click="allWord(m),submitButtonStyle()" color="#E0E0E0" class="stylebutton" large>{{$t('snapWord')[menu.word]}}</v-btn>
                            <v-btn color="gray" v-for="(book,i) in books" :key="(book,i)" v-bind:value="book.id" @click="selectedWordsQuest(i)">{{book.title}}</v-btn>
                        </div>
                    </v-flex>

                    <!-- selected all checked -->
                    <v-checkbox v-bind:value="toggle" @change="toggleAll()" v-if="box==true" color="grey darken-3">
                    </v-checkbox>
                    <v-icon color="grey darken-1" v-on:click="click('c')" large>playlist_add</v-icon>
                    <v-icon color="grey darken-1" v-on:click="click('d')" medium>delete</v-icon>
                </v-layout>
                <!-- <v-layout justify-center row wrap>
                    <v-flex v-for="(word, i) in words" :key="(word, i)" v-bind="{ [`xs${flex}`]: true }" md2>
                        <v-card color="light-blue lighten-3">
                            <v-card-text style="padding: 5px 10px">
                                <v-layout justify-end> -->

                <!-- selected checked -->
                <!-- <v-checkbox v-model="selected" v-bind:value="word.id" @change="checked(i)" height="1px" v-if="box==true" color="grey darken-3"></v-checkbox> -->

                <!--start of like icon-->
                <!-- <v-icon v-if="word.memorized=='T'" id="memorized" color="red accent-2" v-on:click.stop="changeHeart(i)">
                                        turned_in
                                    </v-icon>
                                    <v-icon v-else id="memorized" color="red accent-2" v-on:click.stop="changeHeart(i)">
                                        turned_in_not
                                    </v-icon>
                                </v-layout>
                            </v-card-text> -->

                <!--cards of words-->
                <!-- <v-container fill-heights fluid pa-2 text-xs-center>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <v-card @click="crawlingQuest(word.word), crawl = true" class="dark--text" color="whtie">
                                            <div style="text-align:center; height:59px;" class="title pt-3">{{ word.word }}</div>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout> -->
                <div class="allBox">
                    <v-layout pa-4 ma-2 row wrap>
                        <v-flex v-for="(dummyWord, i) in dummyWords" :key="(dummyWord, i)" v-bind="{ [`xs${flex}`]: true }" md2>
                            <div class="memorybutton" @click="memoryButtonStyle()" style="border:1px solid white; border-radius: 6px;">
                                <!-- <v-card-text style="padding: 1px">
                                    <v-layout justify-end> -->

                                <!-- selected checked -->
                                <v-checkbox v-model="selected" v-bind:value="word.id" @change="checked(i)" height="1px" v-if="box==true" color="grey darken-3"></v-checkbox>

                                <!--start of like icon-->

                                <!-- <v-icon v-else id="memorized" color="red accent-2" v-on:click.stop="changeHeart(i)">
                                        turned_in_not
                                    </v-icon> -->
                                <!-- </v-layout>
                                </v-card-text> -->

                                <!--cards of words-->
                                <v-container fill-heights fluid pa-2>
                                    <v-layout fill-height>
                                        <v-flex xs12 flexbox>
                                            <v-img @click="dialog = true" class="albumImage" :src="dummyWord.src" height="200px">
                                            </v-img>
                                            <div id="wordCard" class="pt-2">{{ dummyWord.word }}</div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </v-container>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import axios from "axios";
import {
    constants
} from "crypto";

//  wordQuest => 단어 미암기 변환
//  allWord => 전체단어, 미암기단어, 암기단어 호출
//  changeHeart => 암기, 미암기 단어 구분
//  classifyQuest => 전체단어, 미암기단어, 암기단어 분류 요청

//  callAlbumQuest => 단어장 목록 부르기
//  plus => 모달창의 단어장 목록 추가
//  createAlbumQuest => 단어장 추가 요청
//  addWordsQuest => 단어장 선택 후 단어 추가

//  checked => 체크박스 전체선택시 윗부분 체크박스 선택
//  click => 체크박스 보이는 여부
//  toggleAll => 체크박스 선택후 비우는 부분(?)
//  deleteQuest => 단어 삭제 요청

//  crawlingPage => 자세히보기 페이지

export default {
    data() {
        return {
            menus: [{
                    word: "allSubtitle",
                    value: "all"
                },
                {
                    word: "business",
                },
                {
                    word: "saySubtitle",
                }
            ],
            dummyWords: [{
                    word: "I love you",
                    src: require(`@/assets/Album/album1.jpg`),

                },
                {
                    word: "Stay with me",
                    src: require(`@/assets/Album/album2.jpg`),

                },
                {
                    word: "I think about him",
                    src: require(`@/assets/Album/album3.jpg`),

                },
                {
                    word: "Happybirthday",
                    src: require(`@/assets/Album/album4.jpg`),

                },
                {
                    word: "This is destiny",
                    src: require(`@/assets/Album/album5.jpg`),

                },
                {
                    word: "I feeling you",
                    src: require(`@/assets/Album/album6.jpg`),

                },
                {
                    word: "Fly to the sky",
                    src: require(`@/assets/Album/album7.jpg`),

                },
                {
                    word: "I'm iron man",
                    src: require(`@/assets/Album/album8.jpg`),
                },
                {
                    word: "Definition is end",
                    src: require(`@/assets/Album/album9.jpg`),

                },
                {
                    word: "I love you",
                    src: require(`@/assets/Album/album1.jpg`),

                },
                {
                    word: "Stay with me",
                    src: require(`@/assets/Album/album2.jpg`),

                },
                {
                    word: "I think about him",
                    src: require(`@/assets/Album/album3.jpg`),

                },
                {
                    word: "Happybirthday",
                    src: require(`@/assets/Album/album4.jpg`),

                },
                {
                    word: "This is destiny",
                    src: require(`@/assets/Album/album5.jpg`),

                },
                {
                    word: "I feeling you",
                    src: require(`@/assets/Album/album6.jpg`),

                },
                {
                    word: "Fly to the sky",
                    src: require(`@/assets/Album/album7.jpg`),

                },
                {
                    word: "I'm iron man",
                    src: require(`@/assets/Album/album8.jpg`),
                },
                {
                    word: "Definition is end",
                    src: require(`@/assets/Album/album9.jpg`),

                },
            ],
            books: [],
            lines: [],
            flex: 6,
            box: false,
            selected: [],
            selectWords: [],
            selectExplains: [],
            imgAdd: [],
            startData: [],
            videoId: [],
            toggle: false,
            bottomNav: "all",
            //albumNums: [],
            albumNames: "",
            dialog: false,
            items: ["일본어", "영어", "한국어", "중국어"],
            categories: ["판타지", "SF", "공포", "스릴러", "코미디", "멜로"],
            lang: "",
            category: "",
            crawl: false,
            crawlWords: [],
            crawlMeans: [],
            mainWord: "",
            selectNumber: 0
        };
    },
    methods: {
        submitButtonStyle() {
            document.getElementsByClassName("stylebutton")[0].style.backgroundColor = "#7faaf2";
            document.getElementsByClassName("stylebutton")[0].style.border = "2px solid #7faaf2";
        },
        memoryButtonStyle() {
            document.getElementsByClassName("memorybutton")[0].style.boxShadow = "0px 0px 5px 5px #BBDEFB";
        },
        //  start of 단어 출력 및 분류
        wordQuest(changeID, flag) {
            const baseURI = "http://13.209.125.223/api/update";
            const form = new FormData();
            form.append("id", changeID);
            form.append("flag", flag);
            axios
                .post(baseURI, form)
                .then(res => {
                    console.log("ok", res);
                    return true;
                })
                .catch(error => {
                    console.log("failed", error);
                    return false;
                });
        },
        allWord() {
            var baseURI = "http://13.209.125.223/api/line/0";

            axios
                .get(baseURI)
                .then(res => {
                    this.lines = res.data;
                    console.log("ok", res);
                    this.selected = [];
                })
                .catch(error => {
                    console.log("failed", error);
                });
        },
        // changeHeart(i) {
        //     console.log(this.lines[i].memorized);
        //     if (this.lines[i].memorized == "T") {
        //         this.wordQuest(this.lines[i].id, "F")
        //         this.lines[i].memorized = "F";
        //     } else {
        //         this.wordQuest(this.lines[i].id, "T")
        //         this.lines[i].memorized = "T";
        //     }
        // },
        classifyQuest(classifyWord = "") {
            var form = new FormData();
            const baseURI = "http://13.209.125.223/api/book/0";
            form.append("classifyWord", classifyWord);
            axios
                .get(baseURI, form)
                .then(res => {
                    this.lines = res.data;
                    console.log("ok", this.lines);
                    this.selected = [];
                })
                .catch(error => {
                    console.log("failed", error);
                });
        },

        //  start of 단어장 목록 보기 및 단어장에 단어추가
        plus(table) {
            this.books.push({
                title: this.albumNames,
                id: table
            });
            this.albumNames = "";
            console.log(this.books);
        },
        createAlbumQuest() {
            const baseURI = "http://13.209.125.223/api/createLine";
            const form = new FormData();
            form.append("title", this.albumNames);
            form.append("lang", this.lang);
            form.append("lines[]", this.selectWords);
            form.append("explains[]", this.selectExplains);
            form.append("pic_adds[]", this.imgAdd);
            form.append("start_dts[]", this.startData);
            form.append("v_ids[]", this.videoId);
            console.log("success of make albums", this.selectWords);
            axios
                .post(baseURI, form)
                .then(res => {
                    console.log("ok", res);
                    this.plus(res.data);
                    return true;
                })
                .catch(error => {
                    console.log("failed", error);
                    return false;
                });
            this.selected = [];
            this.selectWords = [];
            this.selectExplains = [];
            this.imgAdd = [];
            this.startData = [];
            this.videoId = [];
            this.lang = "";
            this.category = "";
        },
        selectedWordsQuest(i) {
            const baseURI = "http://13.209.125.223/api/line/" + this.books[i].id;
            axios
                .get(baseURI)
                .then(res => {
                    console.log("select ok", res);
                    this.lines = res.data;
                })
                .catch(error => {
                    console.log("failed", error);
                    return false;
                });
            this.selected = [];
            this.selectWords = [];
        },

        //  start of 체크박스 선택 및 삭제 요청
        checked(po) {
            if (this.selected.length == this.lines.length) {
                this.toggle = true;
            } else {
                this.toggle = false;
            }
            let idx = this.selectWords.indexOf(this.lines[po].line);
            let idy = this.selectExplains.indexOf(this.lines[po].explain);
            let idz = this.imgAdd.indexOf(this.lines[po].pic_add);
            let ida = this.startData.indexOf(this.lines[po].start_dt);
            let idb = this.videoId.indexOf(this.lines[po].v_id);

            if (idx < 0) {
                this.selectWords.push(this.lines[po].line);
                this.selectExplains.push(this.lines[po].explain);
                this.imgAdd.push(this.lines[po].pic_add);
                this.startData.push(this.lines[po].start_dt);
                this.videoId.push(this.lines[po].v_id);

                console.log("선택ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ", this.selectWords);
            } else {
                this.selectWords.splice(idx, 1);
                this.selectExplains.splice(idy, 1);
                this.imgAdd.splice(idz, 1);
                this.startData.splice(ida, 1);
                this.videoId.splice(idb, 1);
            }

            console.log(this.selected);
        },
        click(flag) {
            if (this.box == false) {
                this.box = true;
            } else {
                if (flag == "c") {
                    this.dialog = true;
                } else {
                    this.deleteQuest();
                    alert("삭제되었습니다");
                    this.box = false;
                    this.selected = [];
                }
            }
        },
        toggleAll() {
            if (this.selected.length == this.lines.length) {
                this.selected = [];
                this.selectWords = [];
            } else {
                this.selected = this.lines.slice().map(x => {
                    return x.id;
                });
                this.selectWords = this.lines.slice().map(x => {
                    return x.word;
                });
            }
        },
        deleteQuest() {
            var form = new FormData();
            form.append("selected", this.selected);
            axios.get("http://13.209.125.223/get-token").then(response => {
                if (response.data) {
                    form.append("_token", response.data);
                    console.log(this.selected);
                    axios
                        .post("http://13.209.125.223/api/deletedLine", form)
                        .then(response => {
                            console.log("response ==>>>> ", response.data);
                            this.lines = response.data;
                            this.selected = [];
                        })
                        .catch(error => {
                            console.log("failed", error);
                        });
                }
            });
        },

        crawlingQuest(cword) {
            var form = new FormData();
            form.append("clickWord", cword);
            console.log(cword);
            var baseURI = "http://13.209.125.223/api/example";
            axios
                .post(baseURI, form)
                .then(res => {
                    console.log("crawling ok", res);
                    this.crawlWords = res.data.example;
                    this.crawlMeans = res.data.means;
                    this.mainWord = cword;
                    console.log("crawling word ok", this.crawlMeans[0]);
                })
                .catch(error => {
                    console.log("failed", error);
                });
        },
        changeNumber(i) {
            this.selectNumber = i;
        }
    },

    beforeCreate() {
        var baseURI = "http://13.209.125.223/api/line/0";
        axios
            .get(baseURI)
            .then(res => {
                this.lines = res.data;
                console.log("beforeCreate OK", this.lines);
            })
            .catch(error => {
                console.log("failed", error);
            });
        baseURI = "http://13.209.125.223/api/lineBook";
        axios
            .get(baseURI)
            .then(res => {
                this.books = res.data;
                console.log("okkkkkkkkkkkkk", this.books);
            })
            .catch(error => {
                console.log("failed", error);
            });
    }
};
</script>

<style lang="css" scoped>
#memorized {
    cursor: pointer;
}

.fontStyle{
    font-family: Georgia, "meiryo", serif;
}

.allBox {
    border-radius: 0;
    border-top: 3px solid #7faaf2;
    border-bottom: white;
    border-right: white;
    border-left: white;
}

.albumImage {
    border-radius: 10px 10px 0 0;
}

.mainWord {
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
}

.crawlMean {
    font-size: 1.3rem;
    font-weight: 600;
}

.crawlWord {
    font-size: 1.2rem;
    font-weight: 600;
}

.stylebutton {
    margin: 0;
    border: 2px solid #7faaf2;
    color: #424242;
    border-radius: 15px 15px 0 0;
}

#wordCard {
    text-align: center;
    height: 50px;
    font-size: 1.4rem;
    font-weight: 600;
    border: 1px solid rgb(182, 181, 181);
    border-radius: 0 0 10px 10px;
}
</style>
