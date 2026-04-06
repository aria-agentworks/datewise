import boto3
import requests
from botocore.exceptions import ClientError

# Hardcoded credentials (as per instructions)
ACCESS_KEY_ID = 'a970eb068f3a6e1001defd42696cd440'
SECRET_ACCESS_KEY = 'afd7dba583ae4a2225f5c0feede764ada51d69dddad1dc8507d3e3c578dc4ef7'
BUCKET = 'qte2wq7f5yx91i2k4uoye3u8pln544fp'
ENDPOINT = 'https://qte2wq7f5yx91i2k4uoye3u8pln544fp.r2.cloudflarestorage.com'
VIDEO_URL = 'https://videos.pexels.com/video-files/8733007/8733007-uhd_2560_1440_30fps.mp4'
DEST_KEY = 'private_banking_whale_v1.mp4'

# Step 1: Download video
print(f"Downloading video from {VIDEO_URL}...")
response = requests.get(VIDEO_URL, stream=True)
response.raise_for_status()
with open('/tmp/pexels_video.mp4', 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)
print("Download completed.")

# Step 2: Upload to R2
s3_client = boto3.client('s3',
                        endpoint_url=ENDPOINT,
                        aws_access_key_id=ACCESS_KEY_ID,
                        aws_secret_access_key=SECRET_ACCESS_KEY)
print(f"Uploading to bucket '{BUCKET}' as '{DEST_KEY}'...")
s3_client.upload_file('/tmp/pexels_video.mp4', BUCKET, DEST_KEY)
print("Upload completed.")

# Step 3: Verify upload
print("Verifying upload...")
try:
    s3_client.head_object(Bucket=BUCKET, Key=DEST_KEY)
    print("Verification successful: File exists in bucket.")
    with open('FINAL_VERIFICATION.txt', 'w') as f:
        f.write(f"VERIFIED: s3://{BUCKET}/{DEST_KEY} exists.\n")
except ClientError as e:
    print(f"Verification failed: {e}")
    with open('FINAL_VERIFICATION.txt', 'w') as f:
        f.write(f"FAILED: {e}\n")
