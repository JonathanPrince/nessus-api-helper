# Nessus API Helper

A simple module to help make requests to the Nessus API.

## Usage

Create a client instance:
```
  const nessus = new Nessus({
    host: 'localhost',
    user: 'username',
    pass: 'password'
  })
```

Authenticate:
```
  await nessus.authenticate()
```

Make requests:
```
  const scanData = await nessus.getScanById(<scanId>)
```

## Constructor Config

| key       | description                     | default     |
|-----------|---------------------------------|-------------|
| host      | Hostname or IP of Nessus server | localhost   |
| port      | Nessus port                     | 8834        |
| protocol  | http or https                   | https       |
| user      | Nessus username                 |             |
| password  | Nessus password                 |             |

## Methods

### .authenticate()
Uses the user and password supplied in the constructor to set auth headers for subsequent requests.

### .getScans()
Returns a list of scans

### .getScanById(scanId)
Returns scan data for the given scan id

### .getScanHost(scanId, hostId)
Returns host data for the the given scan and host id

### .getScanHostPlugin(scanId, hostId, pluginId)
Returns the plugin data for the given scan, host and plugin id

