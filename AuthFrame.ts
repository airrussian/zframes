import { ZTypes } from "ztypes";
import { Frame } from "./Frame";
import { IFrame } from "./IFrame";

export default class AuthFrame extends Frame {

    /**
     * Тип авторизации
     * @private
     */
    private aType: ZTypes.U16;

    /**
     * Тип котла
     * @private
     */
    private bType: ZTypes.U16;

    /**
     * Серийный номер котла
     * @private
     */
    private serial: ZTypes.U32;

    /**
     * Пароль от котла
     * @private
     */
    private password: ZTypes.U32;

    constructor(bType: number, serial: number, password: number) {

        super(Frame.Desc.Auth, Frame.Opcode.Request);

        this.aType = ZTypes.U16(0);
        this.bType = ZTypes.U16(bType);
        this.serial = ZTypes.U32(serial);
        this.password = ZTypes.U32(password);

        this.setPayload( this.getPayload() );
    }

    public getPayload(): ZTypes.ZArray {
        return new ZTypes.ZArray([
            ...this.aType.serialize(),
            ...this.bType.serialize(),
            ...this.serial.serialize(),
            ...this.password.serialize()
        ]);
    }

    /**
     * Проверяет frm, является ли то, ответом на авторизационный запрос к серверу
     * @override
     * @param frm
     */
    public checkResponse( frm: IFrame ): boolean {
        return this.testSuccessAuth( frm ) || this.testFailAuth( frm );
    }

    /**
     * Проверяет frm, является ответом на запрос авторизации (Успешный)
     * @param frm
     */
    private testSuccessAuth( frm: IFrame ): boolean {
        return  frm.header.desc.compare( Frame.Desc.Auth ) &&
                frm.header.opcode.compare( Frame.Opcode.Reply );
    }

    /**
     * Проверяет фрайм, является ответом на запрос авторизации (Не успешный)
     *
     * Крайне неоднозначная проверка, но других вариантов вроде как и нету.
     * Проверяет frm на то, что ответ на авторизационный фрейм,
     * но авторизация закончилась "провалом".
     *
     * Сделан исходя из экспериментов
     *
     * @param frm
     * @return boolean
     */
    private testFailAuth( frm: IFrame ): boolean {
        return  frm.header.desc.compare( Frame.Desc.Endpoint ) &&
                frm.header.opcode.compare( Frame.Opcode.Notification );
    }
}
