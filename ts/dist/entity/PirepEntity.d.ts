import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Pirep, PirepListMatch } from '../AviationweatherDataTypes';
declare class PirepEntity extends AviationweatherDataEntityBase<Pirep> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: PirepEntity): PirepEntity;
    list(this: any, reqmatch?: PirepListMatch, ctrl?: Control): Promise<PirepEntity[]>;
}
export { PirepEntity };
