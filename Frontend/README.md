# UberFrontend

## Objective
Creating frontend react stack for Uber APP

### Maintainer 
<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>NUID</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>Naresh Agrawal</td>
            <td>001054600</td>
        </tr>
    </tbody>
</table>

## Technology Stack
* React
* Helm

## Prerequisites
* React
* npm
* Docker
* Helm

## Running application locally
```
$ npm start
```

* Shutdown application locally
```
$ ctrl+c
```

## Build Docker image
```
$ docker build -t <image-name> .
```

## Run application by Docker image
```
$ docker run --rm -p 3000:80 <image-name>
```
The application should be running and listening for HTTP requests on port 3000 on localhost.
http://localhost:3000/

## Deploy application on Kubernetes Cluster
```
$ helm install frontend ./helm/ --set backend.url=<BackendURL:port>
```

## Uninstall application on Kubernetes Cluster
```
$ helm delete frontend
```

### Test health end points
`<application-ip:3000>/testHealth`<br/>
`<application-ip:3000>/testComms`
