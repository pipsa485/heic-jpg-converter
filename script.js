document.getElementById('fileInput').addEventListener('change', handleFiles);
let progressBar = document.getElementById('progressBar');

function handleFiles(event) {
    let files = event.target.files;
    let total = files.length;
    let processed = 0;

    Array.from(files).forEach((file, index) => {
        setTimeout(() => {
            processed++;
            progressBar.style.width = Math.round((processed / total) * 100) + '%';
        }, index * 500);
    });
}

function downloadZip() {
    alert('ZIP download feature coming soon!');
}
