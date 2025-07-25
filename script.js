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


  whoami: () => {
    const lines = [
      '👋 Hey there! I\'m Kushagr Sharma.',
      '🧑‍💻 I\'m a computer science engineer who likes building cool tech, playing CTFs and breaking code.',
      '💡 I enjoy working on projects that blend creativity, system programming and cybersecurity.',
      '📍 Based in India, always online.',
      '⌨️ Type <span style="color:#09ff00ff;font-weight:bold;">socials</span> to see where I hang out, or <span style="color:#09ff00ff;font-weight:bold;">resume</span> to learn more about my work.',
    ];

    const wrapper = document.createElement("div");
    wrapper.className = "output neofetch-wrapper";
    wrapper.innerHTML = `<pre></pre>`;
    terminal.appendChild(wrapper);

    const pre = wrapper.querySelector("pre");
    pre.style.fontFamily = "monospace";
    pre.style.fontSize = "1rem";
    pre.style.whiteSpace = "pre";
    pre.style.overflowX = "auto";
    pre.style.margin = "0";

    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      pre.innerHTML += lines[lineIndex++] + "\n";
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(typeLine, 15);
    }

    typeLine();
    return commands;

  },

  socials: () => [
    { type: "link", name: "GitHub", url: "https://github.com/kushagr-17" },
    { type: "link", name: "LinkedIn", url: "https://linkedin.com/in/kushagr-sharma-50a516314" },
    { type: "link", name: "YouTube", url: "https://www.youtube.com/@sgtghost141" },
    { type: "link", name: "Codeforces", url: "https://codeforces.com/profile/blob55" },
    { type: "link", name: "Leetcode", url: "https://leetcode.com/u/kushagr_17/" },
    { type: "link", name: "Medium Blog", url: "https://medium.com/@kushagr17" },
  ],

  resume: () => {
    window.open("https://drive.google.com/file/d/198Bd-ewLUH_z1ynneyob3-EwcuaKxtYt/view?usp=drive_link", "_blank");
    return "Opening resume...";
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

  const wrapper = document.createElement("div");
  wrapper.className = "output neofetch-wrapper";
  wrapper.innerHTML = `<pre></pre>`;
  terminal.appendChild(wrapper);

  const pre = wrapper.querySelector("pre");
  pre.style.fontFamily = "monospace";
  pre.style.fontSize = "0.9rem";
  pre.style.whiteSpace = "pre";
  pre.style.overflowX = "auto";
  pre.style.margin = "0";

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return;
    pre.innerHTML += lines[lineIndex++] + "\n";
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(typeLine, 30);
  }

  typeLine();
  return commands;
},

  game: () => {
    const msg = document.createElement("div");
    msg.className = "output";
    msg.textContent = "Opening in new tab!"
    terminal.appendChild(msg);
    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(() => {
      window.open("https://www.openguessr.com", "_blank");
    }, 1000);

    return commands;
},

  weather: async (args) => {
    const city = args.join('+');

    if(!city){
      return [
        { type: "text", value: "Usage: weather [city]. Example: weather Delhi" }
      ];
    }

    const weatherHeader = document.createElement("div");
    weatherHeader.className = "output";
    weatherHeader.innerHTML = `<span style="color:#73abad;">🌤️ Weather for ${city.replace(/\+/g, ' ')}, loading please wait!</span>`;
    terminal.appendChild(weatherHeader);

    terminal.scrollTop = terminal.scrollHeight;

    try {
      const response = await fetch(`https://wttr.in/${city}?ATm`);
      const text = await response.text();

      const weatherResult = document.createElement("div");
      weatherResult.className = "output";
      weatherResult.innerHTML = `<pre style="color:#ffffff;">${text}</pre>`;
      terminal.appendChild(weatherResult);

      terminal.scrollTop = terminal.scrollHeight;
    } catch (error) {
      const failMsg = document.createElement("div");
      failMsg.className = "output";
      failMsg.style.color = "red";
      failMsg.textContent = "Failed to fetch weather data. Try again later.";
      terminal.appendChild(failMsg);
    }

    return commands;
},

  sudo: () => {
    const msg = document.createElement("div");
    msg.className = "output";
    msg.textContent = "OH NO...anyway";
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
  prompt.style.color = "#09ff00ff"
  prompt.style.fontWeight = 'bold';

  const input = document.createElement("input");
  input.type = "text";

  promptLine.appendChild(prompt);
  promptLine.appendChild(input);
  terminal.appendChild(promptLine);

  input.focus();

  input.addEventListener("keydown", async function (e){
    if (e.key === "Enter") {
      const commandInput = input.value.trim();

      if (commandInput !== "") {
        history.push(commandInput);
        historyIndex = history.length;
      }

      input.disabled = true;

      const commandText = document.createElement("span");
      commandText.textContent = commandInput;
      commandText.style.color = "#ffffff";
      promptLine.replaceChild(commandText, input);

      if (commandInput === "") {
        addPrompt();
        terminal.scrollTop = terminal.scrollHeight;
        return;
      }

      if(commandInput === "clear"){
        commands.clear();
        return;
      }

      const [cmdName, ...args] = commandInput.split(" ");
      const fn = commands[cmdName];

      let result;

      try {
        if (typeof fn === "function") {
          result = await fn(args);
        } else {
          result = {
            type: "error",
            message: `${cmdName}: command not found`
          };
        }
      } catch (err) {
        result = {
          type: "error",
          message: `Command failed: ${err.message}`
        };
      }

      if (Array.isArray(result)) {
        result.forEach(entry => {
          const line = document.createElement("div");
          line.className = "output";

          if (entry.type === "desc") {
            line.innerHTML = `<span style="color: #b89076">${entry.cmd.padEnd(10)}</span> - <span style="color: #73abad">${entry.desc}</span>`;
          } else if (entry.type === "link") {
            line.innerHTML = `<a href="${entry.url}" target="_blank" text-decoration: none;">${entry.name}</a>`;
          } else if (entry.type === "text") {
            line.innerHTML = `<pre style="color: #ffffff;">${entry.value}</pre>`;
          }

          terminal.appendChild(line);
        });
      } else if (typeof result === "string") {
        const output = document.createElement("div");
        output.className = "output";
        output.textContent = result;
        terminal.appendChild(output);
      } else if (result?.type === "error") {
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

    // Command history support
    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
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

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "output banner-art";
  bannerWrapper.innerHTML = `<pre></pre>`;
  terminal.appendChild(bannerWrapper);

  const bannerPre = bannerWrapper.querySelector("pre");
  bannerPre.style.color = "#DCDCCC";
  bannerPre.style.fontFamily = "monospace";
  bannerPre.style.fontSize = "1rem";
  bannerPre.style.whiteSpace = "pre";
  bannerPre.style.overflowX = "auto";
  bannerPre.style.margin = "0";

  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (lineIndex >= bannerLines.length) {
      if (callback) callback();
      return;
    }

    const currentLine = bannerLines[lineIndex];

    if (currentLine.includes("<span")) {
      bannerPre.innerHTML += currentLine + "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 400);
      return;
    }

    if(charIndex < currentLine.length){
      bannerPre.innerHTML += currentLine[charIndex++];
    }
    else{
      bannerPre.innerHTML += "\n";
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
