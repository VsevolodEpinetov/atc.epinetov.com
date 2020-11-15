const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

const scrollTo = (element, to, duration) => {
  var start = element.scrollTop,
    change = to - start + document.getElementById("document-body").offsetTop + 450,
    currentTime = 0,
    increment = 20;
 
    var animateScroll = function () {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

export default function smoothScroll (target) {
    var targetScroll = document.getElementById(target);
    scrollTo(document.documentElement, targetScroll.offsetTop, 900);
}
