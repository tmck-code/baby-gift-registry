import os
import uvicorn

if __name__ == '__main__':
    common = dict(host='0.0.0.0', port=8000, app='backend.app.main:app')
    if os.getenv('ENV') == 'prod':
        uvicorn.run(**common,
                    ssl_keyfile='/run/secrets/tls_key',
                    ssl_certfile='/run/secrets/tls_cert')
    else:
        uvicorn.run(**common, reload=True)
