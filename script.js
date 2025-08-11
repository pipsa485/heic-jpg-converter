document.getElementById('fileInput').addEventListener('change', handleFiles);
let progressBar = document.getElementById('progressBar');
let output = document.getElementById('output');

function handleFiles(event) {
    let files = event.target.files;
    let total = files.length;
    let processed = 0;
    output.innerHTML = ''; // Clear previous output

    Array.from(files).forEach((file, index) => {
        if (!file.type.includes('heic') && !file.name.toLowerCase().endsWith('.heic')) {
            alert(`File ${file.name} is not a HEIC image.`);
            return;
        }

        setTimeout(() => {
            heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 })
                .then((convertedBlob) => {
                    processed++;
                    progressBar.style.width = Math.round((processed / total) * 100) + '%';

                    let url = URL.createObjectURL(convertedBlob);
                    let fileName = file.name.replace(/\.heic$/i, '.jpg');

                    let container = document.createElement('div');
                    container.className = 'flex items-center justify-between p-2 bg-gray-50 rounded';
                    let img = document.createElement('img');
                    img.src = url;
                    img.className = 'w-16 h-16 object-cover rounded mr-4';
                    let downloadBtn = document.createElement('button');
                    downloadBtn.className = 'download-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold';
                    downloadBtn.textContent = 'Download JPG';
                    downloadBtn.onclick = () => {
                        let link = document.createElement('a');
                        link.href = url;
                        link.download = fileName;
                        link.click();
                    };
                    container.appendChild(img);
                    container.appendChild(downloadBtn);
                    output.appendChild(container);
                })
                .catch((error) => {
                    console.error('Conversion error:', error);
                    alert(`Failed to convert ${file.name}. Please try again.`);
                    processed++;
                    progressBar.style.width = Math.round((processed / total) * 100) + '%';
                });
        }, index * 500);
    });
}