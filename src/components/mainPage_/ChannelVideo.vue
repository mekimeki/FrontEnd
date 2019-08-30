<template>
<v-container class="fontStyle" pa-5>
    <span class="mainName pl-4">{{$t('recommand')['advice']}}</span>
    <span class="pl-3 pt-1 mt-3">{{$t('myPage')['video']}} > {{$t('recommand')['mellow']}}</span>
    <v-layout wrap row fill-height>
        <v-flex class="px-1 py-4 pt-5" v-for="(name,i) in names" :key="(name,i)" xs12 sm4 md2 flexbox>
            <v-card router :to="{name:'v-video'}" color="white" flat>
                <v-img :src="name.src" aspect-ratio="1.5"></v-img>
                <div>
                    <p class="videoTitle mt-2 mb-1">{{ name.title }}</p>
                    <span class="mr-3">345{{$t('myPage')['count']}}</span>
                    <span>{{$t('myPage')['ok_']}}1256</span>
                    <p class="mb-0">2019.05.03</p>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            names: [{
                    title: "愛されてる女性",
                    src: require(`@/assets/Album/album5.jpg`)
                },
                {
                    title: "可愛いから",
                    src: require(`@/assets/Album/album2.jpg`)
                },
                {
                    title: "見れば見るほど悲しい",
                    src: require(`@/assets/Album/album3.jpg`)
                },
                {
                    title: "ラブソング",
                    src: require(`@/assets/Album/album4.jpg`)
                },
                {
                    title: "僕らの幸せな時間",
                    src: require(`@/assets/Album/album1.jpg`)
                },
                {
                    title: "アメリカだけ見えること",
                    src: require(`@/assets/Album/album7.jpg`)
                },
                {
                    title: "愛してますっていう言葉",
                    src: require(`@/assets/Album/album8.jpg`)
                },
                {
                    title: "レモンは甘い",
                    src: require(`@/assets/Album/album9.jpg`)
                },
                {
                    title: "私の初告白",
                    src: require(`@/assets/Poster/21.jpg`)
                },
                {
                    title: "女性たちのパーティー",
                    src: require(`@/assets/Poster/13.jpg`)
                },
                {
                    title: "過去1、結婚式",
                    src: require(`@/assets/Poster/11.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/10.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/17.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/16.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/15.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/4.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/7.jpg`)
                },
                {
                    title: "「お元気ですか」",
                    src: require(`@/assets/Poster/18.jpg`)
                },
            ]
        };
    }
};
</script>

<style>
.fontStyle {
    font-family: Georgia, "meiryo", serif;
}

.videoTitle {
    color: black;
    font-size: 1.3rem;
    font-weight: 550;
}

.mainName {
    color: black;
    font-size: 1.8rem;
    font-weight: 550;
}
</style>
