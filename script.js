var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var profilePictureInput = document.getElementById('profile-picture');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experiance = document.getElementById('experiance').value;
    var skills = document.getElementById('skills').value;
    var profilePictureUrl = null;
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            profilePictureUrl = reader_1.result;
            saveFormData(username, name, email, phone, education, experiance, skills, profilePictureUrl);
        };
        reader_1.readAsDataURL(file);
    }
    else {
        // If no file is selected, just save data without the image
        saveFormData(username, name, email, phone, education, experiance, skills, profilePictureUrl);
    }
});
function saveFormData(username, name, email, phone, education, experiance, skills, profilePictureUrl) {
    //Store the form data in localStorage using the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experiance: experiance,
        skills: skills,
        profilePictureUrl: profilePictureUrl
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n    \n      <div class=\"container-fluid\">\n    \n    <div class=\"row\">\n        <div class=\"col-sm-4 col-md-4 col-lg-4 col-xl-4\">\n            <div class=\"left-section\">\n                  ".concat(profilePictureUrl ? "<img src=\"".concat(profilePictureUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\"/>") : '', "\n                <section id=\"summary\">\n                    <h3 style= \"color:white\">Career Summary</h3>\n                    <p>Looking forword to challenging career in industries and any organizations connected to Web Application with Open Source related fields[PHP, AI and MERN]</p>\n                </section>\n                <section id=\"certifications\">\n    <h3 style=\"color:white\">Certifications</h3>\n    <p>I have obtained various certifications in web development, programming, and related technologies. These certifications have helped me enhance my technical skills, stay updated with industry trends, and demonstrate my commitment to professional growth. They include courses in software development, cloud computing, AI, and digital marketing. Each certification has equipped me with the practical knowledge to tackle real-world challenges in the tech industry. I am always seeking opportunities to expand my skill set through continuous learning.</p>\n</section>\n\n            </div>\n        </div>\n        \n        <div class=\"col-sm-8 col-md-8 col-lg-8 col-xl-8\">\n            <div class=\"right-section\">\n                <h1>Shareable Interactive Resume</h1>\n                <section id=\"personal-info\">\n                    <h3>Personal Information</h3>\n                    <p><b>Name:</b>").concat(name, "</p>\n                    <p><b>Phone:</b> ").concat(phone, "</p>\n                    <p><b>Email:</b><a href=\"mailto:xyz@gmail.com\"></a> ").concat(email, "</p>\n                </section>\n        \n                <section id=\"education\">\n                    <h3>Education</h3>\n                    <p>").concat(education, "</p>\n                </section>\n        \n                <section id=\"skills\">\n                    <h3>Skills</h3>\n                     <p>").concat(skills, "</p>\n                </section>\n        \n                <section id=\"work-experiance\">\n                    <h3>Work Experiance</h3>\n                     <p>").concat(experiance, "</p>\n                </section>\n        \n            </div>\n        </div>\n      </div>\n</div>\n    ");
    //display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //Create a shareable URL that includes just the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
}
//Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    var username = document.getElementById('username').value;
    var resumeData = JSON.parse(localStorage.getItem(username) || '{}');
    //window.resumeDisplayElement.print();
    var printWindow = window.open('', '_blank', 'width=600,height=400');
    // Write the content of the div into the new window
    printWindow.document.open();
    printWindow.document.write("\n            <link rel=\"stylesheet\" href=\"../assets/css/style.css\">\n      <div class=\"container-fluid\">\n    \n    <div class=\"row\">\n        <div class=\"col-sm-4 col-md-4 col-lg-4 col-xl-4\">\n            <div class=\"left-section\">\n                ".concat(resumeData.profilePictureUrl ? "<img src=\"".concat(resumeData.profilePictureUrl, "\" alt=\"Profile Picture\" class=\"profile-picture\"/>") : '', "\n                <section id=\"summary\">\n                    <h3 style= \"color:white\">Career Summary</h3>\n                    <p>Looking forword to challenging career in industries and any organizations connected to Web Application with Open Source related fields[PHP, AI and MERN]</p>\n                </section>\n                <section id=\"certifications\">\n    <h3 style=\"color:white\">Certifications</h3>\n    <p>I have obtained various certifications in web development, programming, and related technologies. These certifications have helped me enhance my technical skills, stay updated with industry trends, and demonstrate my commitment to professional growth. They include courses in software development, cloud computing, AI, and digital marketing. Each certification has equipped me with the practical knowledge to tackle real-world challenges in the tech industry. I am always seeking opportunities to expand my skill set through continuous learning.</p>\n</section>\n\n            </div>\n        </div>\n        \n        <div class=\"col-sm-8 col-md-8 col-lg-8 col-xl-8\">\n            <div class=\"right-section\">\n                <h1>Shareable Interactive Resume</h1>\n                <section id=\"personal-info\">\n                    <h3>Personal Information</h3>\n                    <p><b>Name:</b>").concat(resumeData.name, "</p>\n                    <p><b>Phone:</b> ").concat(resumeData.phone, "</p>\n                    <p><b>Email:</b><a href=\"mailto:").concat(resumeData.email, "\">").concat(resumeData.email, "</a></p>\n                </section>\n        \n                <section id=\"education\">\n                    <h3>Education</h3>\n                     <p>").concat(resumeData.education, "</p>\n                     \n                </section>\n        \n                <section id=\"skills\">\n                    <h3>Skills</h3>\n                    <p>").concat(resumeData.skills, "</p>\n                    \n                </section>\n        \n                <section id=\"work-experiance\">\n                    <h3>Work Experiance</h3>\n                    <p>").concat(resumeData.experiance, "</p>\n                        \n                </section>\n        \n\n            </div>\n        </div>\n      </div>\n</div>\n    "));
    printWindow.print();
});
//Automatically populate the form using the username found in the URL.
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experiance').value = resumeData.experiance;
            document.getElementById('skills').value = resumeData.skills;
            if (resumeData.profilePictureUrl) {
                var imgElement = document.createElement('img');
                imgElement.src = resumeData.profilePictureUrl;
                imgElement.classList.add('profile-picture');
                document.querySelector('.left-section').appendChild(imgElement);
            }
        }
    }
});
