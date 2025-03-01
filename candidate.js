document.addEventListener("DOMContentLoaded", function () {
    const candidateList = document.querySelector(".candidate-list");
    const detailsSection = document.getElementById("candidate-details");
    const seeMoreBtn = document.getElementById("see-more-btn");
    
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
    
        const videoLink = `https://www.youtube.com/watch?v=${videoID}`;
    
        document.getElementById("candidate-name").innerText = candidate.name;
        document.getElementById("candidate-poster").src = candidate.poster;
    
        document.getElementById("candidate-manifesto").innerHTML = `
            <a href="${candidate.manifesto}" target="_blank" class="manifesto-btn">
                📄 View Manifesto
            </a>
        `;
    
        document.getElementById("candidate-video").innerHTML = `
            <a href="${videoLink}" target="_blank" class="youtube-btn">
                ▶ Watch Video
            </a>
        `;
    
        detailsSection.style.display = "block";
    }

    seeMoreBtn.addEventListener("click", function () {
        visibleCount +=4; 
        loadCandidates();
    });

    loadCandidates();
});
