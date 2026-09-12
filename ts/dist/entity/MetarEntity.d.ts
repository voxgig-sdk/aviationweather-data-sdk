import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Metar, MetarListMatch } from '../AviationweatherDataTypes';
declare class MetarEntity extends AviationweatherDataEntityBase<Metar> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: MetarEntity): MetarEntity;
    list(this: any, reqmatch?: MetarListMatch, ctrl?: Control): Promise<MetarEntity[]>;
}
export { MetarEntity };
