document.querySelector('.loading-screen').addEventListener('click', function() {
    const loadingScreen = this;
    loadingScreen.style.animation = 'myAnim 2.5s ease 0s 1 normal forwards';

    loadingScreen.addEventListener('animationend', function() {
      loadingScreen.style.display = 'none';
      document.body.classList.remove('loading');
      document.querySelector('.main-ctn').style.display = 'block';
    }, { once: true });
  });