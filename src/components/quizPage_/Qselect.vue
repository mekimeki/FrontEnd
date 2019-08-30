<template lang="html">
<v-container class="fontStyle">
    <v-layout justify-center>
        <v-flex class="pt-5" xs12 sm12 md12 text-xs-center>
            <v-container class="pt-5" grid-list-xl text-xs-center>
                <div class="quizBox">
                    <span class="mainName pt-3">
                        <div class="pt-3 pb-3">{{$t('quiz')['test']}}</div>
                    </span>
                    <v-layout fill-height>
                        <v-flex xs12 align-center flexbox>
                            <v-card flat justify-center>
                                <span class="subName">
                                    <div v-for="name in names" :key="name" class="pt-1">
                                        {{$t('quiz')[name.text]}}
                                      </div>
                                </span>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </div>
            </v-container>

            <v-container fluid grid-list-md>
                <v-layout justify-center row wrap>
                    <v-flex v-for="card in cards" :key="card.title" v-bind="{ [`xs${card.flex}`]: true }">
                        <v-flex xs12 align-end flexbox>

                        </v-flex>
                        <v-card>
                            <span>
                                <div class="example pt-3 pb-3">{{$t('quiz')[card.title]}}</div>
                            </span>
                            <v-img :src="card.src" height="200px">
                                <v-container fill-height fluid pa-2>
                                    <v-layout fill-height>

                                    </v-layout>
                                </v-container>
                            </v-img>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <quizOne_></quizOne_>
                                <v-spacer></v-spacer>
                            </v-card-actions>

                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import quizOne_ from "@/components/quizPage_/QuizOne";
export default {
    components: {
        quizOne_
    },
    data: () => ({
        cards: [{
                title: "wordMean",
                src: require(`@/assets/Quiz/select1.png`),
                flex: 2
            },
            {
                title: "mean",
                src: require(`@/assets/Quiz/select2.png`),
                flex: 2
            },
            {
                title: "sayMean",
                src: require(`@/assets/Quiz/select3.png`),
                flex: 2
            },
            {
                title: "card",
                src: require(`@/assets/Quiz/select4.png`),
                flex: 2
            },
        ],
        names: [{
                text: "first"
            },
            {
                text: "second"
            },
            {
                text: "third"
            }
        ]
    })
};
</script>

<style lang="css" scoped>
.fontStyle {
    font-family: Georgia, "meiryo", serif;
}

.mainName {
    color: black;
    font-size: 2.9rem;
    font-weight: 550;
}

.subName {
    color: black;
    font-size: 1.4rem;
    font-weight: 200;
}

.example {
    color: black;
    font-size: 1.65rem;
    font-weight: 550;
}
</style>
