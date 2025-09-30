const STORAGE_KEY = "notes";
const form = document.getElementById("note-form");
const titleEl = document.getElementById("note-title");
const contentEl = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const emptyMessage = document.getElementById("empty-message");
const clearAllBtn = document.getElementById("clear-all-button");

const getNotes = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const saveNotes = (notes) => localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

function renderNotes() {
  const notes = getNotes();
  notesList.innerHTML = "";

  emptyMessage.classList.toggle("hidden", notes.length > 0);
  clearAllBtn.disabled = notes.length === 0;

notes.forEach(n => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    const header = document.createElement("div");
    header.className = "note-card-header";

    const titleEl = document.createElement("h3");
    titleEl.className = "note-card-title";
    titleEl.textContent = n.title; 

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn-card";
    deleteButton.setAttribute("data-id", n.id); 
    deleteButton.textContent = "×"; 
   
    const contentEl = document.createElement("div");
    contentEl.className = "note-content";
    contentEl.textContent = n.content;

    const dateEl = document.createElement("span");
    dateEl.className = "note-date";
    dateEl.textContent = `Oluşturulma Tarihi: ${n.date}`;

    header.appendChild(titleEl);
    header.appendChild(deleteButton);
    noteCard.appendChild(header);
    noteCard.appendChild(contentEl);
    noteCard.appendChild(dateEl);
    notesList.appendChild(noteCard);
});
}

renderNotes();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleEl.value;
  const content = contentEl.value;
  if (!title || !content) return;

  const notes = getNotes();
  const newNote = {
    id: Date.now(),
    title,
    content,
    date: new Date().toLocaleDateString("tr-TR")
  };

  notes.unshift(newNote);
  saveNotes(notes);
  renderNotes();
  form.reset();
});

notesList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn-card")) return;

  const id = Number(e.target.dataset.id);
  const updated = getNotes().filter(n => n.id !== id);
  saveNotes(updated);
  renderNotes();
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Tüm notlar silinsin mi?")) {
    localStorage.removeItem(STORAGE_KEY); 
    renderNotes();
  }
});
