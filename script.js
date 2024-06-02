// Listen for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Code to execute when the DOM is fully loaded

    console.log('woof');
    fetchRandomDogImage();

    // Fetch dog breeds
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => {
            if(res.ok){
                console.log("success");
                return res.json();
            }
            else{
                console.log("error");
            }
        })
        .then(data => {
            return data;
        })
        .then(data => {
            const jsonObject = data.message;
            const breedListContainer = document.getElementById('breed-list');
            for (let breed in jsonObject) {
                const breedListItem = document.createElement('div');
                breedListItem.className = 'breed-item';
                
                const breedName = document.createElement('div');
                breedName.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                breedName.className = 'breed-name';
                breedListItem.appendChild(breedName);

                const breedImage = document.createElement('img');
                breedImage.className = 'breed-image';
                breedImage.style.display = 'none';
                breedListItem.appendChild(breedImage);

                breedListItem.addEventListener('click', () => {
                    fetchBreedImage(breed, breedImage); // Fetch image of the breed
                });

                breedListContainer.appendChild(breedListItem);
            }
        });
});

function reloadPage() {
    location.reload();
}

// Function to extract breed from URL
function extractBreedFromUrl(url) {
    // Look for the part after 'breeds/'
    const breedPart = url.split('breeds/')[1].split('/')[0];
    return breedPart;
}

// Function to add HTML content
function addHtmlContent(imageUrl) {
    var breed = extractBreedFromUrl(imageUrl); 
    var htmlContent = `<div>AWW look at this cute ${breed}</div>`;
    document.getElementsByClassName('description')[0].innerHTML += htmlContent;
    console.log("The dog breed is " + breed);
}

// Function to fetch random dog image
async function fetchRandomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    if (data.status === "success") {
        const imageUrl = data.message;
        addHtmlContent(imageUrl); // Call addHtmlContent() with imageUrl as argument
        const imageDiv = document.createElement('div');
        const imageElement = document.createElement('img');

        imageElement.src = imageUrl;
        imageElement.alt = "Random Dog Image";
        imageDiv.appendChild(imageElement);

        document.getElementById('dog-image-container').appendChild(imageDiv);
    } else {
        console.error('Failed to fetch the image.');
    }
}

// async function fetchBreedImage(breed) {
//     try {
//         const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
//         const data = await response.json();

//         if (data.status === "success") {
//             const imageUrl = data.message;
//             displayImageInModal(imageUrl);
//         } else {
//             throw new Error('Failed to fetch the image');
//         }
//     } catch (error) {
//         console.error('Error fetching image:', error);
//     }
// }

async function fetchBreedImage(breed, breedImageElement) {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();

        if (data.status === "success") {
            const imageUrl = data.message;
            breedImageElement.src = imageUrl;
            breedImageElement.style.display = 'block';
        } else {
            throw new Error('Failed to fetch the image');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}



function displayImageInModal(imageUrl) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    modalImg.src = imageUrl;

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

