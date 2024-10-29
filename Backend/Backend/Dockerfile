FROM openjdk:21-jdk-slim
WORKDIR /app/backend
LABEL Maintainer="ayoubakb"
COPY ./target/Backend-0.0.1-SNAPSHOT.jar Backend-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","Backend-0.0.1-SNAPSHOT.jar"]