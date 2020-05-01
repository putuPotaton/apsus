export default {
    props:['reviews'],
    template: `
    <div class="reviews">
    <h2 class="reviews-title">reviews</h2>
    <ul>
        <li class="review-prev" v-for="(review, idx) in reviews">
        <div
        class="review-title">
        {{review.name}} <span>{{review.date}}</span>
        </div>
                {{review.txt}}
</li>

    </ul>
</div>

    `,





}
