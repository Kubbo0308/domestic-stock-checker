#####################################
# dev stage
#####################################
FROM golang:1.23.5-alpine3.21 as dev
ENV GO111MODULE on
RUN apk update && \
  apk --no-cache add git && \
  apk --no-cache add bash
ARG USERNAME=vscode
RUN addgroup -g 1000 ${USERNAME} && \
  adduser -u 1000 -G ${USERNAME} -s /bin/sh -D ${USERNAME}
USER ${USERNAME}
WORKDIR /go/src/app
RUN go mod init backend
RUN go mod tidy && \
  go install github.com/cosmtrek/air@v1.40.4
CMD ["air", "-c", ".air.toml"]


#####################################
# build stage
#####################################
FROM golang:1.23.5-alpine3.21 as builder
WORKDIR /app

# Download Go module dependencies (cache layer)
COPY go.mod go.sum ./
RUN go mod download
# Copy source code (if not already copied in base stage)
COPY . .
# Build the Go binary for Linux (statically linked for Alpine compatibility)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/main .


#####################################
# runner stage
#####################################
FROM alpine:3.21 as runner
WORKDIR /app
# Copy the statically compiled binary from the builder stage
COPY --from=builder /app/main .
# (Optionally copy any other needed files, e.g. configs or static assets)
# Expose the service port
EXPOSE 8080
# Run the compiled Go binary
CMD ["./main"]