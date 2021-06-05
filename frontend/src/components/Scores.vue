<template>
    <div>
        <div class="scores" v-show="showScoreBool">
            words per minute: <span class="wpm"> {{ wordsPerMinute }}WPM</span>
            accuracy: <span class="accuracy"> {{ accuracy }}%</span>
        </div>
    </div>

</template>
<script>

export default {
    name: 'Scores',
    props: ['wordsPerMinute','accuracy','showScoreBool'],
}
</script>
<style lang="scss">
@import '../scss/variables';

.scores{
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translate(-50%,-50%);
}

</style>