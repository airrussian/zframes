import { ZTypes } from "ztypes";

export declare interface IFrameHeader {
    desc: ;

    opcode: ZTypes.U16;

    length: ZTypes.U16;

    setLength( len: number ): void;

    toBytes(): ZTypes.ZArray;
}

