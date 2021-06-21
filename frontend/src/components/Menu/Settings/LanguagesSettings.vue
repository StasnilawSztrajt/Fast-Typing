<template>
    <div class="langS settings">
        <h1 class="lang-h1">Languages</h1>
        <div class="languages" >
            <div
                v-for="(lang,index) in languagesArray"
                :key="index"
                class="lang button"
                @click="changeLanguage(lang.json)"
                >
                {{ lang.lang }}
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'LanguagesSettings',
    props: {
        languagesArray:    Array,
    },
    methods: {
        changeLanguage(lang){
            this.$emit('change-language', lang)
        }
    }
}
</script>

<style lang="scss">
.langS{
    text-align: left;
    .lang{
        width: 30%;
        display: inline-block;
    }
}

</style>