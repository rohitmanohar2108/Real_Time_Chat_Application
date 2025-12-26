.

# Scalable Real-Time WebSocket Application using Redis (Valkey)

## Overview
This project is a scalable real-time WebSocket application built using Node.js, WebSockets, and Redis (Valkey-compatible) deployed on Aiven Cloud.  
It demonstrates how Redis Pub/Sub architecture can be used to scale WebSocket-based systems across multiple backend instances while maintaining low latency and consistent message delivery.

This architecture is commonly used in enterprise-grade real-time systems such as live dashboards, fleet telemetry, alerts, and IoT platforms.

---

## Project Goals
- Solve WebSocket scalability limitations  
- Enable horizontal scaling of backend servers  
- Ensure real-time synchronization across distributed instances  
- Use cloud-managed infrastructure for reliability and availability  

---

## Tech Stack
- Backend: Node.js  
- Real-Time Communication: WebSockets (ws)  
- Message Broker: Redis (Valkey-compatible)  
- Cloud Provider: Aiven Cloud  
- Configuration: dotenv  
- Optional: Docker, Nginx, CI/CD  

---

## System Architecture
- Each backend server hosts an independent WebSocket server  
- All servers connect to a shared Redis instance  
- Messages are published to Redis channels  
- Redis broadcasts messages to all subscribers  
- Each backend instance forwards messages to its connected clients  

This design keeps backend servers stateless, allowing seamless horizontal scaling behind a load balancer.

---

## Message Flow
1. Client sends a message through WebSocket  
2. Server publishes the message to Redis  
3. Redis broadcasts the message via Pub/Sub  
4. All subscribed servers receive the message  
5. Servers relay the message to connected WebSocket clients  

---

## Features
- Horizontally scalable WebSocket system  
- Redis Pub/Sub for real-time message fan-out  
- Stateless backend design  
- Low-latency in-memory message delivery  
- Cloud-managed Redis for high availability  
- Supports thousands of concurrent connections  

---

## Observability and Insights
- Redis metrics monitored using Aiven dashboards  
- Observed connected client count, message throughput, and latency  
- Analyzed Pub/Sub fan-out behavior under concurrent load  

---

## Scalability and Load Testing
- Deployed multiple WebSocket server instances on different ports  
- Connected clients to different instances simultaneously  
- Verified real-time message consistency across instances  
- Observed linear scaling with minimal latency increase  

---

## Design Decisions
Redis Pub/Sub was chosen for ultra-low latency messaging and simple fan-out communication.

Trade-offs:
- Redis Pub/Sub does not provide message durability  
- Subscribers must be online to receive messages  

For persistence or replay functionality, Redis Streams would be a better alternative.

---

## Use Cases
- Live dashboards  
- Real-time notifications  
- Chat applications  
- Fleet or vehicle telemetry systems  
- IoT data streaming platforms  

---
