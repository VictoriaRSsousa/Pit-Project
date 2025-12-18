export interface SensorData {
    temperatura: number;
    umidade: number;
    portaProducao?: boolean;
    incendio?: boolean;
    presenca?: boolean;
    camera?: boolean;
}