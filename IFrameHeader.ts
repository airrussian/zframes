import { ZTypes } from "ztypes";

export declare interface IFrameHeader {
    desc: ZTypes.U16;

    opcode: ZTypes.U16;

    length: ZTypes.U16;

    setLength( len: number ): void;

    toBytes(): ZTypes.ZArray;
}

