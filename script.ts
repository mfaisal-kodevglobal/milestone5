const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;

form.addEventListener('submit',(event: Event) => {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experiance = (document.getElementById('experiance') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    let profilePictureUrl: string | null = null;
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            profilePictureUrl = reader.result as string;
            saveFormData(username, name, email, phone, education, experiance, skills, profilePictureUrl);
        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected, just save data without the image
        saveFormData(username, name, email, phone, education, experiance, skills, profilePictureUrl);
    }
});

function saveFormData(username: string, name: string, email: string, phone: string, education: string, experiance: string, skills: string, profilePictureUrl: string | null) {

    //Store the form data in localStorage using the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experiance,
        skills,
        profilePictureUrl
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    
    const resumeHTML = `
    
      <div class="container-fluid">
    
    <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <div class="left-section">
                  ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="Profile Picture" class="profile-picture"/>` : ''}
                <section id="summary">
                    <h3 style= "color:white">Career Summary</h3>
                    <p>Looking forword to challenging career in industries and any organizations connected to Web Application with Open Source related fields[PHP, AI and MERN]</p>
                </section>
                <section id="certifications">
    <h3 style="color:white">Certifications</h3>
    <p>I have obtained various certifications in web development, programming, and related technologies. These certifications have helped me enhance my technical skills, stay updated with industry trends, and demonstrate my commitment to professional growth. They include courses in software development, cloud computing, AI, and digital marketing. Each certification has equipped me with the practical knowledge to tackle real-world challenges in the tech industry. I am always seeking opportunities to expand my skill set through continuous learning.</p>
</section>

            </div>
        </div>
        
        <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div class="right-section">
                <h1>Shareable Interactive Resume</h1>
                <section id="personal-info">
                    <h3>Personal Information</h3>
                    <p><b>Name:</b>${name}</p>
                    <p><b>Phone:</b> ${phone}</p>
                    <p><b>Email:</b><a href="mailto:xyz@gmail.com"></a> ${email}</p>
                </section>
        
                <section id="education">
                    <h3>Education</h3>
                    <p>${education}</p>
                </section>
        
                <section id="skills">
                    <h3>Skills</h3>
                     <p>${skills}</p>
                </section>
        
                <section id="work-experiance">
                    <h3>Work Experiance</h3>
                     <p>${experiance}</p>
                </section>
        
            </div>
        </div>
      </div>
</div>
    `;

    //display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    //Create a shareable URL that includes just the username
    const shareableURL = 
    `${window.location.origin}?username=${encodeURIComponent(username)}`;

    //Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
}

//Handle PDF download
downloadPdfButton.addEventListener('click', () =>{
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const resumeData = JSON.parse(localStorage.getItem(username) || '{}');
    //window.resumeDisplayElement.print();
     const printWindow:any = window.open('', '_blank', 'width=600,height=400');

    // Write the content of the div into the new window
    printWindow.document.open();
    printWindow.document.write(`
            <link rel="stylesheet" href="../assets/css/style.css">
      <div class="container-fluid">
    
    <div class="row">
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <div class="left-section">
                ${resumeData.profilePictureUrl ? `<img src="${resumeData.profilePictureUrl}" alt="Profile Picture" class="profile-picture"/>` : ''}
                <section id="summary">
                    <h3 style= "color:white">Career Summary</h3>
                    <p>Looking forword to challenging career in industries and any organizations connected to Web Application with Open Source related fields[PHP, AI and MERN]</p>
                </section>
                <section id="certifications">
    <h3 style="color:white">Certifications</h3>
    <p>I have obtained various certifications in web development, programming, and related technologies. These certifications have helped me enhance my technical skills, stay updated with industry trends, and demonstrate my commitment to professional growth. They include courses in software development, cloud computing, AI, and digital marketing. Each certification has equipped me with the practical knowledge to tackle real-world challenges in the tech industry. I am always seeking opportunities to expand my skill set through continuous learning.</p>
</section>

            </div>
        </div>
        
        <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div class="right-section">
                <h1>Shareable Interactive Resume</h1>
                <section id="personal-info">
                    <h3>Personal Information</h3>
                    <p><b>Name:</b>${resumeData.name}</p>
                    <p><b>Phone:</b> ${resumeData.phone}</p>
                    <p><b>Email:</b><a href="mailto:${resumeData.email}">${resumeData.email}</a></p>
                </section>
        
                <section id="education">
                    <h3>Education</h3>
                     <p>${resumeData.education}</p>
                     
                </section>
        
                <section id="skills">
                    <h3>Skills</h3>
                    <p>${resumeData.skills}</p>
                    
                </section>
        
                <section id="work-experiance">
                    <h3>Work Experiance</h3>
                    <p>${resumeData.experiance}</p>
                        
                </section>
        

            </div>
        </div>
      </div>
</div>
    `);
    printWindow.print();
});

//Automatically populate the form using the username found in the URL.
window.addEventListener('DOMContentLoaded', ()=> {
    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experiance') as HTMLTextAreaElement).value = resumeData.experiance;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
            if (resumeData.profilePictureUrl) {
                const imgElement = document.createElement('img');
                imgElement.src = resumeData.profilePictureUrl;
                imgElement.classList.add('profile-picture');
                document.querySelector('.left-section').appendChild(imgElement);
            }
        }
    }
});
