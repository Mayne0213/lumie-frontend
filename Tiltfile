# Lumie Frontend Development with Tilt
# =====================================
# Usage: tilt up

allow_k8s_contexts('lumie-dev')

REGISTRY = 'zot0213.kro.kr'
NAMESPACE = 'lumie-dev'

# Environment variables
# Development: Browser calls localhost port-forwarded services
# Production: Browser calls /api/* (Kong routes to backend)
ENV_VARS = {
    'NODE_ENV': 'development',
    'NEXT_TELEMETRY_DISABLED': '1',
    # Client-side: Browser accessible URLs (port-forwarded by backend Tilt)
    'NEXT_PUBLIC_AUTH_SERVICE_URL': 'http://localhost:18081',
    'NEXT_PUBLIC_ACADEMY_SERVICE_URL': 'http://localhost:18083',
    'NEXT_PUBLIC_EXAM_SERVICE_URL': 'http://localhost:18084',
    'NEXT_PUBLIC_CONTENT_SERVICE_URL': 'http://localhost:18085',
    'NEXT_PUBLIC_FILE_SERVICE_URL': 'http://localhost:18086',
    'NEXT_PUBLIC_GRADING_SERVICE_URL': 'http://localhost:18087',
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
            cpu: 15m
            memory: 256Mi
          limits:
            cpu: 500m
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

k8s_yaml(blob(deployment_yaml))
k8s_yaml(blob(service_yaml))

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
    port_forwards=['3000:3000'],
    labels=['lumie-dev'],
)
