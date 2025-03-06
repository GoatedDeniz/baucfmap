// Classroom data linking classrooms to floors
const classrooms = {
    "GLTSC01": { floor: 2, id: "classroom-GLTSC01" },
    "GLTSC03": { floor: 2, id: "classroom-GLTSC03" },
    "GLTBUG": { floor: 2, id: "classroom-GLTBUG" },
    "ABC123": { floor: 3, id: "classroom-ABC123" }
};

// Function to show the selected floor
function showFloor(floor) {
    // Update the floor map image
    document.getElementById("floorMap").src = `floor-${floor}.png`;

    // Hide all classroom labels
    document.querySelectorAll(".classroom-labels").forEach(el => el.style.display = "none");

    // Show labels for the selected floor
    let floorLabels = document.getElementById(`floor-${floor}-labels`);
    if (floorLabels) {
        floorLabels.style.display = "block";
    }

    // Remove "active" class from all buttons
    let buttons = document.querySelectorAll(".floor-selector button");
    buttons.forEach(button => button.classList.remove("active"));

    // Add "active" class to the clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}

// Function to highlight searched classrooms and switch floors
document.getElementById("searchInput").addEventListener("input", function() {
    let query = this.value.toUpperCase().trim();

    // Remove previous highlights
    document.querySelectorAll(".classroom-label").forEach(el => el.classList.remove("highlight"));

    // Check if the searched classroom exists
    if (classrooms[query]) {
        let floor = classrooms[query].floor;
        showFloor(floor); // Switch to the correct floor
        document.getElementById(classrooms[query].id).classList.add("highlight");
    }
});