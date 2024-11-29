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

<ul>
  <li><a href="https://stockfishchess.org/download/">Stockfish Binary</a></li>
  <li><a href="https://www.python.org/downloads/">Python +3</a></li>
</ul>

# How to use

#### 0. Download the server.py
The server.py can easily be <a href="https://github.com/BoraOfficial/ChessBot/raw/refs/heads/main/server.py">downloaded here</a>
#### 1. Install reqired Python modules
`pip install -r requirements.txt`
#### 2. Start the server
`python server.py`
#### 3. Install the extension
- **Firefox**  
  Firefox users are in luck! Our extension can be installed from the official [Mozilla Add-Ons site](https://addons.mozilla.org/en-US/firefox/addon/chessbot/).

- **Any other browser**  
  You will have to manually install the addon. First, [download the repository](https://github.com/BoraOfficial/ChessBot/archive/refs/heads/main.zip), then extract the “extension” folder. The installation process after can vary a lot. Here is a general overview of how it can be done on Google Chrome:
  1. Navigate to `chrome://extensions/`
  2. Click on `Load Unpacked`
  3. Select the extracted “extension” folder.


---

<b>‼️The code and content in this repository are provided "as is" without any warranties or guarantees. Use at your own risk. The author is not liable for any damages arising from the use of this repository.</b>
