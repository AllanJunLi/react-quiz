import React from "react";
import Button from "react-bootstrap/Button";

export default function StartGame({ startGame }: { startGame: () => void }) {
  return (
    <div>
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
}
