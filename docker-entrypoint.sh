echo '';
echo '---------------------------------------';
echo 'Backup Mongodb iniciado em: ' + $(date +%Y-%m-%d_%H-%M-%S);
mongodump --uri=$SRV_URL --out /mongodb
echo 'Realizando upload na S3';
nodejs index.js \
    --AWS_BUCKET=${AWS_BUCKET} \
    --AWS_REGION=${AWS_REGION} \
    --AWS_ACCESS_KEY=${AWS_ACCESS_KEY} \
    --AWS_SECRET_KEY=${AWS_SECRET_KEY} \
    --PASSWORD_ZIP=${PASSWORD_ZIP}
echo 'Backup Mongodb finalizado em: ' + $(date +%Y-%m-%d_%H-%M-%S);
echo '---------------------------------------';
echo '';