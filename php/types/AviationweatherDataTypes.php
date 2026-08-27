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
    public ?string $airsigmetType = null;
    public ?int $altitudeHigh = null;
    public ?int $altitudeLow = null;
    public ?string $fir = null;
    public ?string $hazard = null;
    public ?string $issueTime = null;
    public ?string $rawAirSigmet = null;
    public ?string $severity = null;
    public ?string $validTimeFrom = null;
    public ?string $validTimeTo = null;
}

/** Request payload for AirSigmet#list. */
class AirSigmetListMatch
{
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
    public ?string $hazard = null;
}

/** Airport entity data model. */
class Airport
{
    public ?string $city = null;
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iataId = null;
    public ?string $icaoId = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $state = null;
}

/** Request payload for Airport#list. */
class AirportListMatch
{
    public ?string $bbox = null;
    public ?string $format = null;
    public ?string $ids = null;
}

/** Cache entity data model. */
class Cache
{
}

/** Request payload for Cache#load. */
class CacheLoadMatch
{
}

/** Cwa entity data model. */
class Cwa
{
    public ?string $cwsu = null;
    public ?string $issueTime = null;
    public ?string $rawText = null;
    public ?int $sequence = null;
    public ?string $seriesId = null;
    public ?string $validTimeFrom = null;
    public ?string $validTimeTo = null;
}

/** Request payload for Cwa#list. */
class CwaListMatch
{
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
}

/** GAirmet entity data model. */
class GAirmet
{
    public ?int $altitudeHigh = null;
    public ?int $altitudeLow = null;
    public ?string $hazard = null;
    public ?string $issueTime = null;
    public ?string $qualifier = null;
    public ?string $severity = null;
    public ?string $validTimeFrom = null;
    public ?string $validTimeTo = null;
}

/** Request payload for GAirmet#list. */
class GAirmetListMatch
{
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
    public ?string $hazard = null;
}

/** Metar entity data model. */
class Metar
{
    public ?float $altim = null;
    public ?array $clouds = null;
    public ?float $dewp = null;
    public ?float $elev = null;
    public ?string $fltCat = null;
    public ?string $icaoId = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $maxT = null;
    public ?float $maxT24 = null;
    public ?string $metarType = null;
    public ?float $minT = null;
    public ?float $minT24 = null;
    public ?int $mostRecent = null;
    public ?string $name = null;
    public ?string $obsTime = null;
    public ?float $pcp24hr = null;
    public ?float $pcp3hr = null;
    public ?float $pcp6hr = null;
    public ?float $precip = null;
    public ?float $presTend = null;
    public ?int $prior = null;
    public ?int $qcField = null;
    public ?string $rawOb = null;
    public ?string $rawTaf = null;
    public ?string $reportTime = null;
    public ?float $slp = null;
    public ?float $snow = null;
    public ?float $temp = null;
    public ?int $vertVis = null;
    public ?string $visib = null;
    public ?int $wdir = null;
    public ?int $wgst = null;
    public ?int $wspd = null;
    public ?string $wxString = null;
}

/** Request payload for Metar#list. */
class MetarListMatch
{
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
    public ?string $ids = null;
    public ?bool $taf = null;
}

/** Pirep entity data model. */
class Pirep
{
    public ?string $aircraftType = null;
    public ?int $altitudeFt = null;
    public ?array $clouds = null;
    public ?string $icing = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $obsTime = null;
    public ?string $rawOb = null;
    public ?string $reportType = null;
    public ?float $temp = null;
    public ?string $turbulence = null;
    public ?string $visibility = null;
    public ?int $wdir = null;
    public ?int $wspd = null;
    public ?string $wxString = null;
}

/** Request payload for Pirep#list. */
class PirepListMatch
{
    public ?int $age = null;
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
}

/** StationInfo entity data model. */
class StationInfo
{
    public ?string $country = null;
    public ?float $elev = null;
    public ?string $iataId = null;
    public ?string $icaoId = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?int $priority = null;
    public ?string $site = null;
    public ?string $state = null;
}

/** Request payload for StationInfo#list. */
class StationInfoListMatch
{
    public ?string $bbox = null;
    public ?string $format = null;
    public ?string $ids = null;
}

/** Taf entity data model. */
class Taf
{
    public ?string $bulletinTime = null;
    public ?float $elev = null;
    public ?array $fcsts = null;
    public ?string $icaoId = null;
    public ?string $issueTime = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $name = null;
    public ?string $rawTAF = null;
    public ?string $validTimeFrom = null;
    public ?string $validTimeTo = null;
}

/** Request payload for Taf#list. */
class TafListMatch
{
    public ?string $bbox = null;
    public ?string $date = null;
    public ?string $format = null;
    public ?string $ids = null;
}

/** Tcf entity data model. */
class Tcf
{
}

/** Request payload for Tcf#load. */
class TcfLoadMatch
{
    public ?string $date = null;
    public ?string $format = null;
}

