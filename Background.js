 /*window.addEventListener('load', function () {
  let imgUrl = [
      'https://i.imgur.com/JAV7Mrh.png',
   ];
   buildGallery();
   if (window.location.href.includes('/p/') || window.location.href == 'https://storehaccounts.blogspot.com/' || window.location.href == 'https://storehaccounts.blogspot.com/?m=1' || window.location.href.includes('https://storehaccounts.blogspot.com/search') || window.location.href.includes('search?')) {
      
   }*/



// BACKGROUND WALLPAPER
window.addEventListener("load", function () {
    let imgUrl = [
    "https://media.tenor.com/ClaWcbiNOJ0AAAAj/cat-meme-happy-cat-meme.gif",
    "https://media.tenor.com/I4-fzfIDdwUAAAAj/battle-cats-the-battle-cats.gif",
    "https://media.tenor.com/wknEaFK9Qs8AAAAM/the-battle-cats-dancing.gif",
    "https://media.tenor.com/PGm3CJYscwkAAAAj/ritualsatanicogatuno-memes-battle-cats.gif",
    "https://media.tenor.com/LUY56n0_sJIAAAAM/battle-cats-the-battle-cats.gif",
    "https://media.tenor.com/B4ouBAva_vcAAAAM/sols-rng-battle-cats.gif",
    "https://media.tenor.com/X-N_QoJWfu4AAAAM/slime-cat-battle-cats.gif",
    "https://media.tenor.com/M61icyVPRysAAAAM/huh-cat.gif",
    "https://media.tenor.com/ai1a6ACeRaoAAAAM/manic.gif",
    "https://media.tenor.com/kFXjaHJ5uOYAAAAM/battle-cats-dance.gif",
    "https://media.tenor.com/taEkLWL4_akAAAAj/donald-morden-metal-slug.gif",
    "https://media.tenor.com/teouOQ7yMoMAAAAM/the-battle-cats-10-years.gif",
    "https://media.tenor.com/AWvnRjCKLo8AAAAj/the-battle-cats.gif",
    "https://media.tenor.com/t3QTVIOFHMwAAAAM/battle-cats-breaking-bad.gif",
    "https://media.tenor.com/cGIkaWzJfYUAAAAM/cat-legs.gif",
    "https://media.tenor.com/yu6xxnNOKHQAAAAM/the-battle-cats-we-do-a-little-trolling.gif",
    "https://media.tenor.com/BbmUE_NOf5sAAAAj/jotaro-jojo.gif",
    "https://media.tenor.com/Gb_On7jrREsAAAAM/the-battle-cats-super-feline.gif",
    "https://media.tenor.com/r2xEz94vaBoAAAAM/a-literal-eraser.gif",
    "https://media.tenor.com/dldttixbAoYAAAAM/battle-cats-fly.gif",
    "https://media.tenor.com/Yh7WwpzEqKAAAAAM/manic-king-dragon-cat.gif",
    "https://media.tenor.com/p1ffBl_UipEAAAAM/battle-cats-cat.gif",
    "https://media.tenor.com/9saoQI6ngvoAAAAM/post-this-cat-when-they-least-expect-it.gif",
    "https://media.tenor.com/gZkGw_kIfIwAAAAM/the-battle-cats-star-wars.gif",
    "https://media.tenor.com/buyetYbfd1EAAAAM/live-battle-cats.gif",
    "https://media.tenor.com/PrbfEMdG_HQAAAAM/battle-cats-watch-yo-tone.gif",
    "https://media.tenor.com/khsfy4lSXgAAAAAM/manic-jamiera-cat.gif",
    "https://media.tenor.com/kBEXegGwvzAAAAAM/the-battle-cats-axolotl.gif",
    "https://media.tenor.com/-wEWu3DBxY4AAAAM/cat-lion.gif",
    "https://media.tenor.com/krQPKGkh78oAAAAM/gamatoto-battle-cats.gif",
    "https://media.tenor.com/X_BOGUzs6rsAAAAM/gross-cat-battle-cats.gif",
    "https://media.tenor.com/1FpDzOm-PFIAAAAM/the-battle-cats-soap-cat.gif",
    "https://media.tenor.com/3-44WkIsMNgAAAAM/dasli-spin-dark-kasli.gif",
    "https://media.tenor.com/DhTvORIDgS8AAAAj/battle-cats-jump.gif",
    "https://media.tenor.com/9JWBxkoxYWsAAAAM/leggsy-head.gif",
    "https://media.tenor.com/TmmOQ6HNQ84AAAAM/battle-cats-shakurel.gif",
    "https://media.tenor.com/PbLQIlLXti8AAAAM/battle-cats-kasli.gif",
    "https://media.tenor.com/iiaal3F3PtQAAAAM/the-battle-cats-aku-empress.gif",
    "https://media.tenor.com/7jJWss4GfeYAAAAM/the-battle-cats-battle-cats.gif",
    "https://media.tenor.com/Cz3xq0vCA8wAAAAM/the-battle-cats-red-alert.gif",
    "https://media.tenor.com/-90Isnou_1UAAAAM/hi-chat.gif",
    "https://media.tenor.com/kuawTcVuJpgAAAAM/manic-island-cat.gif",
    "https://media.tenor.com/57usA3S8ZmwAAAAM/the-battle-cats-boogie-cat.gif",
    "https://media.tenor.com/MyOfOsAmq_wAAAAM/lumi-yippee.gif",
    "https://media.tenor.com/ClaWcbiNOJ0AAAAj/cat-meme-happy-cat-meme.gif",
    "https://media.tenor.com/I4-fzfIDdwUAAAAj/battle-cats-the-battle-cats.gif",
    "https://media.tenor.com/wknEaFK9Qs8AAAAM/the-battle-cats-dancing.gif",
    "https://media.tenor.com/PGm3CJYscwkAAAAj/ritualsatanicogatuno-memes-battle-cats.gif",
    "https://media.tenor.com/LUY56n0_sJIAAAAM/battle-cats-the-battle-cats.gif",
    "https://media.tenor.com/B4ouBAva_vcAAAAM/sols-rng-battle-cats.gif",
    "https://media.tenor.com/X-N_QoJWfu4AAAAM/slime-cat-battle-cats.gif",
    "https://media.tenor.com/M61icyVPRysAAAAM/huh-cat.gif",
    "https://media.tenor.com/ai1a6ACeRaoAAAAM/manic.gif",
    "https://media.tenor.com/kFXjaHJ5uOYAAAAM/battle-cats-dance.gif",
    "https://media.tenor.com/taEkLWL4_akAAAAj/donald-morden-metal-slug.gif",
    "https://media.tenor.com/teouOQ7yMoMAAAAM/the-battle-cats-10-years.gif",
    "https://media.tenor.com/AWvnRjCKLo8AAAAj/the-battle-cats.gif",
    "https://media.tenor.com/t3QTVIOFHMwAAAAM/battle-cats-breaking-bad.gif",
    "https://media.tenor.com/cGIkaWzJfYUAAAAM/cat-legs.gif",
    "https://media.tenor.com/yu6xxnNOKHQAAAAM/the-battle-cats-we-do-a-little-trolling.gif",
    "https://media.tenor.com/BbmUE_NOf5sAAAAj/jotaro-jojo.gif",
    "https://media.tenor.com/Gb_On7jrREsAAAAM/the-battle-cats-super-feline.gif",
    "https://media.tenor.com/r2xEz94vaBoAAAAM/a-literal-eraser.gif",
    "https://media.tenor.com/dldttixbAoYAAAAM/battle-cats-fly.gif",
    "https://media.tenor.com/Yh7WwpzEqKAAAAAM/manic-king-dragon-cat.gif",
    "https://media.tenor.com/p1ffBl_UipEAAAAM/battle-cats-cat.gif",
    "https://media.tenor.com/9saoQI6ngvoAAAAM/post-this-cat-when-they-least-expect-it.gif",
    "https://media.tenor.com/gZkGw_kIfIwAAAAM/the-battle-cats-star-wars.gif",
    "https://media.tenor.com/buyetYbfd1EAAAAM/live-battle-cats.gif",
    "https://media.tenor.com/PrbfEMdG_HQAAAAM/battle-cats-watch-yo-tone.gif",
    "https://media.tenor.com/khsfy4lSXgAAAAAM/manic-jamiera-cat.gif",
    "https://media.tenor.com/kBEXegGwvzAAAAAM/the-battle-cats-axolotl.gif",
    "https://media.tenor.com/-wEWu3DBxY4AAAAM/cat-lion.gif",
    "https://media.tenor.com/krQPKGkh78oAAAAM/gamatoto-battle-cats.gif",
    "https://media.tenor.com/X_BOGUzs6rsAAAAM/gross-cat-battle-cats.gif",
    "https://media.tenor.com/1FpDzOm-PFIAAAAM/the-battle-cats-soap-cat.gif",
    "https://media.tenor.com/3-44WkIsMNgAAAAM/dasli-spin-dark-kasli.gif",
    "https://media.tenor.com/DhTvORIDgS8AAAAj/battle-cats-jump.gif",
    "https://media.tenor.com/9JWBxkoxYWsAAAAM/leggsy-head.gif",
    "https://media.tenor.com/TmmOQ6HNQ84AAAAM/battle-cats-shakurel.gif",
    "https://media.tenor.com/PbLQIlLXti8AAAAM/battle-cats-kasli.gif",
    "https://media.tenor.com/iiaal3F3PtQAAAAM/the-battle-cats-aku-empress.gif",
    "https://media.tenor.com/7jJWss4GfeYAAAAM/the-battle-cats-battle-cats.gif",
    "https://media.tenor.com/Cz3xq0vCA8wAAAAM/the-battle-cats-red-alert.gif",
    "https://media.tenor.com/-90Isnou_1UAAAAM/hi-chat.gif",
    "https://media.tenor.com/kuawTcVuJpgAAAAM/manic-island-cat.gif",
    "https://media.tenor.com/57usA3S8ZmwAAAAM/the-battle-cats-boogie-cat.gif",
    "https://media.tenor.com/MyOfOsAmq_wAAAAM/lumi-yippee.gif"
];
    let temp = imgUrl[Math.floor(Math.random() * (imgUrl.length))];
    document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.85) -30%, rgba(0,0,0,0.85)), url(" + temp + ") repeat center center fixed";
    document.querySelector('.blogCont').style.backgroundSize = '400px 400px';
	//document.querySelector('.blogCont').style.backgroundSize = 'cover';
    document.querySelector('.blogCont').style.backgroundPosition = 'fixed';
    document.querySelector('.blogCont').style.top = '0';
    document.querySelector('.blogCont').style.left = '0';
    document.querySelector('.blogCont').willChange = 'transform';
}, false);



/*window.addEventListener("load",function() {
//let imgUrl = ['https://i.imgur.com/Di5U4Q8.png', 'https://i.imgur.com/oUuCIPb.png', 'https://i.imgur.com/sr8WMEk.png'];
//let temp = imgUrl[Math.floor(Math.random() * imgUrl.length - 2)];
	  if(document.querySelector('.postBody img')) document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.7) -30%, rgba(0,0,0,0.9)), url(" + document.querySelector('.postBody img').src + ") repeat center center fixed";
else if(document.querySelector('.blogM img')) document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.7) -30%, rgba(0,0,0,0.9)), url(" + document.querySelector('.blogM img').src + ") repeat center center fixed";
      else document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.6) -30%, rgba(0,0,0,0.9)), url(https://i.ytimg.com/vi/aDo4xQMkax4/maxresdefault.jpg) repeat center center fixed";
	  document.querySelector('.blogCont').style.background = "linear-gradient(to bottom, rgba(0,0,0,0.6) -30%, rgba(0,0,0,0.9)), url(https://i.imgur.com/ILOHMtj.png) repeat center center fixed"
      document.querySelector('.blogCont').style.backgroundSize = 'cover';
      document.querySelector('.blogCont').style.backgroundPosition = 'fixed';
      document.querySelector('.blogCont').style.top = '0';
      document.querySelector('.blogCont').style.left = '0';
      document.querySelector('.blogCont').willChange = 'transform';
}, false);*/
