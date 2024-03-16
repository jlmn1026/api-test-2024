import Canvas from "./features/Canvas";
import Results from "./features/Results";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Canvas />
      </div>
      <h2>Result</h2>
      <Results />
    </div>
  );
}

export default App;
