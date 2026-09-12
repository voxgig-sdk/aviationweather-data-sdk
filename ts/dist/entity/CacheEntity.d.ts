import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { Cache, CacheLoadMatch } from '../AviationweatherDataTypes';
declare class CacheEntity extends AviationweatherDataEntityBase<Cache> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: CacheEntity): CacheEntity;
    load(this: any, reqmatch?: CacheLoadMatch, ctrl?: Control): Promise<CacheEntity>;
}
export { CacheEntity };
