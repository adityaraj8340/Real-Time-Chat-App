const userList = document.getElementById("userList");
const messagesBox = document.getElementById("messages");
const chatHeader = document.getElementById("chatHeader");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

let activeUser = null;
let typingTimer = null;

users.forEach(u => {
  const div = document.createElement("div");
  div.className = "user";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = u.name[0];

  const info = document.createElement("div");
  info.className = "user-info";

  const name = document.createElement("div");
  name.textContent = u.name;

  const preview = document.createElement("div");
  preview.className = "preview";
  preview.textContent = "No messages yet";

  info.appendChild(name);
  info.appendChild(preview);

  const status = document.createElement("div");
  status.className = `status ${u.online ? "online" : "offline"}`;

  div.appendChild(avatar);
  div.appendChild(info);
  div.appendChild(status);

  div.onclick = () => selectUser(u.name, div);
  userList.appendChild(div);
});


function selectUser(user, el) {
  document.querySelectorAll(".user").forEach(u => u.classList.remove("active"));
  el.classList.add("active");

  activeUser = user;
  chatHeader.textContent = user;
  input.disabled = false;
  sendBtn.disabled = false;

  renderMessages();
}

function renderMessages() {
  messagesBox.innerHTML = "";
  const msgs = loadMessages(activeUser);

  msgs.forEach(m => {
    const div = document.createElement("div");
    div.className = `msg ${m.user === currentUser ? "me" : "other"}`;
    div.textContent = m.message;
    messagesBox.appendChild(div);
  });

  // update preview
  document.querySelectorAll(".user").forEach(u => {
    if (u.querySelector(".user-info div").textContent === activeUser) {
      const last = msgs[msgs.length - 1];
      if (last) u.querySelector(".preview").textContent = last.message;
    }
  });

  messagesBox.scrollTop = messagesBox.scrollHeight;
}


sendBtn.onclick = sendMessage;

function sendMessage() {
  if (!input.value.trim()) return;

  const msgs = loadMessages(activeUser);
  msgs.push({ user: currentUser, message: input.value });
  saveMessages(activeUser, msgs);

  input.value = "";
  renderMessages();

  fakeReply();
}

input.addEventListener("keydown", () => {
  typing.textContent = `${activeUser} is typing...`;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => typing.textContent = "", 1000);
});

function fakeReply() {
  setTimeout(() => {
    const msgs = loadMessages(activeUser);
    msgs.push({ user: activeUser, message: "Okaynn 👍" });
    saveMessages(activeUser, msgs);
    renderMessages();
  }, 1500);
}
