export default function (imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = event => {
            const image = new Image();

            image.onload = () => {
                resolve(image.src);
            };

            image.onerror = reject;

            image.src = event.target.result;
        };

        reader.readAsDataURL(imageFile);
    });
}