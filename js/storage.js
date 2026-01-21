function getChatKey(user) {
  return `chat_${currentUser}_${user}`;
}

function loadMessages(user) {
  const data = localStorage.getItem(getChatKey(user));
  return data ? JSON.parse(data) : [];
}

function saveMessages(user, messages) {
  localStorage.setItem(getChatKey(user), JSON.stringify(messages));
}
