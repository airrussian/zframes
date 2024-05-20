import { ZTypes } from "ztypes";

import {IFrame} from "./IFrame";
import {IFramePayload} from "./IFramePayload";
import {IFrameHeader} from "./IFrameHeader";
import {FrameHeader} from "./FrameHeader";

import { AuthDescFrame } from "./headers/desc/AutDescFrame";
import { RegDescFrame } from "./headers/desc/RegDescFrame";
import { EndpointDescFrame } from "./headers/desc/EndpointDescFrame";
import { ServerDescFrame } from "./headers/desc/ServerDescFrame";
import { RequestOpcodeFrame } from "./headers/opcode/RequestOpcodeFrame";
import { ReplyOpcodeFrame } from "./headers/opcode/ReplyOpcodeFrame";
import { CommandOpcodeFrame } from "./headers/opcode/CommandOpcodeFrame";
import { NopOpcodeFrame } from "./headers/opcode/NopOpcodeFrame";
import { NotificationOpcodeFrame } from "./headers/opcode/NotificationOpcodeFrame";

export class Frame implements IFrame {

    public static Desc = {
        Auth            : AuthDescFrame,
        Reg             : RegDescFrame,
        Endpoint        : EndpointDescFrame,
        Server          : ServerDescFrame,
        Mock            : ZTypes.U16(0x00ff)
    }

    public static Opcode = {
        Request         : RequestOpcodeFrame,
        Reply           : ReplyOpcodeFrame,
        Command         : CommandOpcodeFrame,
        Notification    : NotificationOpcodeFrame,
        Nop             : NopOpcodeFrame
    }

    header: IFrameHeader; 

    payload: IFramePayload;

    constructor( header: IFrameHeader, payload: IFramePayload = new ZTypes.ZArray() ) {
        this.header = header;
        this.setPayload( payload );
    }

    public setPayload( payload: IFramePayload ): void {
        this.payload = payload;
        this.header.setLength( this.payload.length );
    }

    static create( array: ZTypes.ZArray ): Frame {
        const hFrm = new FrameHeader(array.U16(0), array.U16(2));    
        const pFrm = (array.length > 6) ? new ZTypes.ZArray([...array.slice(6)]) : new ZTypes.ZArray();
        return new Frame(hFrm, pFrm);
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
