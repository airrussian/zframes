import {IFrameHeader} from "./IFrameHeader";
import {IFramePayload} from "./IFramePayload";
import { ZTypes } from "ztypes";

export declare interface IFrame {

    header: IFrameHeader;
    payload: IFramePayload;

    setPayload( payload: IFramePayload ): void;

    checkResponse( frm: IFrame ): boolean;

    toBytes(): ZTypes.ZArray;

    toBuffer(): Buffer;

}
