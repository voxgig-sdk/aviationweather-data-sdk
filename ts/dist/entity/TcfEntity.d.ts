import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Tcf, TcfLoadMatch } from '../AviationweatherDataTypes';
declare class TcfEntity extends AviationweatherDataEntityBase<Tcf> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: TcfEntity): TcfEntity;
    load(this: any, reqmatch?: TcfLoadMatch, ctrl?: Control): Promise<TcfEntity>;
}
export { TcfEntity };
