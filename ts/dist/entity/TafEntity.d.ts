import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Taf, TafListMatch } from '../AviationweatherDataTypes';
declare class TafEntity extends AviationweatherDataEntityBase<Taf> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: TafEntity): TafEntity;
    list(this: any, reqmatch?: TafListMatch, ctrl?: Control): Promise<TafEntity[]>;
}
export { TafEntity };
