<template>
  <main>
    <canvas id="mxn-chessboard"></canvas>
  </main>
</template>

<style scoped>
canvas {
  background-color: darkgray;
}
</style>

<script lang="ts" setup>
import { onMounted } from "vue";

const props = defineProps({
  sqrSize: { type: Number, default: 70 },
  numRows: { type: Number, default: 8 },
  numCols: { type: Number, default: 8 },
  lightColor: { type: String, default: "rgb(238, 238, 238)" },
  darkColor: { type: String, default: "rgb(148, 141, 148)" },
  reverseColors: { type: Boolean, default: false },
  flip: { type: Boolean, default: false }
});

function draw(): void {
  console.log("Draw Chessboard Called");

  const canvas: HTMLCanvasElement = document.getElementById("mxn-chessboard") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
  const numRows: number = props.numRows;
  const numCols: number = props.numCols;
  const sqrSize: number = props.sqrSize;
  const fontSize: number = sqrSize / 6;
  const leftBorderSize: number = sqrSize / 4 + ((Math.ceil(numRows / 10) - 1) * fontSize) / 8;
  const bottomBorderSize: number = sqrSize / 4;

  canvas.width = sqrSize * numCols + leftBorderSize;
  canvas.height = sqrSize * numRows + bottomBorderSize;

  drawBoard(ctx, leftBorderSize);
  drawLabels(canvas, ctx, fontSize, leftBorderSize, bottomBorderSize);
}

function drawBoard(ctx: CanvasRenderingContext2D, leftBorderSize: number): void {
  const numRows: number = props.numRows;
  const numCols: number = props.numCols;
  const sqrSize: number = props.sqrSize;
  const evenOrOdd: number = Number(props.reverseColors);
  const lightColor: string = props.lightColor;
  const darkColor: string = props.darkColor;

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      ctx.fillStyle = (r + c) % 2 == evenOrOdd ? lightColor : darkColor;
      ctx.fillRect(sqrSize * c + leftBorderSize, sqrSize * r, sqrSize, sqrSize);
    }
  }
}

function drawLabels(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  fontSize: number,
  leftBorderSize: number,
  bottomBorderSize: number
): void {
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  drawRankLabels(canvas, ctx, leftBorderSize, bottomBorderSize);
  drawFileLabels(canvas, ctx, leftBorderSize, bottomBorderSize);
}

function drawRankLabels(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  leftBorderSize: number,
  bottomBorderSize: number
): void {
  const numRows: number = props.numRows;
  const sqrSize: number = props.sqrSize;
  const flip: boolean = props.flip;

  const increment: number = flip ? -1 : 1;
  const rankX: number = leftBorderSize / 2;
  let rankY: number = canvas.height - bottomBorderSize - sqrSize / 2;
  let rank: number = flip ? numRows : 1;

  for (let r = 0; r < numRows; r++) {
    ctx.fillText(rank.toString(), rankX, rankY);

    rankY -= sqrSize;
    rank += increment;
  }
}

function drawFileLabels(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  leftBorderSize: number,
  bottomBorderSize: number
): void {
  const numCols: number = props.numCols;
  const sqrSize: number = props.sqrSize;
  const flip: boolean = props.flip;

  let fileX: number = leftBorderSize + sqrSize / 2;
  const fileY: number = canvas.height - bottomBorderSize / 2;
  const fileLabels: string[] = generateFileLabels(numCols);
  if (flip) fileLabels.reverse();

  for (let c = 0; c < numCols; c++) {
    ctx.fillText(fileLabels[c] as string, fileX, fileY);

    fileX += sqrSize;
  }
}

function generateFileLabels(numFiles: number): string[] {
  const fileLabels: string[] = [];

  for (let f = 1; f <= numFiles; f++) {
    let num: number = f;
    let result: string = "";

    while (num > 0) {
      const remainder: number = (num - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      num = Math.floor((num - 1) / 26);
    }

    fileLabels.push(result);
  }

  return fileLabels;
}

onMounted(draw);
</script>
