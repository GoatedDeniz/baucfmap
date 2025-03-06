// Classroom mapping (Classroom → Floor)
const classrooms = {
    "GLTTV": -2, "DARKROOM": -2, "GLTMOVIE": -2, "GLTEDIT1": -2, "GLTEDIT2": -2, 
    "GLTEDIT3": -2, "GLTCEP": -2,
    "GLTSC01": 2, "GLTSC03": 2, "GLTBUG": 2,
    "GLT301": 3, "NETFLIX CLASS": 3, "FTV GREEN BOX STUDIO": 3, "SONY VLOG STUDIO": 3,
    "VR LAB": 4, "AQUARIUM CLASS": 4,
    "GLTSC02": 5, "GLTMAC01": 5,
    "GLTBASIC": 6, "GLTANIM": 6, "GLTMAC02": 6, "GLT601": 6,
    "GLT705": 7, "GLT701": 7, "GLT704": 7, "GLT702": 7, "GLTMAC03": 7, "GLT703": 7
};

// Function to show the selected floor
function showFloor(floor) {
    document.getElementById("floorMap").src = `floor-${floor}.png`;

    // Remove "active" class from all buttons
    document.querySelectorAll(".floor-selector button").forEach(button => button.classList.remove("active"));

    // Add "active" class to the clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Function to handle search
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    let query = this.value.toUpperCase().trim();

    if (event.key === "Enter" && classrooms[query]) {
        showFloor(classrooms[query]); // Switch to correct floor
        this.value = ""; // Clear search input
        document.getElementById("suggestions").style.display = "none"; // Hide suggestions
    }

    updateSuggestions(query);
});

// Function to update auto-suggestions
function updateSuggestions(query) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    let matched = Object.keys(classrooms).filter(classroom => classroom.includes(query));
    
    if (matched.length > 0) {
        matched.forEach(classroom => {
            let suggestion = document.createElement("li");
            suggestion.textContent = classroom;
            suggestion.onclick = function() {
                document.getElementById("searchInput").value = classroom;
                showFloor(classrooms[classroom]); // Redirect on click
                suggestionsBox.style.display = "none";
            };
            suggestionsBox.appendChild(suggestion);
        });
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
}
