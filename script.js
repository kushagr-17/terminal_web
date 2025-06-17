const terminal = document.getElementById("terminal");

const commands = {
  help: () => [
    { type: "desc", cmd: "help", desc: "Show available commands" },
    { type: "desc", cmd: "whoami", desc: "Learn more about me" },
    { type: "desc", cmd: "neofetch", desc: "Display system information" },
    { type: "desc", cmd: "socials", desc: "View my social profiles" },
    { type: "desc", cmd: "resume", desc: "Download my resume" },
    { type: "desc", cmd: "banner", desc: "Show the welcome banner" },
    { type: "desc", cmd: "clear", desc: "Clear the terminal screen" },
    { type: "desc", cmd: "sudo", desc: "I wonder what this does 🤔"}
  ],

  whoami: () => "Hi, I'm Kushagr Sharma, an engineer who builds cool projects. I also participate in CTF events.",

  socials: () => [
    { type: "link", name: "GitHub", url: "https://github.com/kushagr-17" },
    { type: "link", name: "LinkedIn", url: "https://linkedin.com/in/kushagr-sharma-50a516314" },
    { type: "link", name: "YouTube", url: "https://www.youtube.com/@sgtghost141" },
    { type: "link", name: "Codeforces", url: "https://codeforces.com/profile/blob55" },
    { type: "link", name: "Leetcode", url: "https://leetcode.com/u/kushagr_17/" },
  ],

  resume: () => {
    const link = document.createElement("a");
    link.href = "resume.pdf";
    link.download = "Kushagr_Sharma_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return "Downloading resume...";
  },

  clear: () => {
    terminal.innerHTML = "";
    addPrompt();
    return null;
  },

  neofetch: () => {
  const lines = [
    `         <span style="color:#8be9fd">@@@%%%%%%%%%@@</span>                           <span style="color:red">user@n0t-r00t</span>`,
    `      <span style="color:#8be9fd">@@@%%%%%%%%%#######%@@</span>                      -----------------------`,
    `    <span style="color:#8be9fd">@@@@%%%%%%%######?######%@</span>                    <span style="color:red">OS:</span> WebOS 1.0`,
    `   <span style="color:#8be9fd">@@@@%%%%%%%#######:########%@</span>                  <span style="color:red">Host:</span> Kushagr`,
    ` <span style="color:#8be9fd">@@@@@%%%%%%#########:??#######%</span>                  <span style="color:red">Kernel:</span> JavaScript Vanilla 1.0`,
    `<span style="color:#8be9fd">@@@%%%%%####???###?+:??####?###@</span>                  <span style="color:red">Uptime:</span> ∞`,
    `<span style="color:#8be9fd">@@@%%%%%%#?+???###?:+?##??###?##@</span>                 <span style="color:red">Shell:</span> ksh (Kushagr Shell)`,
    `<span style="color:#8be9fd">@??%@%%%##????????++:;+?+????????#@</span>               <span style="color:red">Resolution:</span> Responsive`,
    `<span style="color:#8be9fd">#  ;?%#?+; ..::+?+ ::;++++++?+???#</span>                <span style="color:red">Theme:</span> Dark Terminal`,
    `<span style="color:#8be9fd">%  :?%;;;:  ....:#+ :;+++????+???@</span>                <span style="color:red">CPU:</span> 12th Gen Intel i5-1240P (16) @ 4.400`,
    `<span style="color:#8be9fd">#;;+??+++:   ...;##: ;;;++???++?%</span>                 <span style="color:red">GPU:</span> Intel Iris Xe Graphics`,
    `<span style="color:#8be9fd">%#%+::++?#+;:::;?##+ ;;;;++??++#</span>                  <span style="color:red">Memory:</span> Limitless`,
    `<span style="color:#8be9fd">%?% : :???+?++???######?+;;+??#</span>`,
    `<span style="color:#8be9fd">@%# ; ;??;;+ ;???+;;:..::.:+?%</span>`,
    `<span style="color:#8be9fd">@???;;?+;;;+ ;:;;......;;;#@</span>`,
    `<span style="color:#8be9fd">%##?++?+++;+ ??% @%%@@@@</span>`,
    `   <span style="color:#8be9fd">@_:?_:+_:_:#%</span>`,
  ];

  const output = document.createElement("div");
  output.className = "output neofetch-output";
  terminal.appendChild(output);

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      return;
    }

    output.innerHTML += lines[lineIndex++] + "<br>";
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(typeLine, 30);
  }

  typeLine();
  return commands;
},

  sudo: () => {
    const msg = document.createElement("div");
    msg.className = "output";
    msg.textContent = "... really?";
    terminal.appendChild(msg);
    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(() => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank');
    }, 1000);

    return commands;
},

  banner: () => {
    printBanner();
    return commands;  
  }
};

let history = [];
let historyIndex = -1;

function addPrompt(){
  const promptLine = document.createElement("div");
  promptLine.className = "prompt-line";

  const prompt = document.createElement("span");
  prompt.className = "prompt";
  prompt.textContent = "user@n0t-r00t:~$";
  prompt.style.color = "rgb(9, 255, 0)"
  prompt.style.fontWeight = 'bold';

  const input = document.createElement("input");
  input.type = "text";

  promptLine.appendChild(prompt);
  promptLine.appendChild(input);
  terminal.appendChild(promptLine);

  input.focus();

  input.addEventListener("keydown", function (e){
    if(e.key === "Enter"){
      const command = input.value.trim();
      if (command !== "") {
        history.push(command);
        historyIndex = history.length;
      }

      input.disabled = true;

      const commandText = document.createElement("span");
      commandText.textContent = input.value;
      commandText.style.color = "#ffffff";
      promptLine.replaceChild(commandText, input);

      if(command === ""){
        addPrompt();
        terminal.scrollTop = terminal.scrollHeight;
        return;
      }

      if(command === "clear"){
        commands.clear();
        return;
      }

      const result = commands[command]?.() ?? { type: "error", message: `${command} : Command not found` };

      if(Array.isArray(result)){
        result.forEach(entry => {
          const line = document.createElement("div");
          line.className = "output";

          if (entry.type === "desc") {
            line.innerHTML = `<span style="color: #b89076">${entry.cmd.padEnd(10)}</span> - <span style="color: #73abad">${entry.desc}</span>`;
          } else if (entry.type === "link") {
            line.innerHTML = `<a href="${entry.url}" target="_blank" text-decoration: none;">${entry.name}</a>`;
          } else if (entry.type === "text") {
            line.innerHTML = `<pre style="color: #bbbbbb;">${entry.value}</pre>`;
          }

          terminal.appendChild(line);
        });
      }
      else if(typeof result === "string"){
        const output = document.createElement("div");
        output.className = "output";
        output.textContent = result;
        terminal.appendChild(output);
      }
      else if(result?.type === "error"){
        const errorOutput = document.createElement("div");
        errorOutput.className = "output";
        errorOutput.style.color = "red";
        errorOutput.textContent = result.message;
        terminal.appendChild(errorOutput);
      }

      const spacer = document.createElement("div");
      spacer.style.marginBottom = "10px";
      terminal.appendChild(spacer);

      terminal.scrollTop = terminal.scrollHeight;
      addPrompt();
    }

    if(e.key === "ArrowUp"){
      if(historyIndex > 0){
        historyIndex--;
        input.value = history[historyIndex];
      }
    }
    else if(e.key === "ArrowDown"){
      if(historyIndex < history.length - 1){
        historyIndex++;
        input.value = history[historyIndex];
      }
      else{
        input.value = "";
        historyIndex = history.length;
      }
    }
  });
}

function printBanner(callback) {
  const bannerLines = [
    "██╗  ██╗██╗   ██╗███████╗██╗  ██╗ █████╗  ██████╗ ██████╗", 
    "██║ ██╔╝██║   ██║██╔════╝██║  ██║██╔══██╗██╔════╝ ██╔══██╗",
    "█████╔╝ ██║   ██║███████╗███████║███████║██║  ███╗██████╔╝",
    "██╔═██╗ ██║   ██║╚════██║██╔══██║██╔══██║██║   ██║██╔══██╗",
    "██║  ██╗╚██████╔╝███████║██║  ██║██║  ██║╚██████╔╝██║  ██║",
    "╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝",
    "", 
    `<span style="color: #B89076;">Welcome to my terminal-like portfolio!</span>`,
    `<span style="color: #B89076;">Type <span style="color:#73ABAD;">'help'</span> to see available commands.</span>`,
    ""
  ];

  const bannerDiv = document.createElement("div");
  bannerDiv.className = "output";
  bannerDiv.style.color = "#DCDCCC";
  terminal.appendChild(bannerDiv);

  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (lineIndex >= bannerLines.length) {
      if (callback) callback(); 
      return;
    }

    const currentLine = bannerLines[lineIndex];

    if (currentLine.includes("<span")) {
      bannerDiv.innerHTML += currentLine + "<br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 400);
      return;
    }

    if (charIndex < currentLine.length) {
      bannerDiv.innerHTML += currentLine[charIndex++];
    }
    else{
      bannerDiv.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;
    }

    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(typeChar, 7);
  }

  typeChar();
}


printBanner(() => {
  addPrompt();
});
