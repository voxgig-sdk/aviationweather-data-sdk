import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Cwa, CwaListMatch } from '../AviationweatherDataTypes';
declare class CwaEntity extends AviationweatherDataEntityBase<Cwa> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: CwaEntity): CwaEntity;
    list(this: any, reqmatch?: CwaListMatch, ctrl?: Control): Promise<CwaEntity[]>;
}
export { CwaEntity };
