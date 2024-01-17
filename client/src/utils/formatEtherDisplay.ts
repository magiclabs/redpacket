const rounding = require("significant-rounding");
import { formatEther } from "viem";

export function formatEtherDisplay(ether: bigint): string {
  return `${rounding(Number(formatEther(ether ?? BigInt(0))), 5)}`;
}
