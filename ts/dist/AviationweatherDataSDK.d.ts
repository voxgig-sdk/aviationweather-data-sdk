import { AirSigmetEntity } from './entity/AirSigmetEntity';
import { AirportEntity } from './entity/AirportEntity';
import { CacheEntity } from './entity/CacheEntity';
import { CwaEntity } from './entity/CwaEntity';
import { GAirmetEntity } from './entity/GAirmetEntity';
import { MetarEntity } from './entity/MetarEntity';
import { PirepEntity } from './entity/PirepEntity';
import { StationInfoEntity } from './entity/StationInfoEntity';
import { TafEntity } from './entity/TafEntity';
import { TcfEntity } from './entity/TcfEntity';
export type * from './AviationweatherDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AviationweatherDataEntityBase } from './AviationweatherDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AviationweatherDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AirSigmet(entopts?: Record<string, any>): AirSigmetEntity;
    Airport(entopts?: Record<string, any>): AirportEntity;
    Cache(entopts?: Record<string, any>): CacheEntity;
    Cwa(entopts?: Record<string, any>): CwaEntity;
    GAirmet(entopts?: Record<string, any>): GAirmetEntity;
    Metar(entopts?: Record<string, any>): MetarEntity;
    Pirep(entopts?: Record<string, any>): PirepEntity;
    StationInfo(entopts?: Record<string, any>): StationInfoEntity;
    Taf(entopts?: Record<string, any>): TafEntity;
    Tcf(entopts?: Record<string, any>): TcfEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AviationweatherDataSDK;
    tester(testopts?: any, sdkopts?: any): AviationweatherDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AviationweatherDataSDK;
export { stdutil, config, BaseFeature, AviationweatherDataEntityBase, AviationweatherDataSDK, SDK, };
