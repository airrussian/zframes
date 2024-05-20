import { ZTypes } from "ztypes";
import { Frame } from "./Frame";
import { IFrame } from "./IFrame";
import { IFramePayload } from "./IFramePayload";

export default class CmdFrame extends Frame {

    private reqCode: ZTypes.U16;
    
    constructor( cmd: IFramePayload ) {        
        super(Frame.Desc.Reg, Frame.Opcode.Request, cmd );
        this.reqCode = cmd.U16(0);
    }

    public checkResponse( frm: IFrame ): boolean {

        if ( frm.header.desc.compare( Frame.Desc.Reg ) && frm.header.opcode.compare( Frame.Opcode.Reply )) {
            const reqCode = frm.payload.U16(0);
            const replyStatus = frm.payload.U16(2);
    
            return replyStatus.compare(ZTypes.U16(0)) && reqCode.compare(this.reqCode);
        }

        return false;
    }
    
}