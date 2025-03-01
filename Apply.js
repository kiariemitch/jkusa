document.getElementById("apply-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const manifestoInput = document.getElementById("manifesto").files[0]; // Corrected manifesto file input
    const video = document.getElementById("video").value;
    const posterInput = document.getElementById("poster").files[0]; // Poster file input

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
            
            document.getElementById("apply-form").reset();
        };

        readerPoster.readAsDataURL(posterInput);
    };

    readerManifesto.readAsDataURL(manifestoInput);
});
