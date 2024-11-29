# <img src="extension/icon.png" width="28" height="28" /> ChessBot
Real-time stockfish chess analyzer browser extension for [chess.com](https://www.chess.com)

![Showcase](https://github.com/user-attachments/assets/003ef739-f8a3-4d54-8969-01cc7404fae7)


# Browser Compatability

| Browser        | Supported Version | Notes                                  |
|----------------|-------------------|----------------------------------------|
| <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" style="width: 16px; height: 16px;"> Chrome         | 88+              | ✅ Fully supported                        |
| <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" style="width: 16px; height: 16px;"> Firefox        | 109+              | ✅ Fully supported                        |
| <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" style="width: 16px; height: 16px;"> Safari         | -               | ❓ Not tested                             |
| <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" style="width: 16px; height: 16px;"> Edge           | -               | ❓ Not tested                             |
| <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Opera_2015_icon.svg" style="width: 16px; height: 16px;"> Opera          | -               | ❓ Not tested                             |


# Prerequisites

Make sure you have these ready before proceeding with **How to use**
<ul>
  <li><a href="https://github.com/official-stockfish/Stockfish/releases/latest/download/stockfish-windows-x86-64-avx2.zip">Stockfish Binary</a></li>
  The download should start automatically when you click the link. Extract the <b>stockfish-windows-x86-64-avx2.exe</b> in the same folder as the <b>server.py</b>, you can learn about how to download the server.py in the <b>How to use</b> section.
  <li><a href="https://www.python.org/downloads/" target="_blank">Python +3</a></li>
  Download the latest version, the setup wizard will guide you through the process.
</ul>

# How to use

#### 0. Make sure you have the [prerequisites](https://github.com/BoraOfficial/ChessBot?tab=readme-ov-file#prerequisites) installed

#### 1. Install the extension
- **Firefox**  
  Firefox users are in luck! Our extension can be installed from the official [Mozilla Add-Ons site](https://addons.mozilla.org/en-US/firefox/addon/chessbot/).

- **Any other browser**  
  You will have to manually install the addon. First, [download the repository](https://github.com/BoraOfficial/ChessBot/archive/refs/heads/main.zip), then extract the “extension” folder. The installation process after can vary a lot. Here is a general overview of how it can be done on Google Chrome:
  1. Navigate to `chrome://extensions/`
  2. Turn on Developer Mode, by toggling it on the top right of the page.
  4. After developer mode is turned on, plenty of buttons will appear on the top left, simply click on `Load Unpacked`
  5. Select the extracted “extension” folder.


#### 2. Download the server.py
Navigate to [server.py](https://github.com/BoraOfficial/ChessBot/blob/main/server.py) then click on the small download icon, as seen in the picture below:

<img width="668" alt="download-button" src="https://github.com/user-attachments/assets/50ef76c2-d7dd-41ba-bffd-afb26b4d0f18">

#### 3. Install reqired Python modules
Open a Terminal(or Command Prompt) and paste this command:<br>
`pip install flask==3.0.3 flask-cors==5.0.0 chess==1.11.1`
#### 4. Start the server
Double-click on the server.py to start the server. A window will pop up, something like this:

![terminal](https://github.com/user-attachments/assets/6e8ba90b-cf70-4a64-b988-657c22c4c1a6)
You can simply minimize this window. The extension is ready to use! 

**NOTE: You will need to open the server.py file whenever you want to use the extension.**

---

<b>‼️The code and content in this repository are provided "as is" without any warranties or guarantees. Use at your own risk. The author is not liable for any damages arising from the use of this repository.</b>
