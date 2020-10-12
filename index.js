const args = require("args-parser")(process.argv);
const AWS = require('aws-sdk');
const fs = require('fs');
const del = require('del');

const spawnSync = require('child_process').spawnSync;
const moment = require('moment-timezone');

/**
 * --------------------------------
 * Backup do banco de dados
 * --------------------------------
 */
let folder = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');
let date = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD__hh-mm-ss');
spawnSync('zip',['-r', '-P', args.PASSWORD_ZIP, '/backup/mongodb_'+date+'.zip', '/mongodb']).toString();

/**
 * --------------------------------
 * Salvar no S3
 * --------------------------------
 */
const BUCKET = args.AWS_BUCKET;
const REGION = args.AWS_REGION;
const ACCESS_KEY = args.AWS_ACCESS_KEY;
const SECRET_KEY = args.AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION
})

const s3 = new AWS.S3();

s3.putObject({
    Bucket: BUCKET,
    Body: fs.readFileSync('/backup/mongodb_'+date+'.zip'),
    Key: folder + '/mongodb_'+date+'.zip'
})
    .promise()
    .then(response => {
        console.log(`Backup mongo realizado com sucesso! - `, response);
    })
    .catch(err => {
        console.log(`Erro ao realizar backup do mongodb - `, err)
    });

