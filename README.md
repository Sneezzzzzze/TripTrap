# TripTrap

## Module
### Generate Node Module (ZIP)
```
cd module
npm install
zip -r package.zip ./node_modules
```

### Upload Node Module to Lambda Layer
```
aws lambda publish-layer-version --layer-name my-node-modules-layer --description "Node.js modules for Lambda" --zip-file fileb://module/package.zip --compatible-runtimes nodejs22.x --region us-east-1
```

### Update Environtment Variables
```
aws lambda update-function-configuration --function-name triptrap-user --environment Variables={API_URL=https://api.example.com/v1,DEBUG_MODE=true}
```