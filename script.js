let chats = JSON.parse(localStorage.getItem("mindshelf")) || [];

function save() {
  localStorage.setItem("mindshelf", JSON.stringify(chats));
}

function createChat() {
  const title = prompt("Chat title?");
  const category = prompt("Category (AI, Business, Study, Ideas):");

  if (!title) return;

  const chat = {
    id: Date.now(),
    title,
    category: category || "General"
  };

  chats.push(chat);
  save();
  renderChats();
}

function renderChats(filter = "all", search = "") {
  const list = document.getElementById("chatList");
  list.innerHTML = "";

  let filtered = chats;

  if (filter !== "all") {
    filtered = filtered.filter(c => c.category === filter);
  }

  if (search) {
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered.forEach(chat => {
    const div = document.createElement("div");
    div.className = "chat-card";

    div.innerHTML = `
      <h3>${chat.title}</h3>
      <p class="tag">${chat.category}</p>
    `;

    list.appendChild(div);
  });
}

function filterCategory(cat) {
  renderChats(cat);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderChats("all", e.target.value);
});

renderChats();
