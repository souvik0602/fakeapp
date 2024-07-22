
let selectedFileInput = null;

document.getElementById('input1').addEventListener('click', () => selectedFileInput = 'fileInput1');
document.getElementById('input2').addEventListener('click', () => selectedFileInput = 'fileInput2');
document.getElementById('input3').addEventListener('click', () => selectedFileInput = 'fileInput3');
document.getElementById('input4').addEventListener('click', () => selectedFileInput2 = 'fileInput4');
document.getElementById('input5').addEventListener('click', () => selectedFileInput2 = 'fileInput5');
document.getElementById('input6').addEventListener('click', () => selectedFileInput2 = 'fileInput6');
document.getElementById('input7').addEventListener('click', () => selectedFileInput3 = 'fileInput7');
document.getElementById('input8').addEventListener('click', () => selectedFileInput3 = 'fileInput8');
document.getElementById('input9').addEventListener('click', () => selectedFileInput3 = 'fileInput9');
document.getElementById('input10').addEventListener('click', () => selectedFileInput3 = 'fileInput10');
document.getElementById('input11').addEventListener('click', () => selectedFileInput3 = 'fileInput11');
document.getElementById('input12').addEventListener('click', () => selectedFileInput3 = 'fileInput12');

async function uploadImage() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "";
    if (!selectedFileInput) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const fileInput = document.getElementById(selectedFileInput);
    if (fileInput.files.length === 0) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    let url;
    switch (selectedFileInput) {
        case 'fileInput1':
            url = 'http://10.240.12.205:8002/upload-img-forge/';
            resultDiv.textContent = "Processing...";
            break;
        case 'fileInput2':
            url = 'http://10.240.12.205:8001/upload-img-df/';
            resultDiv.textContent = "Processing...";
            break;
        case 'fileInput3':
            url = 'http://10.240.12.80:8000/upload_image';
            resultDiv.textContent = "Processing...";
            break;
        
        default:
            resultDiv.textContent = "Error: Invalid input selection.";
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
        resultDiv.textContent = `Prediction: ${data.Prediction}`;
        selectedFileInput = null;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        selectedFileInput = null;
    }
}

async function uploadAudio() {
    const resultDiv = document.getElementById('result2');
    if (!selectedFileInput2) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const fileInput = document.getElementById(selectedFileInput2);
    if (fileInput.files.length === 0) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    let url;
    switch (selectedFileInput2) {
        case 'fileInput4':
            url = 'http://10.240.12.205:8002/upload-img-forge/';
            break;
        case 'fileInput5':
            url = 'http://10.240.12.205:8001/upload-img-df/';
            break;
        case 'fileInput6':
            url = 'http://10.240.12.80:8000/upload_image';
            break;
       
        default:
            resultDiv.textContent = "Error: Invalid input selection.";
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
        resultDiv.textContent = `Prediction: ${data.Prediction}`;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
}

async function uploadVideo() {
    const resultDiv = document.getElementById('result3');
    if (!selectedFileInput3) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const fileInput = document.getElementById(selectedFileInput2);
    if (fileInput.files.length === 0) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    let url;
    switch (selectedFileInput3) {
        case 'fileInput7':
            url = 'http://10.240.12.205:8002/upload-img-forge/';
            break;
        case 'fileInput8':
            url = 'http://10.240.12.205:8001/upload-img-df/';
            break;
        case 'fileInput9':
            url = 'http://10.240.12.80:8000/upload_image';
            break;

        case 'fileInput10':
            url = 'http://10.240.12.205:8002/upload-img-forge/';
            break;
        case 'fileInput11':
            url = 'http://10.240.12.205:8001/upload-img-df/';
            break;
        case 'fileInput12':
            url = 'http://10.240.12.80:8000/upload_image';
            break;
       
        default:
            resultDiv.textContent = "Error: Invalid input selection.";
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
        resultDiv.textContent = `Prediction: ${data.Prediction}`;
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
}