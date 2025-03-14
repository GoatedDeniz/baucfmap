// Classroom mapping (Classroom → Floor)
const classrooms = {
    "GLTTV": -2, "DARKROOM": -2, "GLTMOVIE": -2, "GLTEDIT1": -2, "GLTEDIT2": -2, 
    "GLTEDIT3": -2, "GLTCEP": -2,
    "GLTSC01": 2, "GLTSC03": 2, "GLTBUG": 2,
    "GLT301 (NETFLIX CLASS)": 3, "FTV GREEN BOX STUDIO": 3, "GLTVLOG": 3, "CINEMA (CINE-HALL)": 3,
    "VR LAB": 4, "AQUARIUM CLASS": 4,
    "GLTSC02": 5, "GLTMAC01 (TANZER MAC)": 5,
    "GLTBASIC": 6, "GLTANIM": 6, "GLTMAC02": 6, "GLT601": 6,
    "GLT705": 7, "GLT701": 7, "GLT704": 7, "GLT702": 7, "GLTMAC03": 7, "GLT703": 7
};

// Detect if dark mode is enabled
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to format classroom names to valid file format
function formatClassroomName(classroom) {
    return classroom.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Function to show the selected floor (Loads Dark Mode Versions if Needed)
function showFloor(floor, highlight = null) {
    let floorMap = document.getElementById("floorMap");

    // Determine file naming format
    let darkModeSuffix = isDarkMode() ? "-dark" : "";
    let baseFileName = `floor-${floor}${darkModeSuffix}`;
    let fileToLoad = highlight ? `${baseFileName}.${formatClassroomName(highlight)}.svg` : `${baseFileName}.svg`;

    // Load SVG from GitHub
    const svgUrl = `https://raw.githubusercontent.com/GoatedDeniz/baucfmap/main/${fileToLoad}`;
    
    floorMap.src = svgUrl;
    floorMap.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback fails
        this.src = `https://raw.githubusercontent.com/GoatedDeniz/baucfmap/main/floor-${floor}.svg`; // Default to light mode version
    };

    // Remove "active" class from all buttons
    document.querySelectorAll(".floor-selector button").forEach(button => {
        button.classList.remove("active");
        button.style.backgroundColor = ""; // Reset button color
        button.style.color = ""; // Reset text color
    });

    // Add "active" class and change color of clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");

        // Change button background color based on floor theme
        if (floorColors[floor]) {
            selectedButton.style.backgroundColor = floorColors[floor];
            selectedButton.style.color = "#FFFFFF"; // Ensure text is visible
        } else {
            selectedButton.style.backgroundColor = "#CCCCCC"; // Default gray if no color found
            selectedButton.style.color = "#000000";
        }
    }

    // Ensure suggestions disappear when floor changes
    hideSuggestions();
}

// Function to handle search and load highlighted version
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

// Automatically switch maps if dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    let activeFloor = document.querySelector(".floor-selector button.active");
    if (activeFloor) {
        let floor = activeFloor.getAttribute("data-floor");
        showFloor(floor);
    }
});