pipeline{
agent any
  stages{
    stage('Build') {
     steps {
             script{
                 sh 'npm install'
                 sh 'npm run build'

                 }
               }     
          }
  }

}
