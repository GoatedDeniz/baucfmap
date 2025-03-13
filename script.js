// Classroom mapping (Classroom → Floor)
const classrooms = {
    "GLTTV": -2, "DARKROOM": -2, "GLTMOVIE": -2, "GLTEDIT1": -2, "GLTEDIT2": -2, 
    "GLTEDIT3": -2, "GLTCEP": -2,
    "GLTSC01": 2, "GLTSC03": 2, "GLTBUG": 2,
    "GLT301 (NETFLIX CLASS)": 3, "FTV GREEN BOX STUDIO": 3, "SONY VLOG STUDIO": 3, "CINEMA (CINE-HALL)": 3,
    "VR LAB": 4, "AQUARIUM CLASS": 4,
    "GLTSC02": 5, "GLTMAC01": 5,
    "GLTBASIC": 6, "GLTANIM": 6, "GLTMAC02": 6, "GLT601": 6,
    "GLT705": 7, "GLT701": 7, "GLT704": 7, "GLT702": 7, "GLTMAC03": 7, "GLT703": 7
};

// Floor colors
const floorColors = {
    0: "#000000",
    2: "#E888B7",
    3: "#618E3F",
    4: "#2D541A",
    5: "#B6373D",
    6: "#764695",
    7: "#96D6D8",
    8: "#F08211",
    9: "#FFD022"
};

// Function to convert classroom names to valid file format
function formatClassroomName(classroom) {
    return classroom.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Function to show the selected floor (Now Loads Highlighted SVGs if available)
function showFloor(floor, highlight = null) {
    let floorMap = document.getElementById("floorMap");

    // Determine the correct file to load
    let baseFileName = `floor-${floor}`;
    let fileToLoad = highlight ? `${baseFileName}.${formatClassroomName(highlight)}.svg` : `${baseFileName}.svg`;

    // Load SVG from GitHub raw link
    const svgUrl = `https://raw.githubusercontent.com/GoatedDeniz/baucfmap/main/${fileToLoad}`;
    
    floorMap.src = svgUrl;
    floorMap.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails
        this.src = `https://raw.githubusercontent.com/GoatedDeniz/baucfmap/main/${baseFileName}.svg`;
    };

    // Update active button and set its color
    document.querySelectorAll(".floor-selector button").forEach(button => {
        button.classList.remove("active");
        button.style.background = "white"; // Reset all buttons
        button.style.color = "black"; // Reset text color
    });

    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
        selectedButton.style.background = floorColors[floor] || "gray"; // Set background color
        selectedButton.style.color = "white"; // Change text color
    }

    // Ensure suggestions disappear when floor changes
    hideSuggestions();
}

// Function to handle search
document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let query = this.value.toUpperCase().trim();
        
        if (classrooms[query]) {
            showFloor(classrooms[query], query); // Switch to highlighted floor plan
            this.value = ""; // Clear search input
        }

        hideSuggestions(); // Close auto-suggestions immediately
        event.preventDefault(); // Prevent unnecessary form submission on mobile
    }
});

// Function to update auto-suggestions
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
            suggestion.onclick = function() {
                document.getElementById("searchInput").value = classroom;
                showFloor(classrooms[classroom], classroom); // Show highlighted version
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
document.getElementById("searchInput").addEventListener("input", function() {
    updateSuggestions(this.value.toUpperCase().trim());
});