const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});


document.querySelectorAll("a, button, div").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "200px";
    cursor.style.height = "200px";
    
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "50px"; 
    cursor.style.height = "50px";
  });
});






let currentScroll = 0;
let targetScroll = 0;
const ease = 0.02;

let smoothScrollEnabled = false;
let rafId = null;

function isMobile() {
  return window.innerWidth <= 768 || 'ontouchstart' in window;
}

function onWheel(e) {
  if (!smoothScrollEnabled) return;

  e.preventDefault();
  targetScroll += e.deltaY;
  targetScroll = Math.max(
    0,
    Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
  );
}

function smoothScroll() {
  if (!smoothScrollEnabled) return;

  currentScroll += (targetScroll - currentScroll) * ease;
  window.scrollTo(0, currentScroll);
  rafId = requestAnimationFrame(smoothScroll);
}

function enableSmoothScroll() {
  if (smoothScrollEnabled) return;

  smoothScrollEnabled = true;
  currentScroll = window.scrollY;
  targetScroll = window.scrollY;

  window.addEventListener("wheel", onWheel, { passive: false });
  smoothScroll();
}

function disableSmoothScroll() {
  smoothScrollEnabled = false;

  window.removeEventListener("wheel", onWheel);
  cancelAnimationFrame(rafId);
}

function checkScrollMode() {
  if (isMobile()) {
    disableSmoothScroll(); // native scroll
  } else {
    enableSmoothScroll(); // custom scroll
  }
}

// Initial check
checkScrollMode();

// Re-check on resize / rotation
window.addEventListener("resize", checkScrollMode);



// NAVIGATION LINKS SMOOTH SCROLL
document.querySelectorAll('.scroll').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const targetPosition = target.offsetTop;
    const start = currentScroll;
    const distance = targetPosition - start;
    const duration = 800;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      targetScroll = easeOutQuad(timeElapsed, start, distance, duration);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        targetScroll = targetPosition; 
      }
    }

    function easeOutQuad(t, b, c, d) {
      t /= d;
      return -c * t*(t-2) + b;
    }

    requestAnimationFrame(animation);
  });
});




// ABOUT IMAGE CLICK FEATURE

function clickAboutimages(clickedImg){

  const selectedImg = document.querySelector('.SclickedImg img');
  selectedImg.src = clickedImg;

}


// CHEVRON CLICK

 const imgListInner = document.querySelector('.imgListinner');
  const imgList = document.querySelector('.imgList');

  let currentTranslate = 0;
  const step = 300; // image width + gap

  function clickChevron(direction) {
    const containerWidth = imgList.offsetWidth;
    const contentWidth = imgListInner.scrollWidth;

    const maxTranslate = 0;
    const minTranslate = containerWidth - contentWidth; // negative value

    if (direction === 'left') {
      currentTranslate -= step;
    } else {
      currentTranslate += step;
    }

    // LIMITS
    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
    }

    if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
    }

    imgListInner.style.transform = `translateX(${currentTranslate}px)`;
  }