// Tailscale: IP del PC del bar (servidor n8n)
const webhookUrl = "http://100.69.174.56:5678/webhook/chatbot";

const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

function addMessage(text, sender){
  const div = document.createElement("div");
  div.textContent = text;
  div.className = `message ${sender}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, "user");
  input.value = "";

  try{
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ question: text })
    });
    const data = await res.json();
    addMessage(data.answer || "Sin respuesta.", "bot");
  }catch(err){
    addMessage("⚠️ No puedo conectar con el servidor.", "bot");
  }
});
