import { useRef } from "react";
import { appApi } from "../api/apiClient";
import { mutate } from "swr";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let mouseX: number | null = null;
  let mouseY: number | null = null;

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 || !canvasRef.current) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    console.log(e.clientY, rect.top);
    console.log(e.clientX, rect.left);

    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    draw(x, y);
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1 || !canvasRef.current) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    draw(x, y);
  };

  const drawEnd = () => {
    mouseX = null;
    mouseY = null;
  };

  const draw = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    if (!mouseX || !mouseY) {
      ctx.moveTo(x, y);
    } else {
      ctx.moveTo(mouseX, mouseY);
    }
    ctx.lineTo(x, y);
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    mouseX = x;
    mouseY = y;
  };

  const clearRect = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 100, 100);
  };

  const saveAndAnalysis = async () => {
    const imgData = canvasRef.current?.toDataURL("image/png");
    if (imgData) {
      await appApi.appControllerSaveAndAnalysisImage({
        imgData,
      });
      clearRect();
      mutate("latest-results");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div>
        <h2>Draw a picture</h2>
      </div>
      <div
        style={{
          width: "100px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <canvas
          onMouseDown={onClick}
          onMouseMove={onMove}
          onMouseUp={drawEnd}
          onMouseOut={drawEnd}
          ref={canvasRef}
          width="100px"
          height="100px"
          style={{ background: "#fff" }}
        />
      </div>

      <button onClick={saveAndAnalysis}>Save＆Analysis</button>
    </div>
  );
};

export default Canvas;
