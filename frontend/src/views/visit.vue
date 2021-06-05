<template>
    <div>
        <div class="bg"></div>
        <main>
            <nav>
                <a href="/"><span>FastTyping</span></a>
                <a href="/visit/"><i class="fas fa-question"></i></a>
                <a href="/faq/"><i class="fas fa-headset"></i></a>
                <a href="https://api-fast--typing.herokuapp.com/users/login"><i class="fas fa-sign-in-alt"></i></a>
            </nav>
            <section>
                <article>
                    <h3>What is Fast Typing?</h3>
                    <span>
                        Fast Typing is an application that aims to check your wpm (words per minute), teach you to type faster and show your mistakes. You can write in different languages at different times. The application is modern and minimalist. It is easy on the eyes.
                        <!--Polish version :Fast Typing to aplikacja, która ma na celu sprawdzenie wpm (słów na minutę), naukę szybszego pisania i pokazywanie błędów.Mozesz pisac w roznych jezykach w roznym czasie-->
                    </span>
                    <h3>How to use Fast Typing</h3>
                    <span>
                        The page is very intuitive, after entering it you have the option to check it immediately after entering the page, you can start typing (highlighted word), to confirm you have to press space.
                    <!--Strona jest bardzo intuicyjna po wejsciu na nia masz mozliwosc sprawdzenia sie odrazu po wejsciu na strone, mozesz zaczac pisac ( podswietlone slowo ), aby zatwierdzic musisz nacisnac spacje. -->
                    </span>
                    <a href="/"><button>Try it</button></a>
                </article>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'visit'
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';


body{
    margin: 0;
    padding: 0;
    background-attachment: fixed;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    .bg{
        height: 100%;
        width: 100%;
        position: absolute;
        background: $bg-main;
        background-attachment: fixed;
        opacity: 0.5;
    }
    main{
        position: absolute;
        nav{
            text-align: center;
            width: 100vw;

            span{
                color: $color-strong;
                font-weight: 600;
                font-size: 2rem;
            }

            .fas {
                margin-left: 1vw;
                transition: .3s color;
                color: $color-sub;
                font-size: 1rem;
            }

            .fas:hover{
                color: $color-strong;
            }
        }

        article{
            margin-top: 20vh;
            color: $color-sub;
            font-size: 1.3rem;
            text-align: justify;
            position: relative;
            left: 25%;
            width: 50vw;

            h3{
                font-size: 2.2rem;
                margin-top: 10vh;
            }
            a{
                text-decoration: none;
                button{
                    width: 25vw;
                    height: 8vh;
                    font-size: 2.5rem;
                    font-weight: lighter;
                    display: block;
                    background: transparent;
                    border: 1px solid $color-strong-sub;
                    outline: none;
                    color: $color-strong-sub;
                    margin-top: 5vh;
                    cursor: pointer;
                    transition: all .5s;
                    position: relative;


                    &:after {
                        content: "";
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(45deg, $color-strong 50%, transparent 50%);
                        z-index: -1;

                      }

                      &,
                      &:after {
                        background-size: 300%;
                        background-position:100%;
                        transition: 1s, font-size 0.2s;
                      }

                      &:hover,
                      &:hover:after {
                        background-position: 0;
                      }

                }

            }
        }
    }

}
</style>