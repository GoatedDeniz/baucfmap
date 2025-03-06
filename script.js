// List of classrooms and their corresponding IDs
const classrooms = {
    "GLTSC01": "classroom-GLTSC01",
    "GLTSC03": "classroom-GLTSC03",
    "GLTBUG": "classroom-GLTBUG"
};

// Function to show the selected floor
function showFloor(floor) {
    // Update the floor map image
    document.getElementById("floorMap").src = `floor-${floor}.png`;

    // Remove "active" class from all buttons
    let buttons = document.querySelectorAll(".floor-selector button");
    buttons.forEach(button => button.classList.remove("active"));

    // Add "active" class to the clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Function to highlight searched classrooms
document.getElementById("searchInput").addEventListener("input", function() {
    let query = this.value.toUpperCase().trim();

    // Remove previous highlights
    document.querySelectorAll(".classroom-label").forEach(el => el.classList.remove("highlight"));

    // Highlight the correct classroom if found
    if (classrooms[query]) {
        document.getElementById(classrooms[query]).classList.add("highlight");
    }
});
