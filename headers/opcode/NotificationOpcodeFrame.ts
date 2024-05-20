import { ZTypes } from "ztypes";
import { FrameHeaderOpcode } from ".";

export const NotificationOpcodeFrame: FrameHeaderOpcode = ZTypes.U16(0x0003);