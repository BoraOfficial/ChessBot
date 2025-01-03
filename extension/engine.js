// (c) 2024 BoraOfficial. All rights reserved.

function startEngine() {
    let isBoardFlipped = document.querySelector(".board").classList.contains("flipped");

    let opposition = isBoardFlipped ? "b" : "w";

    let letterNumberMap = { "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8 }

    function replaceLettersWithNumbers(inputString) {
        return inputString.split('').map(char => {
            return letterNumberMap[char] !== undefined ? letterNumberMap[char] : char;
        }).join('');
    }

    function highlightMove(target) {
        let board = document.querySelector("wc-chess-board");
        let newElm1 = document.createElement('div')
        newElm1.classList.add("highlight")
        newElm1.classList.add("bestmove")
        newElm1.style.outline = "2px dashed red"
        newElm1.style.backgroundColor = 'transparent'
        newElm1.style.opacity = "0.5"
        newElm1.style.transform = `translate(${(replaceLettersWithNumbers(target[0]) - 1) * 100}%, ${700 - (target[1] - 1) * 100}%)`
        board.appendChild(newElm1);

        let newElm2 = document.createElement('div')
        newElm2.classList.add("highlight")
        newElm2.classList.add("bestmove")
        newElm2.style.backgroundColor = 'transparent'
        newElm2.style.outline = "2px dashed blue"
        newElm2.style.opacity = "0.8"
        newElm2.style.transform = `translate(${(replaceLettersWithNumbers(target[2]) - 1) * 100}%, ${700 - (target[3] - 1) * 100}%)`
        board.appendChild(newElm2);
    }

    //highlightMove(target)

    function isEven(num) {
        return num % 2 === 0;
    }




    //let mutationCounter = 0 - (isBoardFlipped ? 1 : 0);

    let mutationCounter = 0

    let board = document.querySelector(".board");
    let pieceMap = {
        "br": "r", // Black rook
        "bn": "n", // Black knight
        "bb": "b", // Black bishop
        "bq": "q", // Black queen
        "bk": "k", // Black king
        "bp": "p", // Black pawn
        "wr": "R", // White rook
        "wn": "N", // White knight
        "wb": "B", // White bishop
        "wq": "Q", // White queen
        "wk": "K", // White king
        "wp": "P", // White pawn
    };

    function getFEN(castling = true) {
        let fen = '';

        // Get all pieces
        let pieces = board.querySelectorAll('.piece');

        // Create a map to track piece positions
        let boardArray = Array(8).fill(null).map(() => Array(8).fill(''));

        pieces.forEach(piece => {
            let classList = piece.classList;
            let squareClass = Array.from(classList).find(cls => cls.startsWith('square-'));

            if (squareClass) {
                // Extract the numeric square ID
                let squareId = parseInt(squareClass.split('-')[1]);
                let file = Math.floor(squareId / 10) - 1; // 0-indexed file (a-h)
                let rank = (squareId % 10) - 1; // 0-indexed rank (1-8)

                // Get the piece class
                let pieceClass = Array.from(classList).find(cls => cls.startsWith('w') || cls.startsWith('b'));
                if (pieceClass) {
                    // Place the piece on the board array
                    boardArray[rank][file] = pieceMap[pieceClass];
                }
            }
        });

        // Construct FEN from black pieces first (rank 8 to rank 1)
        for (let rank = 7; rank >= 0; rank--) {
            let emptyCount = 0;
            for (let file = 0; file < 8; file++) {
                if (boardArray[rank][file]) {
                    if (emptyCount > 0) {
                        fen += emptyCount; // Add empty squares count
                        emptyCount = 0;
                    }
                    fen += boardArray[rank][file];
                } else {
                    emptyCount++;
                }
            }
            if (emptyCount > 0) {
                fen += emptyCount; // Add remaining empty squares count
            }
            fen += '/'; // End of rank
        }

        // Remove the trailing slash
        if (fen.endsWith('/')) {
            fen = fen.slice(0, -1);
        }

        // Add additional FEN components (turn, castling, en passant, halfmove, fullmove)

        if (castling) {
            fen += ` ${opposition} KQkq - 0 1`; // ${opposition} to move, castling available, no en passant, 0 half moves, 1 full move
        } else {
            fen += ` ${opposition} - - 0 1`; // ${opposition} to move, castling unavailable, no en passant, 0 half moves, 1 full move
        }

        return fen;
    }


    function removeAllHighlights() {
        const elements = document.querySelectorAll(".bestmove");
        elements.forEach(element => element.remove());
    }

    function reportProgress(depth) {
        const loaderHTML = `<div style="position:relative;top:15px;" class="tooltip-container" id="progress-stockfish-chessbot"><div class="tooltip-text">Depth <depth>0</depth>/${depth}<br><a style="text-decoration:underline;color:#404040;cursor:pointer" onclick='alert("If your computer is not the best, Stockfish may have difficulties calculating high ELOs. Try refreshing the page and lower the ELO on the extension.")'>Too slow?</a></div><span class="loader"></span><style>.tooltip-text{visibility:hidden;width:120px;background-color:#8c8b8b;color:#4d4d4d;text-align:center;border-radius:5px;padding:5px;position:absolute;z-index:1;top:12.5%;left:10%;margin-top:-16px;opacity:0;transition:opacity .3s}.tooltip-container:hover .tooltip-text{visibility:visible;opacity:1}.loader{border:2px solid #fff;width:32px;height:32px;background:#ff3d00;border-radius:50%;display:inline-block;position:relative;box-sizing:border-box;animation:rotation 2s linear infinite}.loader::after{content:'';box-sizing:border-box;position:absolute;left:50%;top:50%;border:16px solid;border-color:transparent #fff;border-radius:50%;transform:translate(-50%,-50%)}@keyframes rotation{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>`;
      
      // Append the HTML code to the body
      document.getElementById("board-layout-main").insertAdjacentHTML("beforeend",loaderHTML);

    }

    function reportDepthCycle(depth) {
        console.log("report depth")
        document.querySelector('#progress-stockfish-chessbot .tooltip-text depth').innerHTML = depth;
    }

    


    const engine = new Worker("/bundles/app/js/vendor/jschessengine/stockfish.asm.1abfa10c.js")
    function postChessApi(data) {
        const progress = document.getElementById("progress-stockfish-chessbot")
        if (progress === null){
            reportProgress(data.depth)
        } else {
            console.log("Progress element exists.")
            console.log("Visibility visible")
            progress.style.visibility = "visible";
        }
        console.log(data)
        engine.postMessage(`position fen ${data.fen}`)
        engine.postMessage('go wtime 300000 btime 300000 winc 2000 binc 2000');
        engine.postMessage(`go depth ${data.depth}`)

    }

    engine.onmessage = function (event) {
        console.log(event.data)
        try {
            if (event.data.startsWith('bestmove')) {
                console.log("Visibility hidden")
                document.getElementById("progress-stockfish-chessbot").style.visibility = "hidden";
                const bestMove = event.data.split(' ')[1];
                if (bestMove === undefined) {
                    console.log(data);
                    console.error("Stockfish engine errored out. Callback")
                    console.log(fenPos)
                    highlightBestMove(false)
                }
                highlightMove(bestMove)
            } else if (event.data.startsWith('info')) {
                reportDepthCycle(event.data.match(/depth (\d+)/)[1])

            }
        } catch (e) {
            console.error("engine.onmessage error: "+e)
        }
    }


    function highlightBestMove(castling = true) {
        try {
            let fenPos = getFEN(castling)
            postChessApi({ fen: fenPos, depth: window.args.depth})
        } catch (e) {
            console.log(data);
            console.error("Stockfish engine error", e, ". Callback")
            console.log(fenPos)
            highlightBestMove(false)
        }
    }

    if (!isBoardFlipped) { // white
        highlightBestMove()
    }


    // Map to store previous square classes for each element
    const previousSquareClassesMap = new WeakMap();

    // Function to log changes to classes that start with "square-"
    const logSquareClassChanges = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                const currentClasses = Array.from(target.classList);

                if (!document.body.contains(target)) {
                    return;
                }

                // Check if the class has changed to "element-pool" (piece off board)
                if (currentClasses.includes('element-pool')) {
                    return;
                }

                const squareClasses = currentClasses.filter(className => className.startsWith('square-'));

                // Get the previous square classes from the map
                const previousSquareClasses = previousSquareClassesMap.get(target) || [];


                // Check if there’s a change in square classes
                if (squareClasses.length !== previousSquareClasses.length ||
                    !squareClasses.every(cls => previousSquareClasses.includes(cls))) {

                    //alert("mutation")
                    console.log('Square class changed:', target);
                    removeAllHighlights()
                    mutationCounter += 1
                    console.log(mutationCounter, isEven(mutationCounter))
                    if (isEven(mutationCounter)) {
                        setTimeout(highlightBestMove, 600) // wait for animations
                    }
                    // Update the previous classes in the map
                    previousSquareClassesMap.set(target, squareClasses);
                }
            }
        }
    };


    // Create an observer instance
    const observer = new MutationObserver(logSquareClassChanges);

    // Select all elements with class "piece"
    const pieces = document.querySelectorAll('.piece');

    // Set observer options for attribute changes
    const config = {
        attributes: true, // Observe attribute changes
    };

    // Observe each piece element and initialize the previous classes map
    pieces.forEach(piece => {
        observer.observe(piece, config);
        const squareClasses = Array.from(piece.classList).filter(className => className.startsWith('square-'));
        previousSquareClassesMap.set(piece, squareClasses);
    });

    // Optional: If new .piece elements are added dynamically
    const observerForNewPieces = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('piece')) {
                        observer.observe(node, config);
                        // Initialize the previous classes in the map
                        const squareClasses = Array.from(node.classList).filter(className => className.startsWith('square-'));
                        previousSquareClassesMap.set(node, squareClasses);
                    }
                });
            }
        }
    });

    // Observe the parent of the pieces to catch new additions
    const parentElement = document.querySelector('.board'); // Change this to the appropriate parent
    if (parentElement) {
        observerForNewPieces.observe(parentElement, { childList: true });
    }



    // --------------- OBSERVER FOR GAMEOVR EVENT --------------------------
    const gameoverObserver = new MutationObserver((mutationsList, gameoverObserver) => {
        // Check each mutation to see if the target element has been added to the DOM
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Look for the element in the document
                const button = Array.from(document.querySelectorAll(".game-over-buttons-component > .cc-button-secondary > span"))
                .find(span => span.innerText.includes("New"));
                
                // If the element exists, stop observing and take action
                if (button) {
                    let buttonText = button.innerText
                    let minutes = parseInt(buttonText.split(' ')[1]);
                    
    
    
                    const clockTime = document.querySelectorAll('.clock-time-monospace');
    
                    clockTime.forEach(clock => {
                        clock.innerText = `${minutes}:00`; // return clock to original time
                    });
                    gameoverObserver.disconnect();
                    observer.disconnect(); // disconnect observer for the piece movement detector
                    
                    setTimeout(checkIfOnline, 500) // give everything time to settle
                    checkIfOnline()
                }
            }
        }
    });

    
    gameoverObserver.observe(document.body, { childList: true, subtree: true });

}
function checkIfOnline() {
    if (location.href.includes("online")) {
        const clockComponents = document.querySelectorAll('.clock-component');

        if (clockComponents.length > 0) {
            const observer = new MutationObserver(() => {
                // Disconnect the observer
                observer.disconnect();

                // Wait for 500 ms before starting the engine
                setTimeout(startEngine, 500);
            });

            // Observe all clock components for changes
            clockComponents.forEach(clockComponent => {
                observer.observe(clockComponent, { characterData: true, childList: true, subtree: true });
            });
        }
    } else {
        startEngine();
    }
}

checkIfOnline()
