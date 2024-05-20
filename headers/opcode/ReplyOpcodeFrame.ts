import { ZTypes } from "ztypes";
import { FrameHeaderOpcode } from ".";

export const ReplyOpcodeFrame: FrameHeaderOpcode = ZTypes.U16(0x0001);