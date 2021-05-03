# UberInfrastructure

## Infrastructure as Code with Terraform

## Objective
Building Kubernetes Cluster infrastructure on the AWS and Azure 

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
* EKS
* AKS
* Terraform

### Prerequisites
* AWS CLI
* Azure CLI
* Terraform


### Build Instructions
- Run following commands in the root directory
```
 $ terraform init
 $ terraform plan -var-file="variable.tfvars"
 $ terraform apply -var-file="variable.tfvars"
```

<b>Note</b>: Change variables value in the variable.tfvars according to need 

### Destroy Instruction 
```
 $ terraform destroy -var-file="variable.tfvars"
```

### Load Testing using Jmeter
```
$ cd LoadTesting
open file in Jmeter
```