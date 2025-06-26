(async () => {
  let script = document.createElement('script');
  let body = document.querySelector('body');

  script.setAttribute('src', 'https://code.jquery.com/jquery-3.1.1.min.js');
  script.setAttribute('integrity', 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=');
  script.setAttribute('crossorigin', 'anonymous');

  body.appendChild(script);

  await initFunctions(['jQuery']);
  
  script = document.createElement('script');
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.js');
  body.appendChild(script);
})();
