export default function ControlPanel({ size, onSize, speed, onSpeed }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap:"20px"
      }}
    >
      <label style={{textAlign:"right", fontWeight:"bold"}}>
        Size
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          onChange={(event) => onSize(event.target.value)}
          value={size}
          style={{ writingMode: "vertical-lr", textAlign:"left", transform:"rotate(180deg)" }}
        />
      </label>
      <label style={{textAlign:"right", fontWeight:"bold"}}>
        Speed
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          onChange={(event) => onSpeed(event.target.value)}
          value={speed}
          style={{ writingMode: "vertical-lr", textAlign:"left", transform:"rotate(180deg)" }}
        />
      </label>
    </div>
  );
}
