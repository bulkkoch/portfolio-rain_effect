export default function ControlPanel({ onSize, onSpeed }) {
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
      <label style={{textAlign:"right"}}>
        Size
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          onChange={(event) => onSize(event.target.value)}
          style={{ writingMode: "vertical-lr", textAlign:"left", transform:"rotate(180deg)" }}
        />
      </label>
      <label style={{textAlign:"right"}}>
        Speed
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          onChange={(event) => onSpeed(event.target.value)}
          style={{ writingMode: "vertical-lr", textAlign:"left", transform:"rotate(180deg)" }}
        />
      </label>
    </div>
  );
}
