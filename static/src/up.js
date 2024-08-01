let currentExpandedSection = null; // Track the currently expanded section

document.addEventListener('DOMContentLoaded', () => {
    // Existing file input event listeners
    const fileInput1 = document.getElementById('fileInput1');
    const fileInput2 = document.getElementById('fileInput2');
    const fileInput3 = document.getElementById('fileInput3');
    const resultDiv = document.getElementById('resultImage');
    const resultDiv_aud = document.getElementById('resultAudio');
    const resultDiv_vid = document.getElementById('resultVideo');
    const audioPreview = document.getElementById('audioPreview');
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');

    fileInput1.addEventListener('change', () => {
        const fileName = fileInput1.files.length ? fileInput1.files[0].name : "No file selected";
        document.getElementById('fileName').textContent = fileName;
        // clearRadioButtons('analysis');
        resultDiv.style.setProperty('background-color', 'white', 'important');
        resultDiv.textContent = '';
        resultDiv.style.setProperty('border', '2px solid white', 'important');
        imagePreview.src = "";
        imagePreview.style.display = 'none';

    });


    
    fileInput2.addEventListener('change', () => {
        const fileName = fileInput2.files.length ? fileInput2.files[0].name : "No file selected";
        document.getElementById('fileNameAudio').textContent = fileName;
        //clearRadioButtons('audioAnalysis');
        resultDiv_aud.style.setProperty('background-color', 'white', 'important');
        resultDiv_aud.textContent = '';
        resultDiv_aud.style.setProperty('border', '2px solid white', 'important');
        audioPreview.src = "";
        audioPreview.style.display = 'none';
       
    });

    fileInput3.addEventListener('change', () => {
        const fileName = fileInput3.files.length ? fileInput3.files[0].name : "No file selected";
        document.getElementById('fileNameVideo').textContent = fileName;
        //clearRadioButtons('videoAnalysis');
        resultDiv_vid.style.setProperty('background-color', 'white', 'important');
        resultDiv_vid.textContent = '';
        resultDiv_vid.style.setProperty('border', '2px solid white', 'important');
        videoPreview.src = "";
        videoPreview.style.display = 'none';
        
    });
});

function clearRadioButtons(name) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
        radio.checked = false;
    });
}


function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const dataURL = reader.result;
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = dataURL;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
}


function previewAudio(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const dataURL = reader.result;
        const audioPreview = document.getElementById('audioPreview');
        audioPreview.src = dataURL;
        audioPreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
}

function previewVideo(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function() {
        const dataURL = reader.result;
        console.log(dataURL);
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.src = dataURL;
        videoPreview.style.display = 'block';
    };
    
    reader.readAsDataURL(input.files[0]);
}

//toggle
function toggleSection(sectionId, buttonId) {
	const section = document.getElementById(sectionId);
	const button = document.getElementById(buttonId);
	const sections = ['imageContainer', 'audioContainer', 'videoContainer'];
	const buttons = ['toggleImageButton', 'toggleAudioButton', 'toggleVideoButton'];
    const audioPreview = document.getElementById('audioPreview');
    const imagePreview = document.getElementById('imagePreview');
    const videoPreview = document.getElementById('videoPreview');

	const resultDiv = document.getElementById('resultImage');
    //resultDiv.style.setProperty('color', 'black', 'important'); // Reset color
    resultDiv.style.setProperty('background-color', 'white', 'important'); // Reset border
    resultDiv.style.setProperty('border', '2px solid white', 'important');

    const resultDiv_aud = document.getElementById('resultAudio');
    //resultDiv.style.setProperty('color', 'black', 'important'); // Reset color
    resultDiv_aud.style.setProperty('background-color', 'white', 'important'); // Reset border
    resultDiv_aud.style.setProperty('border', '2px solid white', 'important');

    const resultDiv_vid = document.getElementById('resultVideo');
    resultDiv_vid.style.setProperty('background-color', 'white', 'important'); // Reset border
    resultDiv_vid.style.setProperty('border', '2px solid white', 'important');

	// Hide all sections and reset all buttons
    sections.forEach(id => {
        const sec = document.getElementById(id);
        const btn = document.getElementById(buttons[sections.indexOf(id)]);
        if (id !== sectionId) {
            sec.classList.add('hidden');
            btn.classList.remove('active');
            sec.classList.add('small-font');
        } else {
            sec.classList.remove('small-font');
        }
    });


	// Reset all file inputs and labels
	document.querySelectorAll('.file-input-group').forEach(group => {
		const input = group.querySelector('input[type="file"]');
        const paragraph = group.querySelector('p'); // Select the <p> element
        input.value = ''; // Clear the file input value (optional)
        paragraph.textContent = 'No file selected'; // Set the text content of <p> element
        imagePreview.src = "";
        imagePreview.style.display = 'none';
        audioPreview.src = "";
        audioPreview.style.display = 'none';
        videoPreview.src = "";
        videoPreview.style.display = 'none';
       
	});

    imagePreview.src = "";
    imagePreview.style.display = 'none';
    audioPreview.src = "";
    audioPreview.style.display = 'none';
    videoPreview.src = "";
    videoPreview.style.display = 'none';

	// Deselect all radio buttons
	document.querySelectorAll('input[type="radio"]').forEach(radio => {
		radio.checked = false;
        radio.disabled=false;
	});

	// Clear result divs
	document.querySelectorAll('.result').forEach(result => {
		result.textContent = '';
	});

	// Toggle the current section
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        button.classList.add('active');
    } else {
        section.classList.add('hidden');
        button.classList.remove('active');
    }
}

function getContainerName(containerId) {
    // Return the container name in a human-readable format
    switch (containerId) {
        case 'imageContainer': return 'Image';
        case 'audioContainer': return 'Audio';
        case 'videoContainer': return 'Video';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



//after_upload_file
async function uploadFile(type, resultId, fileInputId, analysisName, urls,authButton) {
    const resultDiv = document.getElementById(resultId);
    resultDiv.style.setProperty('color', 'black', 'important'); // Reset color
    resultDiv.style.setProperty('background-color', 'white', 'important'); // Reset background color
    resultDiv.style.setProperty('border', '2px solid black', 'important');
    const fileInput = document.getElementById(fileInputId);
    const radioButtons = document.querySelectorAll(`input[name="${analysisName}"]`);
    //const authButton = document.querySelector('.auth-button'); // Use class selector

    let selectedAnalysis = null;

    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnalysis = radioButton.value;
            break;
        }
    }

    if (!fileInput.files.length && !selectedAnalysis) {
        resultDiv.textContent = "Please select a file and an analysis type.";
        resultDiv.style.color = 'white';
        resultDiv.style.setProperty('background-color', 'gray', 'important');
        resultDiv.style.setProperty('border', '2px solid black', 'important');
        return;
    }
    if (!fileInput.files.length) {
        resultDiv.textContent = "Please select a file";
        resultDiv.style.color = 'white';
        resultDiv.style.setProperty('background-color', 'gray', 'important');
        resultDiv.style.setProperty('border', '2px solid black', 'important');
        return;
    }

    if (!selectedAnalysis) {
        resultDiv.textContent = "Please select analysis type.";
        resultDiv.style.color = 'white';
        resultDiv.style.setProperty('background-color', 'gray', 'important');
        resultDiv.style.setProperty('border', '2px solid black', 'important');
        return;
    }
    resultDiv.textContent = "Processing...";
    resultDiv.style.color = 'white';
    resultDiv.style.setProperty('background-color', 'gray', 'important');
    resultDiv.style.setProperty('border', '2px solid black', 'important');

    // Disable radio buttons and authButton
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });
    if (authButton) {
        authButton.classList.add('disabled');
        authButton.disabled = true;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const url = urls[selectedAnalysis];
    if (!url) {
        resultDiv.textContent = "Error: Invalid analysis type.";
        for (const radioButton of radioButtons) {
            radioButton.disabled = false;
        }
        if (authButton) {
            authButton.classList.remove('disabled');
            authButton.disabled = false;
        }
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        let data_mod=data.Prediction
        data_mod=data_mod.trim()
        console.log(data_mod); // Debugging line

        const colorMap = {
            Fake: 'red',
            Suspicious: 'yellow',
            Real: 'green',
            Safe: 'green'
        };

        const color = colorMap[data_mod] || 'gray';
        //console.log("color:",colorMap[data.Prediction]);
        resultDiv.textContent = `Prediction: ${data.Prediction}`;
        if (color=='yellow'){
            resultDiv.style.setProperty('color', 'black', 'important');
      
        }
        else{
            resultDiv.style.setProperty('color', 'white', 'important');
        }
       
        resultDiv.style.setProperty('background-color', color, 'important');
        resultDiv.style.setProperty('border', '2px solid black', 'important');
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.style.color = 'white';
        resultDiv.style.setProperty('background-color', 'gray', 'important');
        resultDiv.style.setProperty('border', '2px solid black', 'important');
    } finally {
        // Enable radio buttons and authButton
        for (const radioButton of radioButtons) {
            radioButton.disabled = false;
        }
        if (authButton) {
            authButton.classList.remove('disabled');
            authButton.disabled = false;
        }
    }
}

// Usage for image upload
async function uploadImage() {
    const authButton = document.querySelector('.auth-button[onclick="uploadImage()"]');
    await uploadFile('image', 'resultImage', 'fileInput1', 'analysis', {
        forgery: 'http://10.240.12.168:8001/upload-img-forge/',
        deepfake: 'http://10.240.12.168:8002/upload-img-df/',
        social: 'http://10.240.12.168:8003/upload_image'
    },authButton);
}

// Usage for audio upload
async function uploadAudio() {
    const authButton = document.querySelector('.auth-button[onclick="uploadAudio()"]');
    await uploadFile('audio', 'resultAudio', 'fileInput2', 'audioAnalysis', {
        forgery: 'http://10.240.12.168:8004/upload-aud-forge/',
        deepfake: 'http://10.240.12.168:8005/upload-aud-df/',
        social: 'http://10.240.12.168:8006/upload_audio'
    },authButton);
}

// Usage for video upload
async function uploadVideo(){
    const authButton = document.querySelector('.auth-button[onclick="uploadVideo()"]');
    await uploadFile('video', 'resultVideo', 'fileInput3', 'videoAnalysis', {
        forgery: 'http://10.240.12.205:8002/upload-vid-forge/',
        deepfake: 'http://10.240.12.205:8001/upload-vid-df/',
        social: '#',
        liveness: '#',
        lipsync: '#',
        nsfw: '#'
    },authButton);
}
