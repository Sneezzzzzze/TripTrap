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
aws lambda publish-layer-version --layer-name my-node-modules-layer --description "Node.js modules for Lambda" --content ./module/package.zip --compatible-runtimes nodejs22.x --region us-east-1
```