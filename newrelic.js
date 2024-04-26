exports.config = {
    app_name: ['Practica 5 Distribuidos'],
    license_key: 'eu01xx3dcd5aa75093308dc1fc2bcb59FFFFNRAL', // only thing required (or set NEW_RELIC_LICENSE_KEY env variable)
    logging: {
      level: 'info'
    },
    agent_enabled: true,
    error_collector: {
      enabled: true,
      ignore_status_codes: [404, 405, 418]
    },
    process_host: {
      display_name: "Practica 5 Distribuidos",
    }
  }
  