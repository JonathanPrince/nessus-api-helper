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

### .getFolders()
Returns the folder list

### .getScans([queryObject])
Returns a list of scans
Optional query object can be used to add the query parameters `folder_id` and/or `last_modification_date`

### .getScanById(scanId[, historyId])
Returns scan data for the given scan id

### .getScanHost(scanId, hostId[, historyId])
Returns host data for the the given scan and host id

### .getScanHostPlugin(scanId, hostId, pluginId[, historyId])
Returns the plugin data for the given scan, host and plugin id

