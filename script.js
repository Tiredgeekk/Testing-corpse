// =====================================
// LITERARY EXQUISITE CORPSE
// JAVASCRIPT
// =====================================
// =====================================
// GAME VARIABLES
// =====================================
let difficulty = "normal";
let totalWriters = 0;
let currentWriter = 1;
let storyParts = [];
let storyInfo = {
    characters: "",
    setting: "",
    genre: "",
    prompt: ""
};
// =====================================
// START STORY
// =====================================
function startStory() {
    storyInfo.characters =
        document.getElementById("characters").value;
    storyInfo.setting =
        document.getElementById("setting").value;
    storyInfo.genre =
        document.getElementById("genre").value;
    storyInfo.prompt =
        document.getElementById("prompt").value;
    totalWriters =
        parseInt(
            document.getElementById("writer-count").value
        );
    difficulty =
        document.getElementById("difficulty").value;
    if (!totalWriters || totalWriters < 2) {
        alert("Please enter at least 2 writers!");
        return;
    }
    storyParts = [];
    currentWriter = 1;
    showWritingInfo();
    changeScreen("writing-screen");
}
// =====================================
// PASS DEVICE
// =====================================
function readyWriter() {
    showWritingInfo();
    changeScreen("writing-screen");
}
// =====================================
// SHOW CURRENT WRITER INFO
// =====================================
function showWritingInfo() {
    document.getElementById("writer-number").textContent =
        "✒️ Writer " + currentWriter + " of " + totalWriters;
    document.getElementById("display-characters").textContent =
        storyInfo.characters || "None provided";
    document.getElementById("display-setting").textContent =
        storyInfo.setting || "None provided";
    document.getElementById("display-genre").textContent =
        storyInfo.genre || "None provided";
    document.getElementById("display-prompt").textContent =
        storyInfo.prompt || "None provided";
    document.getElementById("writer-input").value = "";
    // Show the appropriate previous-writer hint
    showPreviousHint();
}
// =====================================
// SHOW PREVIOUS WRITER HINT
// =====================================
function showPreviousHint() {
    const hintBox =
        document.getElementById("previous-hint");
    const hintText =
        document.getElementById("hint-text");
    // If the hint elements don't exist,
    // stop instead of breaking the game.
    if (!hintBox || !hintText) {
        return;
    }
    // Normal mode = no hint.
    // Writer 1 also gets no hint because
    // there is no previous writer.
    if (
        difficulty !== "easy" ||
        storyParts.length === 0
    ) {
        hintBox.classList.add("hidden");
        hintText.textContent = "";
        return;
    }
    const previousParagraph =
        storyParts[storyParts.length - 1];
    // Find the sentences in the paragraph.
    const sentences =
        previousParagraph.match(
            /[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g
        );
    let lastSentence = "";
    if (sentences && sentences.length > 0) {
        lastSentence =
            sentences[sentences.length - 1].trim();
    }
    // Remove punctuation from the end.
    lastSentence =
        lastSentence
            .replace(/[.!?]+$/, "")
            .trim();
    // Split the sentence into words.
    const words =
        lastSentence.split(/\s+/);
    // Take only the final two words.
    const lastWords =
        words.slice(-2).join(" ");
    hintText.textContent =
        lastWords;
    hintBox.classList.remove("hidden");
}
// =====================================
// SUBMIT WRITER PARAGRAPH
// =====================================
function submitLine() {
    const paragraph =
        document
            .getElementById("writer-input")
            .value
            .trim();
    if (paragraph === "") {
        alert(
            "Please write something before continuing!"
        );
        return;
    }
    // Save the paragraph.
    storyParts.push(paragraph);
    // Check if this was the final writer.
    if (currentWriter >= totalWriters) {
        revealStory();
    }
    else {
        currentWriter++;
        changeScreen("pass-screen");
    }
}
// =====================================
// REVEAL FINAL STORY
// =====================================
function revealStory() {
    document.getElementById("final-characters").textContent =
        storyInfo.characters || "None provided";
    document.getElementById("final-setting").textContent =
        storyInfo.setting || "None provided";
    document.getElementById("final-genre").textContent =
        storyInfo.genre || "None provided";
    const finalBox =
        document.getElementById("final-story");
    finalBox.innerHTML = "";
    storyParts.forEach((part) => {
        const paragraph =
            document.createElement("p");
        paragraph.className =
            "story-paragraph";
        paragraph.textContent =
            part;
        finalBox.appendChild(paragraph);
    });
    changeScreen("reveal-screen");
}
// =====================================
// CHANGE SCREENS
// =====================================
function changeScreen(screenID) {
    document
        .getElementById("setup-screen")
        .classList.add("hidden");
    document
        .getElementById("pass-screen")
        .classList.add("hidden");
    document
        .getElementById("writing-screen")
        .classList.add("hidden");
    document
        .getElementById("reveal-screen")
        .classList.add("hidden");
    document
        .getElementById(screenID)
        .classList.remove("hidden");
}
// =====================================
// RESET
// =====================================
function resetGame() {
    storyParts = [];
    currentWriter = 1;
    totalWriters = 0;
    difficulty = "normal";
    document.getElementById("characters").value = "";
    document.getElementById("setting").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("prompt").value = "";
    document.getElementById("writer-count").value = 6;
    // Reset difficulty to Normal
    const difficultySelect =
        document.getElementById("difficulty");
    if (difficultySelect) {
        difficultySelect.value = "normal";
    }
    // Hide any leftover hint
    const hintBox =
        document.getElementById("previous-hint");
    if (hintBox) {
        hintBox.classList.add("hidden");
    }
    changeScreen("setup-screen");
}
