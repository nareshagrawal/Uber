# Uber

## Objective
Deploy frontend on AKS and backend on EKS cluster using Helm Charts via Jenkins CI/CD pipeline

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

### Technology Stack
* AWS
* Azure
* Kubernetes
* Docker
* Terraform
* Ansible
* Jenkins
* Java
* React

### Prerequisites
* AWS CLI
* Azure CLI
* Kubectl
* Docker
* Terraform
* Ansible
* JDK
* Node


### Architecture
![](Arc.png)

### Deployment Instructions
* First create Infrastructure, EKS and AKS cluster 
```
$ cd Infrastructure
```
* Set up Jenkins server
```
$ cd Jenkins
```
* Deploy Backend
```
$ cd Backend
```
* Deploy frontend
```
$ cd Frontend
```
* Deploy App-prereq(EFK, Prometheus, Grafana)
```
$ cd App-prereq-helm-chart
```

#### Detailed README will find in respective folders

