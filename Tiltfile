# Lumie Frontend Development with Tilt
# =====================================
# Usage: tilt up
# Access: https://dev.lumie0213.kro.kr

allow_k8s_contexts('lumie-dev')

REGISTRY = 'zot0213.kro.kr'
NAMESPACE = 'lumie-dev'
DEV_DOMAIN = 'dev.lumie0213.kro.kr'

# Environment variables
ENV_VARS = {
    'NODE_ENV': 'development',
    'NEXT_TELEMETRY_DISABLED': '1',
}

def generate_env_yaml():
    env_yaml = ''
    for key, value in ENV_VARS.items():
        env_yaml += '''
        - name: %s
          value: "%s"''' % (key, value)
    return env_yaml

# Deployment YAML
deployment_yaml = '''
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lumie-frontend
  namespace: %s
  labels:
    app: lumie-frontend
    environment: development
spec:
  replicas: 1
  selector:
    matchLabels:
      app: lumie-frontend
  template:
    metadata:
      labels:
        app: lumie-frontend
        environment: development
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      containers:
      - name: lumie-frontend
        image: %s/dev/lumie-frontend:dev
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 3000
          protocol: TCP
        env:%s
        resources:
          requests:
            cpu: 100m
            memory: 512Mi
          limits:
            memory: 1Gi
        livenessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: http
          initialDelaySeconds: 10
          periodSeconds: 5
        securityContext:
          runAsNonRoot: true
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - ALL
''' % (NAMESPACE, REGISTRY, generate_env_yaml())

# Service YAML
service_yaml = '''
apiVersion: v1
kind: Service
metadata:
  name: lumie-frontend
  namespace: %s
spec:
  type: ClusterIP
  selector:
    app: lumie-frontend
  ports:
  - name: http
    port: 3000
    targetPort: http
    protocol: TCP
''' % NAMESPACE

# Ingress YAML (Kong)
ingress_yaml = '''
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: lumie-frontend-ingress
  namespace: %s
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    konghq.com/plugins: lumie-dev-cors
spec:
  ingressClassName: kong
  tls:
  - hosts:
    - %s
    secretName: lumie-dev-tls
  rules:
  - host: %s
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: lumie-frontend
            port:
              number: 3000
''' % (NAMESPACE, DEV_DOMAIN, DEV_DOMAIN)

# CORS Plugin for development
cors_plugin_yaml = '''
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: lumie-dev-cors
  namespace: %s
config:
  origins:
  - "https://%s"
  - "http://%s"
  methods:
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE
  - OPTIONS
  headers:
  - Accept
  - Authorization
  - Content-Type
  - X-Tenant-Slug
  exposed_headers:
  - X-Request-Id
  credentials: true
  max_age: 3600
plugin: cors
''' % (NAMESPACE, DEV_DOMAIN, DEV_DOMAIN)

k8s_yaml(blob(deployment_yaml))
k8s_yaml(blob(service_yaml))
k8s_yaml(blob(ingress_yaml))
k8s_yaml(blob(cors_plugin_yaml))

# Docker build with live_update (true hot reload for Next.js)
docker_build(
    '%s/dev/lumie-frontend' % REGISTRY,
    context='.',
    dockerfile='Dockerfile.dev',
    live_update=[
        # Sync source files (Next.js Fast Refresh handles the rest)
        sync('.', '/app'),
        # Reinstall dependencies if package.json changes
        run('npm install', trigger=['package.json', 'package-lock.json']),
    ],
    ignore=[
        'node_modules',
        '.next',
        '.git',
        'test-results',
        'playwright-report',
    ],
)

k8s_resource(
    'lumie-frontend',
    # No port-forward needed - access via https://dev.lumie0213.kro.kr
    labels=['lumie-dev'],
)
