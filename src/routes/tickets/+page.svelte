<script>
    import Ticket from "$lib/common/Ticket.svelte";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";

    let culturalPasses = [
        {
            name: 'Western Solo Dance',
            price: 1000,
        },
        {
            name: 'Western Group Dance',
            price: 1000,
        },
        {
            name: 'Battle Of Bands',
            price: 1000,
        }
    ];

    onMount(() => {
    })

    function getTranslatePercentage(element) {
        var matrix = new WebKitCSSMatrix(transformValue);
        return {
        }
    }

        }
    }
</script>

                <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}"/>
            </div>
        {#each culturalPasses as cultrualTicket, index}
            </div>
        {/each}
    </div>