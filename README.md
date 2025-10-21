# TripTrap

## Module
### Generate Node Module (ZIP)
```
cd module
npm install
zip -r package.zip ./node_modules
```

### Generate Services for Lambda (ZIP)
```
cd wrapper
zip <service>.zip ./db.mjs ./s3.mjs ./<service>/index.mjs ./<service>/service.mjs
```

### SET PROFILE IN aws cli (Optional)
```bash
# Linux/macOS
export AWS_PROFILE=
# Window (cmd)
set AWS_PROFILE=
# Window (powershell)
$env:AWS_PROFILE=
```

### Upload to s3
```
aws s3 cp <name>.zip s3://triptrap-v1 
```

### Upload Node Module to Lambda Layer
```
aws lambda publish-layer-version --layer-name my-node-modules-layer --description "Node.js modules for Lambda" --zip-file fileb://module/package.zip --compatible-runtimes nodejs22.x --region us-east-1
```

### Update Environtment Variables
```
aws lambda update-function-configuration 
    --function-name triptrap-user 
     --environment '{
      "Variables": {
          
          }
      }'

```

### Create Lambda Function

```aws 
aws lambda create-function \
  --function-name <name>Service \
  --runtime nodejs22.x \
  --role arn:aws:iam::659964940487:role/LabRole \
  --handler index.handler \
  --code S3Bucket=triptrap-v1,S3Key=<name>.zip \
  --region us-east-1 \
  --environment '{
      "Variables": {
          
      }
  }' \
  --vpc-config SubnetIds=subnet-050fb5728afc977ed,subnet-0edb8cbfd5f2c986d,SecurityGroupIds=sg-0eee9cb4e2aeedfab
  --layers arn:aws:lambda:us-east-1:659964940487:layer:my-node-modules-layer:1
```







