
//Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

document.addEventListener("DOMContentLoaded", () => {
  var c = document.getElementById("Canvas");
  var ctx = c.getContext("2d");

  var cwidth, cheight;
  var shells = [];
  var pass = [];

  var colors = [
    "#FF5252",
    "#FF4081",
    "#E040FB",
    "#7C4DFF",
    "#536DFE",
    "#448AFF",
    "#40C4FF",
    "#18FFFF",
    "#64FFDA",
    "#69F0AE",
    "#B2FF59",
    "#EEFF41",
    "#FFFF00",
    "#FFD740",
    "#FFAB40",
    "#FF6E40",
  ];

  window.onresize = function () {
    reset();
  };
  reset();
  function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
  }

  function newShell() {
    var left = Math.random() > 0.5;
    var shell = {};
    shell.x = 1 * left;
    shell.y = 1;
    shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
    shell.yoff = 0.01 + Math.random() * 0.007;
    shell.size = Math.random() * 6 + 3;
    shell.color = colors[Math.floor(Math.random() * colors.length)];

    shells.push(shell);
  }

  function newPass(shell) {
    var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

    for (i = 0; i < pasCount; i++) {
      var pas = {};
      pas.x = shell.x * cwidth;
      pas.y = shell.y * cheight;

      var a = Math.random() * 4;
      var s = Math.random() * 10;

      pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
      pas.yoff = s * Math.sin(a * (Math.PI / 2));

      pas.color = shell.color;
      pas.size = Math.sqrt(shell.size);

      if (pass.length < 1000) {
        pass.push(pas);
      }
    }
  }

  var lastRun = 0;
  Run();
  function Run() {
    var dt = 1;
    if (lastRun != 0) {
      dt = Math.min(50, performance.now() - lastRun);
    }
    lastRun = performance.now();

    //ctx.clearRect(0, 0, cwidth, cheight);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, cwidth, cheight);

    if (shells.length < 10 && Math.random() > 0.96) {
      newShell();
    }

    for (let ix in shells) {
      var shell = shells[ix];

      ctx.beginPath();
      ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
      ctx.fillStyle = shell.color;
      ctx.fill();

      shell.x -= shell.xoff;
      shell.y -= shell.yoff;
      shell.xoff -= shell.xoff * dt * 0.001;
      shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

      if (shell.yoff < -0.005) {
        newPass(shell);
        shells.splice(ix, 1);
      }
    }

    for (let ix in pass) {
      var pas = pass[ix];

      ctx.beginPath();
      ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
      ctx.fillStyle = pas.color;
      ctx.fill();

      pas.x -= pas.xoff;
      pas.y -= pas.yoff;
      pas.xoff -= pas.xoff * dt * 0.001;
      pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
      pas.size -= dt * 0.002 * Math.random();

      if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
        pass.splice(ix, 1);
      }
    }
    requestAnimationFrame(Run);
  }
});

window.onresize = function (event) {
  recize_notes();
};


