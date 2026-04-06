import boto3
import requests
import os
import traceback

# Hardcoded credentials for R2
ACCESS_KEY_ID = 'a970eb068f3a6e1001defd42696cd440'
SECRET_ACCESS_KEY = 'afd7dba583ae4a2225f5c0feede764ada51d69dddad1dc8507d3e3c578dc4ef7'
BUCKET = 'qte2wq7f5yx91i2k4uoye3u8pln544fp'
ENDPOINT = 'https://qte2wq7f5yx91i2k4uoye3u8pln544fp.r2.cloudflarestorage.com'

VIDEO_URL = 'https://videos.pexels.com/video-files/8733007/8733007-uhd_2560_1440_30fps.mp4'
LOG_FILE = 'STRIKE_LOG.txt'

try:
    # Download video
    response = requests.get(VIDEO_URL, stream=True)
    response.raise_for_status()
    temp_file = '/tmp/private_banking_whale_v1.mp4'
    with open(temp_file, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    # Upload to R2
    s3 = boto3.client('s3',
                        endpoint_url=ENDPOINT,
                        aws_access_key_id=ACCESS_KEY_ID,
                        aws_secret_access_key=SECRET_ACCESS_KEY)
    s3.upload_file(temp_file, BUCKET, 'private_banking_whale_v1.mp4', ExtraArgs={'ACL': 'public-read'})

    with open(LOG_FILE, 'w') as f:
        f.write('Upload complete.\n')
except Exception as e:
    with open(LOG_FILE, 'w') as f:
        f.write('ERROR:\n')
        f.write(traceback.format_exc())