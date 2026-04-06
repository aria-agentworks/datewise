import boto3
import requests
import os
from botocore.exceptions import NoCredentialsError

# Hardcoded R2 credentials
R2_ACCOUNT_ID = 'a970eb068f3a6e1001defd42696cd440'
R2_SECRET_ACCESS_KEY = 'afd7dba583ae4a2225f5c0feede764ada51d69dddad1dc8507d3e3c578dc4ef7'
R2_ENDPOINT_URL = 'https://qte2wq7f5yx91i2k4uoye3u8pln544fp.r2.cloudflarestorage.com'
R2_BUCKET = 'qte2wq7f5yx91i2k4uoye3u8pln544fp'
VIDEO_URL = 'https://videos.pexels.com/video-files/8733007/8733007-uhd_2560_1440_30fps.mp4'


def download_video(url, local_path):
    print(f"Downloading video from {url}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    with open(local_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    print(f"Video downloaded to {local_path}")
    return local_path


def upload_to_r2(local_file, object_key):
    print(f"Uploading {local_file} to R2 bucket '{R2_BUCKET}' with key '{object_key}'...")
    s3_client = boto3.client(
        's3',
        endpoint_url=R2_ENDPOINT_URL,
        aws_access_key_id=R2_ACCOUNT_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        region_name='auto'
    )
    try:
        s3_client.upload_file(
            local_file,
            R2_BUCKET,
            object_key,
            ExtraArgs={'ContentType': 'video/mp4'}
        )
        print("Upload successful!")
        s3_url = f"{R2_ENDPOINT_URL}/{object_key}"
        print(f"S3 object key: {object_key}")
        print(f"S3 URL: {s3_url}")
        return s3_url
    except NoCredentialsError:
        print("Credentials not available")
        raise
    except Exception as e:
        print(f"Upload failed: {e}")
        raise


def main():
    object_key = "pb_whale.mp4"
    local_file = "/tmp/video.mp4"
    try:
        download_video(VIDEO_URL, local_file)
        s3_url = upload_to_r2(local_file, object_key)
        print("::set-output name=key::" + object_key)
        print("::set-output name=url::" + s3_url)
        print(f"S3 key generated: {object_key}")
        print(f"S3 URL: {s3_url}")
    finally:
        if os.path.exists(local_file):
            os.remove(local_file)
            print(f"Cleaned up {local_file}")

if __name__ == "__main__":
    main()
