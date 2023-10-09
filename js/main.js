import "../scss/reset.scss";
import "../scss/fonts.scss";
import "../scss/generic-style.scss";
import "../scss/header.scss";
import "../scss/header-mobile.scss";
import "../scss/main-img-test.scss";
import "../scss/campaign.scss";
import "../scss/products.scss";
import "../scss/who-for.scss";
import "../scss/montessori.scss";
import "../scss/pro-part.scss";
import "../scss/presentation-laurie.scss";
import "../scss/values.scss";
import "../scss/reviews.scss";
import "../scss/sponsors-contact.scss";
import "../scss/footer.scss";
import "../scss/particuliers.scss";
import "../scss/professionnelles.scss";
import "../scss/mes-valeurs.scss";
import "../scss/presse.scss";
import "../scss/legales.scss";
import "../scss/insta.scss";


import "../js/sticky-menu.js";


import Instafeed from "instafeed.js";
let render = function(post, data) {
    console.log(post)
    // createLogger
    return`

    <div class="insta-post-grid-item"             
            style="background-image:url(${post.image})" >
        <a href="${post.link}"> 
            <div class="overlay">
            <p>${post.caption}</p>
            </div>
        </a>
    </div>
   `
}
var feed = new Instafeed({
    accessToken: 'IGQWRNbG5kZA1V6aXdndi1UaVJFOHNiVmdOa3YxZA3JSNWduSTRsZAkZA4bHBvTjFWcFFYekk3OWF5Nk9CT2xscmxpRU9zZA0I2N3RXY2lya2hIZAFZAuN2N2SmprX0dJMkNjQm9ydWRTeUtoWTB6bElXNFpoN3FmNmo4d3MZD',
    render: render,
    limit: 6,
});
feed.run();
