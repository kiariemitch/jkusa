document.addEventListener("DOMContentLoaded", function () {
    const applyModal = document.getElementById("apply-modal");
    const applyForm = document.getElementById("apply-form");
    const applyNowBtn = document.getElementById("apply-now-btn");
    const applyLink = document.querySelector(".apply-link");
    const closeBtn = document.querySelector(".close");

    function openModal(event) {
        event.preventDefault();
        console.log("Opening Apply Modal...");
        applyModal.style.display = "flex";
    }

    function closeModal() {
        console.log("Closing Apply Modal...");
        applyModal.style.display = "none";
    }

    if (applyNowBtn) {
        applyNowBtn.addEventListener("click", openModal);
    } else {
        console.error("Apply Now button not found!");
    }

    if (applyLink) {
        applyLink.addEventListener("click", openModal);
    } else {
        console.error("Apply link in navbar not found!");
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    window.addEventListener("click", function (event) {
        if (event.target === applyModal) {
            closeModal();
        }
    });

    applyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const manifestoInput = document.getElementById("manifesto").files[0];
        const video = document.getElementById("video").value;
        const posterInput = document.getElementById("poster").files[0];

        if (!name || !manifestoInput || !video || !posterInput) {
            alert("All fields are required!");
            return;
        }

        const readerPoster = new FileReader();
        const readerManifesto = new FileReader();

        readerManifesto.onload = function () {
            const manifestoUrl = readerManifesto.result;

            readerPoster.onload = function () {
                const posterUrl = readerPoster.result;

                let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

                candidates.push({
                    name,
                    manifesto: manifestoUrl,
                    video,
                    poster: posterUrl
                });

                localStorage.setItem("candidates", JSON.stringify(candidates));

                document.getElementById("statusMessage").innerText = "Application submitted successfully!";

                applyForm.reset();
                closeModal(); 
            };

            readerPoster.readAsDataURL(posterInput);
        };

        readerManifesto.readAsDataURL(manifestoInput);
    });
});
