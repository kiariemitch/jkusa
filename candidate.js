document.addEventListener("DOMContentLoaded", function () {
    const candidateList = document.querySelector(".candidate-list");
    const candidatesModal = document.getElementById("candidates-modal");
    const allCandidatesList = document.querySelector(".all-candidates-list");
    const seeMoreBtn = document.getElementById("see-more-btn");
    const closeCandidatesBtn = document.querySelector(".close-candidates");
    
    const detailsModal = document.getElementById("candidate-details-modal");
    const closeDetailsBtn = document.querySelector(".close-details");

    let candidates = JSON.parse(localStorage.getItem("candidates")) || [];
    let visibleCount = 3;

    function loadCandidates() {
        candidateList.innerHTML = "";
        candidates.slice(0, visibleCount).forEach(candidate => {
            const candidateDiv = document.createElement("div");
            candidateDiv.classList.add("candidate");
            candidateDiv.innerHTML = `
                <img src="${candidate.poster}" alt="${candidate.name}">
                <h3>${candidate.name}</h3>
                <h3>${candidate.position}</h3>
            `;
            candidateDiv.onclick = () => showCandidateDetails(candidate);
            candidateList.appendChild(candidateDiv);
        });

        if (visibleCount >= candidates.length) {
            seeMoreBtn.style.display = "none";
        } else {
            seeMoreBtn.style.display = "block";
        }
    }

    function showAllCandidates() {
        allCandidatesList.innerHTML = "";
        candidates.forEach(candidate => {
            console.log(candidate)
            const candidateDiv = document.createElement("div");
            candidateDiv.classList.add("candidate-item");
            candidateDiv.innerHTML = `
                <img src="${candidate.poster}" alt="${candidate.name}">
                <h3>${candidate.name}</h3>
                <h3>${candidate.position}</h3>
            `;
            candidateDiv.onclick = () => showCandidateDetails(candidate);
            allCandidatesList.appendChild(candidateDiv);
        });
        candidatesModal.style.display = "flex";
    }

    function showCandidateDetails(candidate) {
        let videoID = "";
        if (candidate.video.includes("youtube.com/watch?v=")) {
            videoID = candidate.video.split("v=")[1].split("&")[0];
        } else if (candidate.video.includes("youtu.be/")) {
            videoID = candidate.video.split("youtu.be/")[1].split("?")[0];
        } else {
            alert("Invalid YouTube URL format.");
            return;
        }

        const embedURL = `https://www.youtube.com/embed/${videoID}`;

        document.getElementById("modal-candidate-name").innerText = candidate.name;
        document.getElementById("modal-candidate-poster").src = candidate.poster;
        document.getElementById("modal-candidate-manifesto").innerHTML = `
            <iframe src="${candidate.manifesto}" width="100%" height="400px"></iframe>
        `;
        document.getElementById("modal-candidate-video").innerHTML = `
            <iframe width="100%" height="250" src="${embedURL}" 
                frameborder="0" allowfullscreen>
            </iframe>
        `;

        detailsModal.style.display = "flex";
    }

    seeMoreBtn.addEventListener("click", showAllCandidates);
    closeCandidatesBtn.addEventListener("click", () => candidatesModal.style.display = "none");
    closeDetailsBtn.addEventListener("click", () => detailsModal.style.display = "none");

    loadCandidates();
});
