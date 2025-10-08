export const MQTT_TOPICS = {
  // ========================
  // TÓPICOS DE ESCRITA (API → Python)
  // ========================
  WRITE: {
    // Configurações da máquina
    MACHINE_CONFIGURATIONS_UPDATE: 'swinefarm/machine/configurations/update',

    // Plano alimentar
    FEEDING_PLAN_RESPONSE: 'swinefarm/swine/feeding_plan/response',

    // Parâmetros de alerta
    ALERT_PARAMETERS: 'swinefarm/alert/parameters/update',
  },

  // ========================
  // TÓPICOS DE LEITURA (Python → API)
  // ========================
  READ: {
    // Identificação RFID
    IDENTIFICATION_RFID: 'swinefarm/swine/identification/rfid',

    // Logs de consumo
    CONSUMPTION_LOG: 'swinefarm/swine/consumption/log',

    // Alertas
    ALERTS: 'swinefarm/alerts',
  },
} as const;

// Tipos de tópicos de escrita (API → Python)
export type MqttWriteTopic =
  (typeof MQTT_TOPICS.WRITE)[keyof typeof MQTT_TOPICS.WRITE];

// Tipos de tópicos de leitura (Python → API)
export type MqttReadTopic =
  (typeof MQTT_TOPICS.READ)[keyof typeof MQTT_TOPICS.READ];
