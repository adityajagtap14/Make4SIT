# Use the official Puppeteer image which comes with Chrome pre-installed
FROM ghcr.io/puppeteer/puppeteer:latest

# Skip downloading Chromium when installing puppeteer 
# and tell puppeteer to use the installed Google Chrome
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package files (ensure correct ownership since Puppeteer image uses 'pptruser')
COPY --chown=pptruser:pptruser package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY --chown=pptruser:pptruser . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
