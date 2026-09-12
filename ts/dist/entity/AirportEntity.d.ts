import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Airport, AirportListMatch } from '../AviationweatherDataTypes';
declare class AirportEntity extends AviationweatherDataEntityBase<Airport> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: AirportEntity): AirportEntity;
    list(this: any, reqmatch?: AirportListMatch, ctrl?: Control): Promise<AirportEntity[]>;
}
export { AirportEntity };
