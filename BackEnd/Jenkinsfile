pipeline {
    agent any

    stages {

       stage('Git Clone') {
          steps {
                checkout scm
            }
        }

        stage('Run Test cases') {
            steps {
                sh "mvn test"
            }
        }

        stage('Build JAR') {
            steps {
                sh "mvn clean install"
            }
        }

        stage('Build image') {
             steps {
                script {
                    dockerImage = docker.build ("${BACKEND_IMAGE}")
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

        stage('Cluster Info') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        sh "kubectl cluster-info"
                    }
                }
            }
        }

        stage('Helm upgrade') {
            steps{
                script {
                    withKubeConfig([credentialsId: 'kubernetesCred']) {
                        sh "helm upgrade backend ./helm/"
                    }
                }
            }
        }


        
    }
}