import { ZTypes } from "ztypes";

import {IFrame} from "./IFrame";
import {IFramePayload} from "./IFramePayload";
import {IFrameHeader} from "./IFrameHeader";
import {FrameHeader} from "./FrameHeader";

export class Frame implements IFrame {

    public static Desc = {
        Auth            : ZTypes.U16(0x0000),
        Reg             : ZTypes.U16(0x0001),
        Endpoint        : ZTypes.U16(0x0002),
        Server          : ZTypes.U16(0x0003),
        Mock            : ZTypes.U16(0x00ff)
    }

    public static Opcode = {
        Request         : ZTypes.U16(0x0000),
        Reply           : ZTypes.U16(0x0001),
        Command         : ZTypes.U16(0x0002),
        Notification    : ZTypes.U16(0x0003),
        Nop             : ZTypes.U16(0x0004)
    }

    header: IFrameHeader; 
    payload: IFramePayload;

    constructor(desc: ZTypes.U16, opcode: ZTypes.U16, payload: IFramePayload = new ZTypes.ZArray()) {
        this.header = new FrameHeader( desc, opcode );
        this.setPayload( payload );
    }

    public setPayload( payload: IFramePayload ): void {
        this.payload = payload;
        this.header.setLength( this.payload.length );
    }

    static create( buff: ZTypes.ZArray ): Frame {
        const frm = new Frame(buff.U16(0), buff.U16(2));
        if (buff.length > 6)
            frm.setPayload( new ZTypes.ZArray([...buff.slice(6)]));
        return frm;
    }

    toBytes(): ZTypes.ZArray {
        return new ZTypes.ZArray([
            ...this.header.toBytes(),
            ...this.payload
        ]);
    }

    public checkResponse( frm: IFrame ): boolean {
        return false;
    }

    public toBuffer(): Buffer {
        return Buffer.from(new Uint8Array( this.toBytes() ));
    }

}

export const FrameCreate = 
    (desc: ZTypes.U16, opcode: ZTypes.U16, payload: IFramePayload = new ZTypes.ZArray()) => 
        new Frame(desc, opcode, payload);
