import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { StationInfo, StationInfoListMatch } from '../AviationweatherDataTypes';
declare class StationInfoEntity extends AviationweatherDataEntityBase<StationInfo> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: StationInfoEntity): StationInfoEntity;
    list(this: any, reqmatch?: StationInfoListMatch, ctrl?: Control): Promise<StationInfoEntity[]>;
}
export { StationInfoEntity };
