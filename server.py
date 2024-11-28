# (c) 2024 BoraOfficial. All rights reserved.
from flask import Flask, request, jsonify
from flask_cors import CORS
import chess
import chess.engine
import logging

app = Flask(__name__)

# Enable CORS to allow requests from the frontend (e.g., running on http://127.0.0.1:3000)
CORS(app, resources={r"/analyze/*": {"origins": "*"}})

STOCKFISH_PATH = "./stockfish-windows-x86-64-avx2.exe"  # Adjust this path to your Stockfish binary

# Set up logging for better debugging
logging.basicConfig(level=logging.DEBUG)

# Route to get the best move or evaluation for a given FEN position
@app.route("/analyze/", methods=["POST"])
def analyze():
    try:
        # Get the FEN and optional depth from the request body
        data = request.get_json()
        fen = data.get("fen")
        depth = data.get("depth", 20) # Higher depth = better moves & more power consumption

        # Validate FEN input
        if not fen:
            return jsonify({"error": "FEN is required"}), 400

        # Initialize the chess board with the provided FEN
        try:
            board = chess.Board(fen)
        except ValueError as e:
            logging.error(f"Invalid FEN: {fen}, Error: {str(e)}")
            return jsonify({"error": "Invalid FEN string"}), 400

        # Start the Stockfish engine
        try:
            with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
                logging.info(f"Starting analysis with depth {depth}...")

                # Get the best move using the specified depth
                result = engine.play(board, chess.engine.Limit(depth=depth))
                best_move = result.move
                evaluation = engine.analyse(board, chess.engine.Limit(depth=depth))['score']

                # Return the best move and evaluation score
                logging.info(f"Best move: {best_move.uci()}, Evaluation: {evaluation}")
                return jsonify({
                    "move": best_move.uci(),
                    "evaluation": str(evaluation)
                })
        except Exception as e:
            logging.error(f"An error occurred while analyzing the FEN: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500

    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": "Bad request"}), 400

if __name__ == "__main__":
    app.run(debug=False, port=3000)
