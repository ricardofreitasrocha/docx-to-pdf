FROM node:22-alpine3.20 AS production

WORKDIR /app
COPY . .

RUN npm ci --omit=dev

RUN apk add libreoffice
# COPY --from=mwader/static-ffmpeg:7.1.1 /ffmpeg /usr/local/bin/
# COPY --from=mwader/static-ffmpeg:7.1.1 /ffprobe /usr/local/bin/

EXPOSE 3001

ENTRYPOINT ["node", "./src/app.js"]