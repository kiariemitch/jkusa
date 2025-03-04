document.addEventListener("DOMContentLoaded", function () {
    const adModal = document.getElementById("ad-modal");
    const closeAd = document.querySelector(".close-ad");

    setTimeout(() => {
        adModal.style.display = "block";
    }, 3000);

    closeAd.addEventListener("click", function () {
        adModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === adModal) {
            adModal.style.display = "none";
        }
    });
});
