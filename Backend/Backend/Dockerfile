
FROM openjdk:21-jdk-slim AS build
WORKDIR /app/backend
LABEL Maintainer="ayoubakb"

COPY --chmod=0755 mvnw mvnw
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw clean install -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app/backend
COPY --from=build /app/backend/target/Backend-0.0.1-SNAPSHOT.jar Backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "Backend-0.0.1-SNAPSHOT.jar"]