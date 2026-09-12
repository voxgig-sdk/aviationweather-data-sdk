import { AviationweatherDataEntityBase } from '../AviationweatherDataEntityBase';
import type { AviationweatherDataSDK } from '../AviationweatherDataSDK';
import type { Control } from '../types';
import type { GAirmet, GAirmetListMatch } from '../AviationweatherDataTypes';
declare class GAirmetEntity extends AviationweatherDataEntityBase<GAirmet> {
    constructor(client: AviationweatherDataSDK, entopts: any);
    make(this: GAirmetEntity): GAirmetEntity;
    list(this: any, reqmatch?: GAirmetListMatch, ctrl?: Control): Promise<GAirmetEntity[]>;
}
export { GAirmetEntity };
