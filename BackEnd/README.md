# UberBackEnd

## Objective
Creating REST Spring Boot API backend stack for Uber APP

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
* Spring Boot
* MYSQL 
* Helm

## Prerequisites
* JAVA(JDK)
* Docker
* Helm

## Running application locally
```
$ mvn package
$ cd target
$ java -jar uber-uber.jar
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
$ docker run --rm -p 8080:8080 <image-name>
```
The application should be running and listening for HTTP requests on port 8080 on localhost.
http://localhost:8080/

## Deploy application on Kubernetes Cluster
```
$ helm install backend ./helm/
```

## Uninstall application on Kubernetes Cluster
```
$ helm delete backend
```

### Test health end point
`<application-ip:8080>/health`