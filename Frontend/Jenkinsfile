pipeline {
    agent any

    stages {

       stage('Git Clone') {
          steps {
                checkout scm
            }
        }

        stage('Build image') {
             steps {
                script {
                    dockerImage = docker.build ("${FRONTEND_IMAGE}")
                }
             
            }
        }

        stage('Registring image') {
            steps{
                script {
                    docker.withRegistry( '', 'dockerCred' ) {
                    dockerImage.push("latest")
                    }
                }
            }
        }

        stage('AWS Cluster Info, Backend Service url') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        sh "kubectl cluster-info"
                        backendIp = sh(returnStdout: true, script: "kubectl describe services backend | grep elb.amazonaws.com | grep LoadBalancer | awk '{print \$3}' | tr -d '\n'")
                        echo "${backendIp}"
                    }
                }
            }
        }

        stage('Azure Cluster Info, Helm upgrade') {
            steps{
                script {
                    sh "az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID"
                    sh "az aks show --resource-group ${resourceGroupName}  --name ${clusterName}  --query fqdn"
                    sh "az aks get-credentials --resource-group ${resourceGroupName}  --name ${clusterName} --overwrite-existing"
                    echo "${backendIp}"
                    sh "helm upgrade frontend ./helm/ --set backend.url='http://${backendIp}:8080'"
                }
            }
        }
        
    }
}