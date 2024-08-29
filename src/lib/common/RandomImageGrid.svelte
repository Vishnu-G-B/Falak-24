<script>
    import {gsap} from 'gsap';
    import {onMount} from "svelte";
    import imagesLoaded from "imagesloaded";

    onMount(() => {
// Map number x from range [a, b] to [c, d]
        const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
        const lerp = (a, b, n) => (1 - n) * a + n * b;

        const calcWinsize = () => {
            return {width: window.innerWidth, height: window.innerHeight};
        };

        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
        const getMousePos = e => {
            return {
                x: e.clientX,
                y: e.clientY
            };
        };

// Preload images
        const preloadImages = (selector) => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll(selector), resolve);
            });
        };

        preloadImages('.grid__item-img, .bigimg').then(() => {
            // Remove loader (loading class)
            document.body.classList.remove('loading');

            // Initialize grid
            const grid = new Grid(document.querySelector('.grid'));
        });

        // Calculate the viewport size
        let winsize = calcWinsize();
        window.addEventListener('resize', () => winsize = calcWinsize());

        let mousepos = {x: winsize.width / 2, y: winsize.height / 2};
        window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

        class GridItem {
            constructor(el) {
                this.DOM = {el: el};
                this.DOM.inner = this.DOM.el.querySelector('.grid__item-img');
                this.move();
            }

            move() {
                this.invertMovement = !getRandomNumber(0, 3);

                let translationVals = {tx: 0, ty: 0};
                const xstart = this.invertMovement ? getRandomNumber(20, 70) : getRandomNumber(40, 80);
                const ystart = this.invertMovement ? getRandomNumber(10, 60) : getRandomNumber(40, 80);

                // also moving inner image (max 50px on each side - to change this limit change it also in the CSS)
                let translationInnerVals = {tx: 0, ty: 0};
                const xstartInner = this.invertMovement ? getRandomNumber(0, 25) : getRandomNumber(0, 50);
                const ystartInner = this.invertMovement ? getRandomNumber(0, 25) : getRandomNumber(0, 50);

                const render = () => {
                    translationVals.tx = lerp(translationVals.tx, map(mousepos.x, 0, winsize.width, this.invertMovement ? xstart : -xstart, this.invertMovement ? -xstart : xstart), 0.07);
                    translationVals.ty = lerp(translationVals.ty, map(mousepos.y, 0, winsize.height, this.invertMovement ? ystart : -ystart, this.invertMovement ? -ystart : ystart), 0.07);
                    gsap.set(this.DOM.el, {x: translationVals.tx, y: translationVals.ty});

                    translationInnerVals.tx = lerp(translationInnerVals.tx, map(mousepos.x, 0, winsize.width, this.invertMovement ? -xstartInner : xstartInner, this.invertMovement ? xstartInner : -xstartInner), 0.07);
                    translationInnerVals.ty = lerp(translationInnerVals.ty, map(mousepos.y, 0, winsize.height, this.invertMovement ? -ystartInner : ystartInner, this.invertMovement ? ystartInner : -ystartInner), 0.07);
                    gsap.set(this.DOM.inner, {x: translationInnerVals.tx, y: translationInnerVals.ty});

                    requestAnimationFrame(render);
                }
                requestAnimationFrame(render);
            }
        }

        class Grid {
            constructor(el) {
                this.DOM = {el: el};
                this.gridItems = [];
                this.items = [...this.DOM.el.querySelectorAll('.grid__item')];
                this.items.forEach(item => this.gridItems.push(new GridItem(item)));

                this.showItems();
            }

            // Initial animation to scale up and fade in the items
            showItems() {
                gsap
                    .timeline()
                    .set(this.items, {scale: pos => this.gridItems[pos].invertMovement ? 0.2 : 0.6, opacity: 0}, 0)
                    .to(this.items, {
                        duration: 2,
                        ease: 'Expo.easeOut',
                        scale: pos => this.gridItems[pos].invertMovement ? 0.5 : 1,
                        stagger: {amount: 0.6, grid: 'auto', from: 'center'}
                    }, 0)
                    .to(this.items, {
                        duration: 2,
                        ease: 'Power1.easeOut',
                        opacity: pos => this.gridItems[pos].invertMovement ? 0.3 : 0.9,
                        stagger: {amount: 0.6, grid: 'auto', from: 'center'}
                    }, 0);
            }
        }
    })

</script>

<main class="h-screen w-full">
    <div class="content h-full w-full">
        <div class="grid grid--img">
            <div class="grid__item pos-1">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/1.jpg);"></div>
            </div>
            <div class="grid__item pos-2">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/2.jpg);"></div>
            </div>
            <div class="grid__item pos-3">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/3.jpg);"></div>
            </div>
            <div class="grid__item pos-4">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/4.jpg);"></div>
            </div>
            <div class="grid__item pos-5">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/5.jpg);"></div>
            </div>
            <div class="grid__item pos-6">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/6.jpg);"></div>
            </div>
            <div class="grid__item pos-7">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/7.jpg);"></div>
            </div>
            <div class="grid__item pos-8">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/8.jpg);"></div>
            </div>
            <div class="grid__item pos-9">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/9.jpg);"></div>
            </div>
            <div class="grid__item pos-10">
                <div class="grid__item-img" style="background-image:url(src/lib/assets/images/10.jpg);"></div>
            </div>
        </div>
        <h2 class="content__title no-select">
            <span>Grip</span>
            <span class="content__title-sub">tapes</span>
        </h2>
    </div>
</main>

<style>
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }


    .demo-2 {
        --color-text: #000000;
        --color-bg: #832f05;
        --color-link: #ffffff;
        --color-link-hover: #000;
        --color-content-title-sub: #ec9e34;
        --cursor-stroke: #000000;
        --cursor-fill: none;
        --cursor-stroke-width: 1px;
    }

    .demo-3 {
        --color-text: #239c34;
        --color-bg: #000000;
        --color-link: #ffffff;
        --color-link-hover: #ccc;
        --color-content-title-sub: #ffffff;
        --cursor-stroke: #239c34;
        --cursor-fill: none;
        --cursor-stroke-width: 3px;
    }

    a {
        text-decoration: underline;
        color: var(--color-link);
        outline: none;
    }

    a:hover,
    a:focus {
        text-decoration: none;
        color: var(--color-link-hover);
        outline: none;
    }

    /* Page Loader */
    .js .loading::before,
    .js .loading::after {
        content: '';
        position: fixed;
        z-index: 1000;
    }

    .js .loading::before {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-bg);
    }

    .js .loading::after {
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        margin: -30px 0 0 -30px;
        border-radius: 50%;
        opacity: 0.4;
        background: var(--color-link);
        animation: loaderAnim 0.7s linear infinite alternate forwards;

    }

    @keyframes loaderAnim {
        to {
            opacity: 1;
            transform: scale3d(0.5, 0.5, 1);
        }
    }

    .message {
        position: relative;
        z-index: 100;
        text-align: center;
        background: var(--color-text);
        color: var(--color-bg);
        padding: 1rem;
        font-size: 0.85rem;
        position: relative;
    }

    .no-select {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .frame {
        padding: 3rem 5vw;
        text-align: center;
        position: relative;
        z-index: 1000;
    }

    .frame__title {
        font-size: 1rem;
        margin: 0 0 1rem;
        font-weight: normal;
    }

    .frame__links {
        display: inline;
    }

    .frame__links a:not(:last-child),
    .frame__demos a:not(:last-child) {
        margin-right: 1rem;
    }

    .frame__demos {
        margin: 1rem 0;
    }

    .frame__demo--current,
    .frame__demo--current:hover {
        color: var(--color-text);
        text-decoration: none;
    }

    .content {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: calc(100vh);
        position: relative;
        align-items: center;
        justify-content: center;
    }

    .grid {
        pointer-events: none;
        position: absolute;
        width: 110%;
        height: 110%;
        top: -5%;
        left: -5%;
        display: grid;
        grid-template-columns: repeat(50, 2%);
        grid-template-rows: repeat(50, 2%);
    }

    .grid__item {
        position: relative;
    }

    .grid--img .grid__item {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform;
    }

    .grid__item-img {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50% 50%;
    }

    .grid--img .grid__item-img {
        flex: none;
        width: calc(100% + 100px);
        height: calc(100% + 100px);
        will-change: transform;
    }

    /* Shorthand grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end */

    .pos-1 {
        grid-area: 10 / 1 / 26 / 7;
    }

    .pos-2 {
        grid-area: 1 / 18 / 9 / 27;
    }

    .pos-3 {
        grid-area: 1 / 36 / 14 / 42;
    }

    .pos-4 {
        grid-area: 13 / 11 / 32 / 18;
    }

    .pos-5 {
        grid-area: 17 / 32 / 32 / 38;
    }

    .pos-6 {
        grid-area: 20 / 46 / 28 / 51;
    }

    .pos-7 {
        grid-area: 43 / 1 / 51 / 10;
    }

    .pos-8 {
        grid-area: 38 / 14 / 46 / 22;
    }

    .pos-9 {
        grid-area: 40 / 26 / 51 / 32;
    }

    .pos-10 {
        grid-area: 37 / 39 / 48 / 47;
    }

    .content__title {
        font-family: bely-display, sans-serif;
        font-weight: 400;
        font-size: 10vw;
        margin: 0;
        line-height: 1;
        position: relative;
    }

    .content__title-sub {
        color: var(--color-content-title-sub);
        font-size: 4.5vw;
        display: block;
        margin-left: 3vw;
        line-height: 0.5;
    }

    .cursor {
        display: none;
    }

    @media screen and (min-width: 53em) {
        .message {
            display: none;
        }

        .frame {
            position: fixed;
            text-align: left;
            z-index: 100;
            top: 0;
            left: 0;
            display: grid;
            align-content: space-between;
            width: 100%;
            max-width: none;
            height: 100%;
            padding: 3rem;
            pointer-events: none;
            grid-template-columns: 75% 25%;
            grid-template-rows: auto auto auto;
            grid-template-areas: 'title links'
							'... ...'
							'... demos';
        }

        .frame__title-wrap {
            grid-area: title;
            display: flex;
        }

        .frame__title {
            margin: 0;
        }

        .frame__tagline {
            position: relative;
            margin: 0 0 0 1rem;
            padding: 0 0 0 1rem;
            opacity: 0.5;
        }

        .frame__demos {
            margin: 0;
            grid-area: demos;
            justify-self: end;
        }

        .frame__links {
            grid-area: links;
            padding: 0;
            justify-self: end;
        }

        .frame a {
            pointer-events: auto;
        }

        .content {
            height: 100%;
            justify-content: center;
            max-height: none;
        }
    }

    @media (any-pointer: fine) {
        .cursor {
            position: fixed;
            top: 0;
            left: 0;
            display: block;
            pointer-events: none;
        }

        .cursor__inner {
            fill: var(--cursor-fill);
            stroke: var(--cursor-stroke);
            stroke-width: var(--cursor-stroke-width);
        }
    }
</style>