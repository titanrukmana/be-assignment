FROM --platform=linux/amd64 golang:1.22.0-alpine as builder

WORKDIR /app

COPY . .

RUN go get

RUN go build -tags=jsoniter -o app .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/app .

COPY .env .

EXPOSE 3000

CMD ["./app"]