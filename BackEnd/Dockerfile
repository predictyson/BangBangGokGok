FROM openjdk:11-jdk
WORKDIR /var/jenkins_home/workspace/bbkk_backend/BackEnd

COPY build/libs/backend-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]