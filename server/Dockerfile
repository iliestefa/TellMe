FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Configurar variables de entorno para evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias necesarias para Chromium y Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    libxkbcommon0 \
    libxext6 \
    libxfixes3 \
    libpango-1.0-0 \
    libgtk-3-0 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y chromium && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]