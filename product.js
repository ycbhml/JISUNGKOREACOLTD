// 导航栏监听
document.addEventListener("DOMContentLoaded", function () {
  // 导航栏透明 -> 滚动变白
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
          header.classList.add("scrolled");
      } else {
          header.classList.remove("scrolled");
      }
  });
});

function updateProgressBar(index, total) {
  const progressBar = document.querySelector('.progress-bar');
  const progressPercent = ((index + 1) / total) * 100; 
  progressBar.style.width = `${progressPercent}%`;

  // ✅ 新增几分之几
  const progressText = document.getElementById('progressText');
  progressText.textContent = `${index + 1} / ${total}`;
}

// 背景切换监听
document.addEventListener("DOMContentLoaded", function () {
  // 换图
  const images = [
      "background/background21.png",
      "background/background22.png",
      "background/background23.png",
      "background/background24.png",
      "background/background25.png"
  ];

  // 换字
  const texts = [
      { text: "민물장어 양념구이", offsetX: 800, offsetY: 300, color: "#ffffff" }, // 中间上方
      { text: "민물장어 담백구이", offsetX: 800, offsetY: 300, color: "#000000" },
      { text: "민물장어 냉동필렛", offsetX: 800, offsetY: 300, color: "#000000" }, 
      { text: "민물 활장어", offsetX: 800, offsetY: 300, color: "#ffffff" },
      { text: "생강채", offsetX: 800, offsetY: 300, color: "#000000" }
  ];

  const buyLinks = [
    {
      naver: "https://smartstore.naver.com/jisungkoreacoltd",
      coupang: "https://shop.coupang.com/A01278110?platform=p&brandId=0"
    },
    {
      naver: "https://smartstore.naver.com/jisungkoreacoltd",
      coupang: "https://shop.coupang.com/A01278110?platform=p&brandId=0"
    }
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideInterval; // 🆕 自动轮播计时器

  let currentSlide = document.querySelector(".slide.current");
  let nextSlide = document.querySelector(".slide.next");
  let slideText = document.getElementById("slideText");

  function updateText(index) {
      slideText.classList.remove("show"); // 先淡出
      setTimeout(() => {
          slideText.innerHTML = texts[index].text;
          slideText.style.color = texts[index].color;
          slideText.style.transform = `translate(calc(-50% + ${texts[index].offsetX}px), calc(-50% + ${texts[index].offsetY}px))`;
          slideText.classList.add("show"); // 再淡入
      }, 300);
  }

  function updateBuyButtons(index) {
    const btn1 = document.getElementById("buyBtn1");
    const btn2 = document.getElementById("buyBtn2");
    if (buyLinks[index]) {
      btn1.href = buyLinks[index].naver;
      btn2.href = buyLinks[index].coupang;
    }
  }

  function showSlide(nextIndex, direction = 'right') {
      if (isAnimating) return;
      isAnimating = true;


      // 更新按钮链接
      updateBuyButtons(nextIndex);
      updateText(nextIndex);

      nextSlide.style.backgroundImage = `url('${images[nextIndex]}')`;
      nextSlide.style.transition = 'none';
      nextSlide.style.transform = (direction === 'right') ? 'translateX(100%)' : 'translateX(-100%)';

      requestAnimationFrame(() => {
          nextSlide.style.transition = 'transform 0.6s ease';
          currentSlide.style.transition = 'transform 0.6s ease';
          currentSlide.style.transform = (direction === 'right') ? 'translateX(-100%)' : 'translateX(100%)';
          nextSlide.style.transform = 'translateX(0%)';
      });

      setTimeout(() => {
          currentSlide.classList.remove("current");
          nextSlide.classList.remove("next");

          currentSlide.style.transition = 'none';
          currentSlide.style.transform = 'translateX(100%)';

          const temp = currentSlide;
          currentSlide = nextSlide;
          nextSlide = temp;

          currentSlide.classList.add("current");
          nextSlide.classList.add("next");

          currentIndex = nextIndex;

          updateProgressBar(currentIndex, images.length); // 🔥 图片进度条函数在 这一行！
          isAnimating = false;
      }, 600);

  }

  function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % images.length;
          showSlide(nextIndex, 'right');
      }, 3000); // 🕒 每3秒自动切换
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
  }

  document.querySelector(".left-btn").addEventListener("click", () => {
      const nextIndex = (currentIndex - 1 + images.length) % images.length;
      showSlide(nextIndex, 'left');
      resetAutoSlide(); // 🆕 手动点击后重新开始计时
  });

  document.querySelector(".right-btn").addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % images.length;
      showSlide(nextIndex, 'right');
      resetAutoSlide(); // 🆕 手动点击后重新开始计时
  });

  // 初始化第一张图和文字
  currentSlide.style.backgroundImage = `url('${images[currentIndex]}')`;
  updateText(currentIndex);

  //确保初始按钮链接正确
  updateBuyButtons(currentIndex);
  
  startAutoSlide(); // 🆕 页面加载完后开始自动轮播
});


//幻灯片监听
document.addEventListener("DOMContentLoaded", function () {
  const secondImages = [
    "PPT/slide1.png",
    "PPT/slide2.jpg",
    "PPT/slide3.jpg",
    "PPT/slide4.jpg",
    "PPT/slide5.jpg"
  ];

  let secondCurrentIndex = 0;
  let secondIsAnimating = false;

  let secondCurrentSlide = document.querySelector(".second-slide.current");
  let secondNextSlide = document.querySelector(".second-slide.next");
  const indicatorButtons = document.querySelectorAll('.indicator-btn');

  function updateIndicators(index) {
    indicatorButtons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }

  function showSecondSlide(nextIndex, direction = 'right') {
    if (secondIsAnimating || nextIndex === secondCurrentIndex) return;
    secondIsAnimating = true;

    secondNextSlide.querySelector('.second-img').src = secondImages[nextIndex];
    secondNextSlide.style.transition = 'none';
    secondNextSlide.style.transform = (direction === 'right') ? 'translateX(100%)' : 'translateX(-100%)';

    requestAnimationFrame(() => {
      secondNextSlide.style.transition = 'transform 0.6s ease';
      secondCurrentSlide.style.transition = 'transform 0.6s ease';
      secondCurrentSlide.style.transform = (direction === 'right') ? 'translateX(-100%)' : 'translateX(100%)';
      secondNextSlide.style.transform = 'translateX(0%)';
    });

    setTimeout(() => {
      secondCurrentSlide.classList.remove("current");
      secondNextSlide.classList.remove("next");

      secondCurrentSlide.style.transition = 'none';
      secondCurrentSlide.style.transform = 'translateX(100%)';

      const temp = secondCurrentSlide;
      secondCurrentSlide = secondNextSlide;
      secondNextSlide = temp;

      secondCurrentSlide.classList.add("current");
      secondNextSlide.classList.add("next");

      secondCurrentIndex = nextIndex;
      updateIndicators(secondCurrentIndex);
      secondIsAnimating = false;
    }, 600);
  }

  indicatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      showSecondSlide(index, index > secondCurrentIndex ? 'right' : 'left');
    });
  });

  // 初始化第一张
  secondCurrentSlide.querySelector('.second-img').src = secondImages[secondCurrentIndex];
  updateIndicators(secondCurrentIndex);



  // 幻灯片轮播代码
    function startAutoPlay() {
      setInterval(() => {
        const nextIndex = (secondCurrentIndex + 1) % secondImages.length;
        showSecondSlide(nextIndex, 'right');
      }, 5000);
    }
    startAutoPlay();
});

// // 导航栏弹窗监听{老联系方式弹窗}
// document.addEventListener("DOMContentLoaded", function () {
//   const modal = document.getElementById("contactModal");
//   const trigger = document.getElementById("contactTrigger");
//   const closeBtn = document.querySelector(".close-button");

//   trigger.addEventListener("click", function (e) {
//     e.preventDefault();
//     modal.style.display = "flex";
//   });

//   closeBtn.addEventListener("click", function () {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", function (e) {
//     if (e.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// });

// 新联系方式弹窗
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal");
  const trigger = document.getElementById("contactTrigger");
  const closeBtn = document.querySelector(".contact-close-button");

  if (trigger && modal && closeBtn) {
    // 打开弹窗
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("show");
    });

    // 点击关闭按钮
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    // 点击遮罩关闭
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }
});

//认证书高清弹窗

function openModal(imageSrc) {
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
modal.style.display = "flex";
modalImg.src = imageSrc;
}

document.addEventListener("DOMContentLoaded", function () {
const modal = document.getElementById("imageModal");
const closeBtn = document.querySelector(".close-image-modal");

// 关闭按钮点击关闭
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// 点击背景关闭
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
});
