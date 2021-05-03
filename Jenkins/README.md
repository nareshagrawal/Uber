# Jenkins

## Infrastructure as Code with Ansible

## Objective
Building Jenkins server, to deploye application on Kubernetes Cluster via CI/CD pipeline

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

### Architecture
![](Arc.png)

### Technology Stack
* AWS
* Ansible

### Prerequisites
* AWS CLI
* Ansible


### Build Instructions
- Run following commands in the root directory
```
 $ ansible-playbook -i hosts create.yml -v --extra-var "elastic_ip=<elastic_ip> instance_type=<nstance_type>"
```

<b>Note</b>: Change variables value according to need 

### Destroy Instruction 
```
 $ ansible-playbook terminate.yml -v --extra-var "elastic_ip=<elastic_ip> instance_type=<nstance_type>"
```

### Environment Variable Setup in Jenkins Server
* FRONTEND_IMAGE = <Frontend_docker_repository_name>
* BACKEND_IMAGE = <Backend_docker_repository_name>
* resourceGroupName = <Azure_Resource_Group_Name>
* clusterName = <Azure_Cluster_Name>
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_DEFAULT_REGION
* AZURE_CLIENT_ID
* AZURE_CLIENT_SECRET
* AZURE_TENANT_ID


### Set up credentials in Jenkins server
* For Docker
* For EKS Cluster