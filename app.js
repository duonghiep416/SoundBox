var shareBtn = document.querySelector("#shareBtn");
var timesBtn = document.querySelector("#times");
var modal = document.querySelector(".social-share-modal");

shareBtn.addEventListener("click", function (e) {
    modal.classList.toggle("hide");
});

timesBtn.addEventListener("click", function (e) {
    modal.classList.toggle("hide");
});
