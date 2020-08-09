export interface Sensor {
    name: string;
    value: number;
    unit: SensorQuantity;
    limit: number;
}

export enum SensorQuantity {
    TEMPERATURE = 0,
    PRESSURE = 1,
    HUMIDITY = 2,
    LIGHT = 3
}

export function getUnitString(sensorQuantity: SensorQuantity) {
    switch (sensorQuantity) {
        case SensorQuantity.TEMPERATURE:
            return "\xB0C";  // degree Celsius
        case SensorQuantity.PRESSURE:
            return "mbar";
        case SensorQuantity.HUMIDITY:
            return "%";
        default:
            break;
    }
}