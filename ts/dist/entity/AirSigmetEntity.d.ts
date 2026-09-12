import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { AirSigmet, AirSigmetListMatch } from '../AviationweatherDataTypes';
declare class AirSigmetEntity extends AviationweatherDataEntityBase<AirSigmet> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: AirSigmetEntity): AirSigmetEntity;
    list(this: any, reqmatch?: AirSigmetListMatch, ctrl?: Control): Promise<AirSigmetEntity[]>;
}
export { AirSigmetEntity };
