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

// Function to show a floor (Supports Highlighted Classroom Versions)
function showFloor(floor, classroom = null) {
    let floorMap = document.getElementById("floorMap");

    // Check if a classroom was searched and exists in the floor data
    let svgFile = classroom 
        ? `floor-${floor}.${classroom.toLowerCase().replace(/\s+/g, '')}.svg`  // Highlighted version
        : `floor-${floor}.svg`;  // Default floor plan

    // Load SVG from GitHub
    const svgUrl = `https://raw.githubusercontent.com/GoatedDeniz/baucfmap/main/${svgFile}`;
    
    floorMap.src = svgUrl;
    floorMap.onerror = function() {
        this.onerror = null; // Prevent infinite loop if fallback also fails
        this.src = 'fallback.jpg'; 
    };

    // Remove "active" class from all buttons
    document.querySelectorAll(".floor-selector button").forEach(button => button.classList.remove("active"));

    // Add "active" class to the clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    // Ensure suggestions disappear when floor changes
    hideSuggestions();
}

// Function to handle search (Redirects to Highlighted Classroom Floor Map)
document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let query = this.value.toUpperCase().trim();
        
        if (classrooms[query]) {
            showFloor(classrooms[query], query); // Load the highlighted version
            this.value = ""; // Clear search input
        }

        hideSuggestions(); // Close auto-suggestions immediately
        event.preventDefault(); // Prevent unnecessary form submission on mobile
    }
});