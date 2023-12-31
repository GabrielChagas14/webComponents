class StarRaterComponent extends HTMLElement {
    constructor (){
        super();
        this.shadow = this.attachShadow({ mode:'open' })
    }
    connectedCallback () {
        this.render();
    }
    render() {
        this.shadow.appendChild(this.style())
        
        const rater = this.createRater()
        this.stars = this.createStars()
        this.stars.forEach(star => rater.appendChild(star))

        this.resetRating()

        this.shadow.appendChild(rater)
    }
    style() {
        const style = document.createElement('style')
        style.textContent = `
            .star {
                font-size: 5rem;
                color: gray;
                cursor: pointer;
            }
        `
        return style;
    }
    createRater() {
        const rater = document.createElement('div')
        rater.classList.add('star-rater')
        rater.addEventListener('mouseout', this.resetRating.bind(this))
        return rater
    }
    createStars() {
        const createStar = (_, id) => {
            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', Number(id) + 1)
            star.innerHTML = '&#9733;'

            star.addEventListener('click', this.setRating.bind(this))
            star.addEventListener('mouseover', this.ratingHover.bind(this))
            return star
        }
        return Array.from({ length: 5 }, createStar)
    }
    resetRating() {
        this.currentRatingValue = this.getAttribute('data-rating') || 0
        this.hightlightRating()
    }
    setRating(event) {
        this.setAttribute(
            'data-rating',
            event.currentTarget.getAttribute('data-value')
        )
    }
    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute('data-value')
        this.hightlightRating()
    }
    hightlightRating() {
        this.stars.forEach(star => {
            
            star.style.color = 
                this.currentRatingValue >= star.getAttribute('data-value')
                ? 'yellow'
                : 'gray'
        })
    }
}
customElements.define('star-rater-component', StarRaterComponent)