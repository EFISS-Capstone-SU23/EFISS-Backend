# Base image with build tools
FROM ubuntu:20.04 as builder

ARG DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get -y upgrade \
    && apt-get install -y --no-install-recommends \
    git \
    wget \
    g++ \
    curl \
    ca-certificates \
    build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev \
    libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev \
    && rm -rf /var/lib/apt/lists/*

# Download and extract NGINX source
RUN wget http://nginx.org/download/nginx-1.16.1.tar.gz && \
    tar -xzvf nginx-1.16.1.tar.gz

# Clone the upstream check module
RUN git clone https://github.com/yaoweibin/nginx_upstream_check_module

# Apply the patch
RUN cd nginx-1.16.1/ && \
    patch -p1 < ../nginx_upstream_check_module/check_1.16.1+.patch

# For SSL support
RUN wget https://www.openssl.org/source/openssl-1.0.1t.tar.gz && \
    tar -xzvf openssl-1.0.1t.tar.gz

# Build NGINX with the additional module
RUN cd nginx-1.16.1/ && \
    ./configure --add-module=../nginx_upstream_check_module --with-http_ssl_module --with-openssl=../openssl-1.0.1t && \
    make && \
    make install

# Final image
FROM ubuntu:20.04

# Copy NGINX binaries from the builder image
COPY --from=builder /usr/local/nginx /usr/local/nginx

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Start NGINX
CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]
