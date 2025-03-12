// Classroom mapping (Classroom → Floor)
const classrooms = {
    "GLTTV": -2, "DARKROOM": -2, "GLTMOVIE": -2, "GLTEDIT1": -2, "GLTEDIT2": -2, 
    "GLTEDIT3": -2, "GLTCEP": -2,
    "GLTSC01": 2, "GLTSC03": 2, "GLTBUG": 2,
    "GLT301 (NETFLIX CLASS)": 3, "FTV GREEN BOX STUDIO": 3, "SONY VLOG STUDIO": 3,  "CINEMA (CINE-HALL)": 3,
    "VR LAB": 4, "AQUARIUM CLASS": 4,
    "GLTSC02": 5, "GLTMAC01": 5,
    "GLTBASIC": 6, "GLTANIM": 6, "GLTMAC02": 6, "GLT601": 6,
    "GLT705": 7, "GLT701": 7, "GLT704": 7, "GLT702": 7, "GLTMAC03": 7, "GLT703": 7
};

// Function to load and display the floor SVG
function showFloor(floor) {
    const floorMapContainer = document.getElementById("floorMapContainer");

    // Clear previous content and show loading text
    floorMapContainer.innerHTML = `<p>Loading floor map...</p>`;

    // Create an <img> element to load the floor map
    const img = document.createElement("img");
    img.src = `floor-${floor}.svg`;
    img.alt = `Floor ${floor} Map`;

    // Handle image loading errors (fallback mechanism)
    img.onerror = function () {
        img.onerror = null;  // Prevent infinite loop
        img.src = "fallback.jpg";
    };

    // Clear the container and append the new image
    img.onload = function () {
        floorMapContainer.innerHTML = "";  // Remove loading text
        floorMapContainer.appendChild(img);
    };

    // Remove "active" class from all buttons
    document.querySelectorAll(".floor-selector button").forEach(button => button.classList.remove("active"));

    // Add "active" class to the selected floor button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    // Ensure suggestions disappear when a floor is selected
    hideSuggestions();
}

// Function to handle classroom search
document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let query = this.value.toUpperCase().trim();

        if (classrooms[query]) {
            showFloor(classrooms[query]); // Switch to correct floor
            this.value = ""; // Clear search input
        }

        hideSuggestions(); // Close auto-suggestions
        event.preventDefault(); // Prevent form submission on mobile
    }
});

// Function to update auto-suggestions dynamically
function updateSuggestions(query) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
        hideSuggestions();
        return;
    }

    let matched = Object.keys(classrooms).filter(classroom => classroom.includes(query));

    if (matched.length > 0) {
        matched.forEach(classroom => {
            let suggestion = document.createElement("li");
            suggestion.textContent = classroom;
            suggestion.onclick = function () {
                document.getElementById("searchInput").value = classroom;
                showFloor(classrooms[classroom]); // Redirect on click
                hideSuggestions();
            };
            suggestionsBox.appendChild(suggestion);
        });
        suggestionsBox.style.display = "block";
    } else {
        hideSuggestions();
    }
}

// Function to hide suggestions
function hideSuggestions() {
    document.getElementById("suggestions").style.display = "none";
}

// Hide suggestions when clicking outside the search bar
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-container")) {
        hideSuggestions();
    }
});

// Listen for input changes to update suggestions dynamically
document.getElementById("searchInput").addEventListener("input", function () {
    updateSuggestions(this.value.toUpperCase().trim());
});