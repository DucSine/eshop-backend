node {
    def env = ''
    configFileProvider([configFile(fileId: "${params.ENV_FILE}", variable: 'ENV')]) {
        env = readFile(ENV)
    }

    stage('Checkout'){
            checkout scm
    }


    docker.withRegistry("${params.DOCKER_REGISTRY_URL}", "${params.DOCKER_REGISTRY_CREDENTIALS}") {

        sh "rm -f .env"
        sh "echo \"${env}\" >> .env"

        stage "build"
        def app = docker.build "${params.IMAGE_NAME}", "--no-cache --build-arg SERVICE_NAME=${SERVICE_NAME} ."

        stage "publish"
        app.push 'latest'
    }
}
