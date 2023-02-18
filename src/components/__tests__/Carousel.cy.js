import Carousel from '../Carousel.vue'

describe('<Carousel />', () => {
    it('renders', () => {
        // see: https://test-utils.vuejs.org/guide/
        cy.mount(Carousel, {
            props: {
                identity: "wtf",
                path: "assets/carousel",
                itemList: [
                    {img: "Eilean_Donan_castle.jpg", alt: "Eilean Donan Castle"},
                    {img: "Sir-Walter-Scott-books.jpg", alt: "Books by Sir Walter Scott"},
                    {img: "ladies-by-kitchen-fire.jpg", alt: "Ladies by a kitchen fire"},
                    {img: "reading-book.jpg", alt: "A reading book"},
                    {img: "scottish-landscape-two.jpg", alt: "A scottish landscape"},
                    {img: "scottish_landscape_one.jpg", alt: "A scottish landscape"},
                    {img: "sir-walter-scott.jpg", alt: "Sir Walter SCott"},
                ],
                interval: "3210"
            }

        })
    })
})
