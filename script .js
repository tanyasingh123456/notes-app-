const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
        addEventListenersToNotes();
    }
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent = "Click to write..."; 
    img.src = "https://static-00.iconduck.com/assets.00/delete-icon-932x1024-nylj0i2z.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); 

    inputBox.addEventListener("focus", () => {
        if (inputBox.textContent === "Click to write...") {
            inputBox.textContent = "";
        }
    });

    inputBox.addEventListener("blur", () => {
        if (inputBox.textContent.trim() === "") {
            inputBox.remove();
            updateStorage();
        }
    });
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

emojiPicker.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") { // Assume emojis are in <span>
        const emoji = event.target.textContent;
        const activeNote = document.activeElement;
        if (activeNote && activeNote.classList.contains("input-box")) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(emoji));
            updateStorage();
        }
    }
});
// Add event listeners to notes after reloading
function addEventListenersToNotes() {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((note) => {
        note.onkeyup = function () {
            updateStorage();
        };

        note.addEventListener("focus", () => {
            if (note.textContent === "Click to write...") {
                note.textContent = "";
            }
        });

        note.addEventListener("blur", () => {
            if (note.textContent.trim() === "") {
                note.remove();
                updateStorage();
            }
        });
    });
};








