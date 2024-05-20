import { ZTypes } from "ztypes";
import { FrameHeaderOpcode } from ".";

export const NopOpcodeFrame: FrameHeaderOpcode = ZTypes.U16(0x0004);