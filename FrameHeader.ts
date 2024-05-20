import {IFrameHeader} from "./IFrameHeader";
import { ZTypes } from "ztypes";
import { FrameHeaderDesc } from "./headers/desc";
import { FrameHeaderOpcode } from "./headers/opcode";

export class FrameHeader implements IFrameHeader {

    public desc     : ZTypes.U16;
    public opcode   : ZTypes.U16;

    public length   : ZTypes.U16;

    constructor( desc: FrameHeaderDesc, opcode: FrameHeaderOpcode ) {
        this.desc = desc;
        this.opcode = opcode;
        this.length = ZTypes.U16(0);
    }

    setLength( len: number ): void {
        this.length = ZTypes.U16( len );
    }

    toBytes(): ZTypes.ZArray {
        return new ZTypes.ZArray([
            ...this.desc.serialize(),
            ...this.opcode.serialize(),
            ...this.length.serialize()
        ]);
    }

}
