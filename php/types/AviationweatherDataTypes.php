<?php
declare(strict_types=1);

// Typed models for the AviationweatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AirSigmet entity data model. */
class AirSigmet
{
    public ?string $airsigmet_type = null;
    public ?int $altitude_high = null;
    public ?int $altitude_low = null;
    public ?string $fir = null;
    public ?string $hazard = null;
    public ?string $issue_time = null;
    public ?string $raw_air_sigmet = null;
    public ?string $severity = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Match filter for AirSigmet#list (any subset of AirSigmet fields). */
class AirSigmetListMatch
{
    public ?string $airsigmet_type = null;
    public ?int $altitude_high = null;
    public ?int $altitude_low = null;
    public ?string $fir = null;
    public ?string $hazard = null;
    public ?string $issue_time = null;
    public ?string $raw_air_sigmet = null;
    public ?string $severity = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Airport entity data model. */
class Airport
{
    public ?string $city = null;
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iata_id = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $state = null;
}

/** Match filter for Airport#list (any subset of Airport fields). */
class AirportListMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iata_id = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $state = null;
}

/** Cache entity data model. */
class Cache
{
}

/** Match filter for Cache#load (any subset of Cache fields). */
class CacheLoadMatch
{
}

/** Cwa entity data model. */
class Cwa
{
    public ?string $cwsu = null;
    public ?string $issue_time = null;
    public ?string $raw_text = null;
    public ?int $sequence = null;
    public ?string $series_id = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Match filter for Cwa#list (any subset of Cwa fields). */
class CwaListMatch
{
    public ?string $cwsu = null;
    public ?string $issue_time = null;
    public ?string $raw_text = null;
    public ?int $sequence = null;
    public ?string $series_id = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** GAirmet entity data model. */
class GAirmet
{
    public ?int $altitude_high = null;
    public ?int $altitude_low = null;
    public ?string $hazard = null;
    public ?string $issue_time = null;
    public ?string $qualifier = null;
    public ?string $severity = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Match filter for GAirmet#list (any subset of GAirmet fields). */
class GAirmetListMatch
{
    public ?int $altitude_high = null;
    public ?int $altitude_low = null;
    public ?string $hazard = null;
    public ?string $issue_time = null;
    public ?string $qualifier = null;
    public ?string $severity = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Metar entity data model. */
class Metar
{
    public ?float $altim = null;
    public ?array $cloud = null;
    public ?float $dewp = null;
    public ?float $elev = null;
    public ?string $flt_cat = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $max_t = null;
    public ?float $max_t24 = null;
    public ?string $metar_type = null;
    public ?float $min_t = null;
    public ?float $min_t24 = null;
    public ?int $most_recent = null;
    public ?string $name = null;
    public ?string $obs_time = null;
    public ?float $pcp24hr = null;
    public ?float $pcp3hr = null;
    public ?float $pcp6hr = null;
    public ?float $precip = null;
    public ?float $pres_tend = null;
    public ?int $prior = null;
    public ?int $qc_field = null;
    public ?string $raw_ob = null;
    public ?string $raw_taf = null;
    public ?string $report_time = null;
    public ?float $slp = null;
    public ?float $snow = null;
    public ?float $temp = null;
    public ?int $vert_vi = null;
    public ?string $visib = null;
    public ?int $wdir = null;
    public ?int $wgst = null;
    public ?int $wspd = null;
    public ?string $wx_string = null;
}

/** Match filter for Metar#list (any subset of Metar fields). */
class MetarListMatch
{
    public ?float $altim = null;
    public ?array $cloud = null;
    public ?float $dewp = null;
    public ?float $elev = null;
    public ?string $flt_cat = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $max_t = null;
    public ?float $max_t24 = null;
    public ?string $metar_type = null;
    public ?float $min_t = null;
    public ?float $min_t24 = null;
    public ?int $most_recent = null;
    public ?string $name = null;
    public ?string $obs_time = null;
    public ?float $pcp24hr = null;
    public ?float $pcp3hr = null;
    public ?float $pcp6hr = null;
    public ?float $precip = null;
    public ?float $pres_tend = null;
    public ?int $prior = null;
    public ?int $qc_field = null;
    public ?string $raw_ob = null;
    public ?string $raw_taf = null;
    public ?string $report_time = null;
    public ?float $slp = null;
    public ?float $snow = null;
    public ?float $temp = null;
    public ?int $vert_vi = null;
    public ?string $visib = null;
    public ?int $wdir = null;
    public ?int $wgst = null;
    public ?int $wspd = null;
    public ?string $wx_string = null;
}

/** Pirep entity data model. */
class Pirep
{
    public ?string $aircraft_type = null;
    public ?int $altitude_ft = null;
    public ?array $cloud = null;
    public ?string $icing = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $obs_time = null;
    public ?string $raw_ob = null;
    public ?string $report_type = null;
    public ?float $temp = null;
    public ?string $turbulence = null;
    public ?string $visibility = null;
    public ?int $wdir = null;
    public ?int $wspd = null;
    public ?string $wx_string = null;
}

/** Match filter for Pirep#list (any subset of Pirep fields). */
class PirepListMatch
{
    public ?string $aircraft_type = null;
    public ?int $altitude_ft = null;
    public ?array $cloud = null;
    public ?string $icing = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $obs_time = null;
    public ?string $raw_ob = null;
    public ?string $report_type = null;
    public ?float $temp = null;
    public ?string $turbulence = null;
    public ?string $visibility = null;
    public ?int $wdir = null;
    public ?int $wspd = null;
    public ?string $wx_string = null;
}

/** StationInfo entity data model. */
class StationInfo
{
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iata_id = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?string $site = null;
    public ?string $state = null;
}

/** Match filter for StationInfo#list (any subset of StationInfo fields). */
class StationInfoListMatch
{
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iata_id = null;
    public ?string $icao_id = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?string $site = null;
    public ?string $state = null;
}

/** Taf entity data model. */
class Taf
{
    public ?string $bulletin_time = null;
    public ?float $elev = null;
    public ?array $fcst = null;
    public ?string $icao_id = null;
    public ?string $issue_time = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $raw_taf = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Match filter for Taf#list (any subset of Taf fields). */
class TafListMatch
{
    public ?string $bulletin_time = null;
    public ?float $elev = null;
    public ?array $fcst = null;
    public ?string $icao_id = null;
    public ?string $issue_time = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $raw_taf = null;
    public ?string $valid_time_from = null;
    public ?string $valid_time_to = null;
}

/** Tcf entity data model. */
class Tcf
{
}

/** Match filter for Tcf#load (any subset of Tcf fields). */
class TcfLoadMatch
{
}

