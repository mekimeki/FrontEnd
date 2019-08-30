<template>
<v-container fluid pa-5 text-xs-center>
    <v-layout justify-center row wrap fill-height>
        <v-flex class="pa-1" v-for="card in cards" :key="card" v-bind="{ [`xs${card.flex}`]: true }" xs2 align-end>
            <v-card color="red lighten-1">
                <v-img v-on:click="click()" :src="card.src" height="200px"></v-img>

            </v-card>
        </v-flex>
        <v-flex class="pa-1" v-for="line in lines" :key="line" v-bind="{ [`xs${line.flex}`]: true }" xs2 align-end>
            <v-card color="blue lighten-1">
                <div class="py-5">{{ line.title }}</div>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            cards: [
                {
                    src: require(`@/assets/Card/나미.jpg`),
                    flex: 2
                },
                {
                    src: require(`@/assets/Card/루피.jpg`),
                    flex: 2
                },
                {
                    
                    src: require(`@/assets/Card/에이스.jpg`),
                    flex: 2
                },
                {
                    src: require(`@/assets/Card/조로.jpg`),
                    flex: 2
                },
                {
                    src: require(`@/assets/Card/상디.jpg`),
                    flex: 2
                },
                {
                    src: require(`@/assets/Card/쵸파.jpg`),
                    flex: 2
                },
            ],
            lines: [
                {
                    title: "에이스",
                    flex: 2
                },
                {
                    title: "조로",
                    flex: 2
                },
                {
                    title: "상디",
                    flex: 2
                },
                {
                    title: "쵸파",
                    flex: 2
                },
                {
                    title: "나미",
                    flex: 2
                },
                {
                    title: "루피",
                    flex: 2
                },
            ]
        }

    },
    methods : {
        click() {
            this.cards.src = "";
        }
    }
}

</script>
