<template>
<v-layout id="fontStyle" row justify-center>
    <v-btn flat v-on:click.stop="dialog = true" small class="subheading font-weight-bold">{{$t('quiz')['start']}}</v-btn>
    <v-dialog v-model="dialog" max-width="700">
        <v-tabs v-model="active" color="blue accent-1" dark slider-color="white">
            <v-tab v-for="n in 7" :key="n">{{ n-1 }}</v-tab>
            <v-tab-item v-for="n in 7" :key="n">
                <v-card justify-center height="640">
                    <v-card v-if="n<7" flat>
                        <v-card-text v-if="n==1">
                            <div class="headName py-3 pl-5">{{$t('quiz')['solution']}}</div>
                            <div class="mx-5 pb-3">
                                <v-img :src="require(`@/assets/Quiz/quiz1(jp).png`)" contain></v-img>
                            </div>
                            <div class="headName pt-3 px-5">{{ $t('quiz')[head] }}</div>
                        </v-card-text>

                        <v-card-text v-if="n>=2">
                            <div class="problem pt-3 pl-3">{{ (n-1) + $t('quiz')[text] }}</div>
                            <div class="pb-3 pt-4"></div>
                            <div class="exampleUp mx-3 py-5 mb-4">
                                <div class="pt-4 mt-5"></div>
                                <span class="example px-4 pb-2 pt-5 mt-3" v-for="question in questions[n-2]" :key="question">{{ question }}</span>
                            </div>
                        </v-card-text>

                        <v-layout pb-3>
                            <v-flex v-if="n>=2" xs3 sm12>
                                <v-layout justify-space-around row wrap>
                                    <v-flex v-for="i in 4" :key="i" md5>
                                        <v-btn large block color="blue accent-1 title font-weight-bold" v-on:click="select=(n-1)" value="check">{{ i + ". " + example[n-2][i-1]}}</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>

                    <v-card v-if="n==7" flat>
                        <div class="result py-5">{{ $t('quiz')[end] }}</div>
                        <div v-for="(i,t) in result" :key="(i,t)">
                            <div class="pt-5 pl-4 resultPage">
                                <div class="resultPro pl-5 ml-5 pb-2">{{$t('quiz')['question']}} {{ t+1 }}</div>
                                <div class="resultSee pl-5 ml-5">{{$t('quiz')['quizSelect']}} : {{ i[0] }}</div>
                                <div class="resultSee pl-5 ml-5">{{$t('quiz')['quizSolution']}} : {{ i[0] }}</div>
                                <div class="resultScore pl-5 pb-4 ml-5">{{$t('quiz')['result']}} : O</div>
                            </div>
                        </div>

                    </v-card>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn v-if="1<n&&n<6" color="red lighten-1" flat="flat" v-on:click="next(), getQuest(), checkAns()">
                            <div class="buttonClick">NEXT</div>
                        </v-btn>
                        <v-btn v-if="n==1" color="red lighten-1" flat="flat" v-on:click="next(), getQuest()">
                            <div class="pb-3 buttonClick">NEXT</div>
                        </v-btn>
                        <v-btn v-if="n==6" color="red lighten-1" flat="flat" v-on:click="next(),checkAns()">
                            <div class="buttonClick">NEXT</div>
                        </v-btn>
                        <div class="buttonClick pt-5 mt-5" v-if="n==7" color="red" flat="flat" v-on:click.stop="dialog = false, postQuest()">

                            <v-layout class="pt-5 mt-5">
                                <div class="pt-5 mt-5">
                                    <div class="pt-5 mt-5 pr-3">
                                        <div class="pt-3 mt-5 pr-3">{{ close }}</div>
                                    </div>
                                </div>
                            </v-layout>

                        </div>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-dialog>
</v-layout>
</template>

<script>
import axios from "axios";
import {
    constants
} from "crypto";
import {
    mapActions
} from 'vuex';
// import { lookup } from 'dns';
export default {
    data() {
        return {
            active: null,
            dialog: false,
            head: "explain",
            text: "select",
            close: "close",
            end: "result",
            example: [
                ["star", "entertainment", "lady", "explain"],
                ["experience", "playground", "cloth", "stupid"],
                ["us", "play", "complex", "hard"],
                ["class", "board", "active", "table"],
                ["soccer", "nervous", "mouse", "gentle"]
            ],
            questions: [
                ['엔터테인먼트', '연예', '오락', '즐거움', '여흥'],
                ['천', '옷감', '직물', '걸레', '식탁보'],
                ['우리', '미국', '말한 바와 같이'],
                ['테이블', '식타용의', '식탁', '탁자', '표'],
                ['마우스', '쥐', '생쥐']
            ],
            answer: 0,
            select: 99,
            result: [
                ['2'],
                ['3'],
                ['1'],
                ['4'],
                ['3']
            ],
            score: 0,
            ran_box: []
        };
    },
    methods: {
        // ...mapActions(['quest_actions', 'quest_post_actions']),
        next() {
            const active = parseInt(this.active);
            this.active = active < 6 ? active + 1 : 0;
        },
        // getQuest() {
        //     console.log("check box ", this.ran_box);
        //     this.quest_actions(this.ran_box).then(result => {
        //         const back = result;
        //         this.example = back.choice;
        //         this.questions = back.ques;
        //         this.answer = back.ans;
        //         this.ran_box = back.ran_box;
        //         console.log('quiz quest sucesdddddddddddddddddds', result);
        //         console.log('quiz quest error', this.ran_box);
        //     }).catch(error => {
        //         console.log('quiz quest error', error);
        //     });
        // },
        // postQuest() {
        //     this.quest_post_actions([this.score, "123@gmail.com"]).then(result => {
        //         console.log("response", result);
        //     }).catch(error => {
        //         console.log('failed', error);
        //     });
        // },
        // checkAns() {
        //     if (this.select == this.answer) {
        //         this.result.push([this.select + 1, this.answer + 1, "O"]);
        //         this.score = this.score + 20;
        //     } else this.result.push([this.select + 1, this.answer + 1, "X"]);

        //     console.log(this.select);
        //     console.log(this.result);
        //     console.log(this.answer);
        // }
    }
};
</script>

<style>
#fontStyle {
    font-family: Georgia, "meiryo", serif;
}

.buttonClick {
    cursor: pointer;
}

.resultPage {
    display: inline;
    float: left;
    width: 200px;
}

.resultPro {
    font-size: 1.3rem;
    font-weight: 600;
}

.resultSee {
    font-size: 1.3rem;
    font-weight: 600;
}

.resultScore {
    font-size: 1.3rem;
    font-weight: 600;
    color: rgba(238, 58, 58, 0.89);
}

.buttonClick {
    color: red;
    font-size: 1.3rem;
    font-weight: 600;
}

.headName {
    color: black;
    font-size: 1.3rem;
    font-weight: 600;
}

.problem {
    color: black;
    font-size: 1.3rem;
    font-weight: 600;
}

.example {
    color: black;
    font-size: 1.8rem;
    font-weight: 600;
}

.exampleUp {
    background-color: white;
    border-radius: 10px 10px 10px 10px;
    border: 3px solid #82B1FF;
    height: 300px;
    text-align: center;
}

.result {
    color: black;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
}
</style>
