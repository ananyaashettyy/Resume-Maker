document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const titleInput = document.getElementById("title");
    const summaryInput = document.getElementById("summary");
    const educationInput = document.getElementById("education");
    const experienceInput = document.getElementById("experience");
    const skillsInput = document.getElementById("skills");
    const profilePictureInput = document.getElementById("profilePicture");
    const previewImage = document.getElementById("previewImage");

    const previewName = document.getElementById("previewName");
    const previewTitle = document.getElementById("previewTitle");
    const previewSummary = document.getElementById("previewSummary");
    const previewEducation = document.getElementById("previewEducation");
    const previewExperience = document.getElementById("previewExperience");
    const previewSkills = document.getElementById("previewSkills");

    const resumePreview = document.getElementById("resumePreview");
    const downloadBtn = document.getElementById("downloadBtn");

    
    const now = new Date();
    const hours = now.getHours();
    const body = document.body;

    if (hours >= 6 && hours < 12) {
        body.classList.add("morning");
    } else if (hours >= 12 && hours < 18) {
        body.classList.add("afternoon");
    } else {
        body.classList.add("evening");
    }

    function updatePreview() {
        previewName.textContent = nameInput.value || "Your Name";
        previewTitle.textContent = titleInput.value || "Your Title";
        previewSummary.textContent = summaryInput.value || "Your Summary";
        previewEducation.textContent = educationInput.value || "Your Education";
        previewExperience.textContent = experienceInput.value || "Your Experience";
        previewSkills.textContent = skillsInput.value || "Your Skills";
    }

    
    profilePictureInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file (PNG or JPEG).");
        }
    });

    
    nameInput.addEventListener("input", updatePreview);
    titleInput.addEventListener("input", updatePreview);
    summaryInput.addEventListener("input", updatePreview);
    educationInput.addEventListener("input", updatePreview);
    experienceInput.addEventListener("input", updatePreview);
    skillsInput.addEventListener("input", updatePreview);

    
    document.getElementById("generateBtn").addEventListener("click", function () {
        resumePreview.style.display = "block";
        document.querySelector("form").style.display = "none";
    });

    downloadBtn.addEventListener("click", function () {
        const resume = document.getElementById("resumePreview");
        const opt = {
            margin: 1,
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };
        html2pdf().from(resume).set(opt).save();
    });
});
