const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log();
    }
  });
};

const options = {
  rootMargin: '100px',
};

const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector('#infifnite-scroll-container'));
