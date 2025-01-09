const imageUrls = [
    './Gallery/Image1.jpg',
    './Gallery/Image2.jpg',
    './Gallery/Image3.jpg',
    './Gallery/Image4.webp',
    './Gallery/Image5.jpg',
    './Gallery/Image6.jpg',
    './Gallery/Image7.jpg',
    './Gallery/Image8.jpg',
    './Gallery/Image9.jpeg',
    './Gallery/Image10.jpg',
    './Gallery/Image11.webp',
    './Gallery/Image12.webp',
    './Gallery/Image13.jpg',
    './Gallery/Image14.webp',
];

function createImageGallery(urls) {
const gallery = document.getElementById('gallery');
for (let i = 0; i <urls.length; i++) {
    const img = document.createElement('img');
    img.src = urls[i];
    img.alt = `Image ${i + 1}`;
    img.loading = 'lazy';
    gallery.appendChild(img);
}
}

createImageGallery(imageUrls);
