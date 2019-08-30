<template lang="html">
<v-container class="fontStyle" white fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout white wrap row>

        <!-- modal of add files -->
        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <span>
                        <div class="subheading font-weight-black pt-5 pb-2 pl-4 ml-3" primary-title>
                            {{$t('allWord')['select']}}
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
                    </v-card-text>

                    <!-- select category -->
                    <v-layout wrap>
                        <v-flex pl-5 pr-3 pt-3 xs6 md6>
                            <v-select height="50px" sm4 v-model="lang" :items="items" :label="$t('allWord')['wordSelect']" outline></v-select>
                        </v-flex>
                        <v-flex pl-3 pr-5 pt-3 xs6 md6>
                            <v-select height="50px" sm4 v-model="category" :items="categories" :label="$t('allWord')['category']" outline></v-select>
                        </v-flex>
                        <v-flex pl-5 pb-2 xs6 md8>
                            <v-text-field v-model="albumNames" sm8 :label="$t('allWord')['wordName']" single-line outline></v-text-field>
                        </v-flex>
                        <!-- make album button -->
                        <v-flex xs6 pl-3 mt-2 pb-2 md4>
                            <v-icon large color="grey darken-3" @click="createAlbumQuest()">add</v-icon>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider>
                    <!-- confirm button -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog = false, box = false">
                            {{$t('allWord')['ok']}}
                        </v-btn>
                    </v-card-actions>

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
                            <v-btn depressed v-for="(menu,m) in menus" :key="(menu,m)" v-bind:value="menu.value" @click="allWord(m),submitButtonStyle()" color="#E0E0E0" class="stylebutton" large>{{$t('allWord')[menu.word]}}</v-btn>
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
                <v-checkbox v-model="selected" v-bind:value="dummyWord.id" @change="checked(i)" height="1px" v-if="box==true" color="grey darken-3"></v-checkbox>

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
                <div style="border:3px solid #7faaf2; border-radius:0;">
                    <v-layout pa-4 ma-2 row wrap>
                        <v-flex v-for="(dummyWord, i) in dummyWords" :key="(dummyWord, i)" v-bind="{ [`xs${flex}`]: true }" md2>
                            <div class="memorybutton" @click="memoryButtonStyle()" style="border:1px solid #BDBDBD; border-radius: 6px;">
                                <v-card-text style="padding: 1px">
                                    <v-layout justify-end>

                                        <!-- selected checked -->
                                        <v-checkbox v-model="selected" v-bind:value="dummyWord.id" @change="checked(i)" height="1px" v-if="box==true" color="grey darken-3"></v-checkbox>

                                        <!--start of like icon-->

                                        <!-- <v-icon v-else id="memorized" color="red accent-2" v-on:click.stop="changeHeart(i)">
                                        turned_in_not
                                    </v-icon> -->
                                    </v-layout>
                                </v-card-text>

                                <!--cards of words-->
                                <v-container fill-heights fluid pa-2>
                                    <v-layout fill-height>
                                        <v-flex xs12 flexbox>
                                            <!-- <v-icon color="red accent-2">
                                                turned_in
                                            </v-icon> -->
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
import {
    mapActions
} from "vuex";

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
                    word: "memorizedWord",
                    value: "memory"
                },
                {
                    word: "memorizeNotWord",
                    value: "unmemory"
                }
            ],
            dummyWords: [{
                    word: "air",
                },
                {
                    word: "baord",
                },
                {
                    word: "boat",
                },
                {
                    word: "casting",
                },
                {
                    word: "chair",
                },
                {
                    word: "check",
                },
                {
                    word: "computer",
                },
                {
                    word: "crazy",
                },
                {
                    word: "good",
                },
                {
                    word: "mark",
                },
                {
                    word: "memory",
                },
                {
                    word: "mic",
                },
                {
                    word: "mouse",
                },
                {
                    word: "movie",
                },
                {
                    word: "page",
                },
                {
                    word: "realm",
                },
                {
                    word: "star",
                },
                {
                    word: "study",
                },
                {
                    word: "table",
                },
                {
                    word: "think",
                },
                {
                    word: "us",
                },
                {
                    word: "window",
                },
                {
                    word: "flower",
                },
                {
                    word: "paradox",
                },
                {
                    word: "complete",
                },
                {
                    word: "suggest",
                },
                {
                    word: "terminal",
                },
            ],
            books: [],
            words: [],
            flex: 6,
            box: false,
            selected: [],
            selectWords: [],
            toggle: false,
            bottomNav: "all",
            //albumNums: [],
            albumNames: "",
            dialog: false,
            items: ["日本語", "英語", "韓国語", "中国語"],
            categories: ["アクション", "ファンタジー", "SF", "コメディ", "メロ", "アニメ"],
            lang: "",
            category: "",
            crawl: false,
            crawlWords: [],
            crawlMeans: [],
            mainWord: "",
            tableId: 0
        };
    },
    methods: {
        ...mapActions([
            "select_word_actions",
            "classify_word_actions",
            "update_word_actions",
            "all_word_actions",
            "word_delete_actions",
            "word_crawl_actions",
            "call_album_actions"
        ]),
        submitButtonStyle() {
            document.getElementsByClassName("stylebutton")[1].style.backgroundColor = "#7faaf2";
            document.getElementsByClassName("stylebutton")[1].style.border = "2px solid #7faaf2";
        },
        memoryButtonStyle() {
            document.getElementsByClassName("memorybutton")[0].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[3].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[5].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[8].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[11].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[15].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[17].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[18].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[19].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[22].style.boxShadow = "0px 0px 5px 5px #64B5F6";
            document.getElementsByClassName("memorybutton")[24].style.boxShadow = "0px 0px 5px 5px #64B5F6";
        },
        //  start of 단어 출력 및 분류
        wordQuest(changeID, flag) {
            this.update_word_actions([changeID, flag])
                .then(result => {
                    return true;
                })
                .catch(error => {
                    return false;
                });
        },
        allWord(m) {
            this.all_word_actions(m).then(result => {
                this.words = result;
                this.selected = [];
            });
        },
        changeHeart(i) {
            console.log(this.words[i].memorized);
            if (this.words[i].memorized == "T") {
                this.wordQuest(this.words[i].id, "F");
                this.words[i].memorized = "F";
            } else {
                this.wordQuest(this.words[i].id, "T");
                this.words[i].memorized = "T";
            }
        },
        classifyQuest(classifyWord = "") {
            this.classify_word_actions(classifyWord)
                .then(result => {
                    this.words = result;
                    this.selected = [];
                })
                .catch(error => {
                    console.log("classify failed", error);
                });
        },
        //  start of 단어장 목록 보기 및 단어장에 단어추가
        plus(table) {
            this.books.push({
                title: this.albumNames,
                id: table
            });
            this.albumNames = "";
            console.log("bookssss ", this.books);
        },
        createAlbumQuest() {
            this.call_album_actions([this.albumNames, this.lang, this.selectWords])
                .then(result => {
                    console.log("result.data", result);
                    this.plus(result);
                    return true;
                })
                .catch(error => {
                    return false;
                });
            this.selected = [];
            this.selectWords = [];
            this.lang = "";
            this.category = "";
        },
        selectedWordsQuest(i) {
            var add = this.books[i].id;
            this.select_word_actions(add).then(result => {
                this.words = result;
            }).catch(error => {
                return false;
            })
            this.selected = [];
            this.selectWords = [];
        },

        //  start of 체크박스 선택 및 삭제 요청
        checked(po) {
            if (this.selected.length == this.words.length) {
                this.toggle = true;
            } else {
                this.toggle = false;
            }
            let idx = this.selectWords.indexOf(this.words[po].word);
            if (idx < 0) {
                this.selectWords.push(this.words[po].word);
            } else {
                this.selectWords.splice(idx, 1);
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
                    alert("削除されました。");
                    this.box = false;
                    this.selected = [];
                }
            }
        },
        toggleAll() {
            if (this.selected.length == this.words.length) {
                this.selected = [];
                this.selectWords = [];
            } else {
                this.selected = this.words.slice().map(x => {
                    return x.id;
                });
                this.selectWords = this.words.slice().map(x => {
                    return x.word;
                });
            }
        },
        deleteQuest() {
            this.word_delete_actions(this.selected)
                .then(result => {
                    console.log("delete success", result);
                    this.words = result;
                    this.selected = [];
                })
                .catch(error => {
                    console.log("delete failed", error);
                });
        },
        crawlingQuest(cword) {
            this.word_crawl_actions(cword)
                .then(result => {
                    this.crawlWords = result.example;
                    this.crawlMeans = result.means;
                    this.mainWord = cword;
                })
                .catch(error => {
                    console.log("crawling failed");
                });
        }
    },

    beforeCreate() {
        var baseURI = "https://mekimekigogo.com/api/book/0";
        // 172.26.3.30
        // 192.168.43.142
        axios
            .get(baseURI)
            .then(res => {
                this.words = res.data;
                console.log("ok", this.words);
            })
            .catch(error => {
                console.log("failed", error);
            });
        baseURI = "https://mekimekigogo.com/api/books";
        axios
            .get(baseURI)
            .then(res => {
                this.books = res.data;
                console.log("okk", this.books);
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

.fontStyle {
    font-family: Georgia, "meiryo", serif;
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
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

#wordCard {
    text-align: center;
    height: 59px;
    font-size: 2rem;
    font-weight: 600;
}
</style>
